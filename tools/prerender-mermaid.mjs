/**
 * Pre-render Mermaid diagrams into static inline SVG.
 *
 * Runs AFTER Jekyll has built the site. It scans the generated HTML in the
 * output folder, finds every Mermaid code block, renders it to SVG with
 * mermaid-cli (mmdc), and replaces the code block with the inline SVG.
 *
 * Why: this removes the runtime dependency on a third-party CDN (jsdelivr)
 * and on JavaScript. Diagrams then load for everyone, including visitors on
 * networks that block the CDN, and they become visible to search engines.
 *
 * Usage: node tools/prerender-mermaid.mjs [site_dir]   (default: _site)
 */
import {
  readFileSync, writeFileSync, mkdtempSync, rmSync, readdirSync, statSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import * as cheerio from 'cheerio';

const SITE_DIR = process.argv[2] || '_site';
const MMDC = join('node_modules', '.bin', 'mmdc');
const THEME = join('tools', 'mermaid-theme.json');
const PUPPETEER = join('tools', 'puppeteer-config.json');

function walkHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkHtml(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

function renderToSvg(def, tmp, id) {
  const inFile = join(tmp, `d${id}.mmd`);
  const outFile = join(tmp, `d${id}.svg`);
  writeFileSync(inFile, def, 'utf8');
  execFileSync(MMDC, [
    '-i', inFile,
    '-o', outFile,
    '-c', THEME,
    '-p', PUPPETEER,
    '-b', 'transparent',
  ], { stdio: ['ignore', 'ignore', 'inherit'] });
  return readFileSync(outFile, 'utf8')
    .replace(/<\?xml[^>]*\?>/i, '')
    .replace(/<!DOCTYPE[^>]*>/i, '')
    .trim();
}

const files = walkHtml(SITE_DIR);
const tmp = mkdtempSync(join(tmpdir(), 'mmd-'));
let total = 0;
let failed = 0;

for (const file of files) {
  const $ = cheerio.load(readFileSync(file, 'utf8'), { decodeEntities: false });

  // GFM + Rouge renders ```mermaid as:
  //   <div class="language-mermaid highlighter-rouge">…<pre><code>…</code></pre></div>
  // Fall back to a class on <code> in case the highlighter config differs.
  let targets = $('.language-mermaid').toArray();
  if (targets.length === 0) {
    targets = $('code.language-mermaid, code.mermaid').toArray();
  }
  if (targets.length === 0) continue;

  let onPage = 0;
  targets.forEach((el, i) => {
    const $el = $(el);
    const def = $el.text().trim();
    if (!def) return;

    let svg;
    try {
      svg = renderToSvg(def, tmp, `${total}_${i}`);
    } catch (err) {
      // Don't break the deploy over one bad diagram — leave the source visible.
      failed += 1;
      console.warn(`! Skipped a diagram in ${file}: ${err.message.split('\n')[0]}`);
      return;
    }

    // Replace the outermost wrapper so no empty <pre>/<div> is left behind.
    let $target = $el;
    if (el.tagName === 'code') {
      const $wrap = $el.closest('.highlighter-rouge');
      $target = $wrap.length ? $wrap : ($el.closest('pre').length ? $el.closest('pre') : $el);
    }
    $target.replaceWith(`<div class="mermaid-diagram">${svg}</div>`);
    onPage += 1;
    total += 1;
  });

  if (onPage > 0) {
    writeFileSync(file, $.html(), 'utf8');
    console.log(`\u2713 ${file} — ${onPage} diagram(s)`);
  }
}

rmSync(tmp, { recursive: true, force: true });
console.log(`Done. Pre-rendered ${total} diagram(s)${failed ? `, ${failed} skipped` : ''}.`);
if (total === 0 && failed === 0) console.log('No Mermaid diagrams found — nothing to do.');
