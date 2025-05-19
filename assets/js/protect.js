(function(){
  const path = window.location.pathname;

  // Allow root (home) and anything under /journal/
  const isPublic =
    path === "/" ||
    path === "/index.html" ||
    path.startsWith("/journal/") ||
    path === "/journal";

  if (!isPublic) {
    const modal = document.getElementById("auth-modal");
    modal.style.display = "flex";

    const password = "N4dir4Only"; // Your real password here

    document.getElementById("auth-submit").onclick = function() {
      const entered = document.getElementById("auth-input").value;
      if (entered === password) {
        modal.style.display = "none";
      } else {
        alert("Incorrect password");
        window.location.href = "/";
      }
    };

    document.getElementById("auth-input").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        document.getElementById("auth-submit").click();
      }
    });
  }
})();
