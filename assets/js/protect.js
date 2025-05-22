(function(){
  const allowedPaths = ["/", "/index.html", "/journal/", "/journal/index.html", "/contact/"];
  const path = window.location.pathname;

  if (!allowedPaths.includes(path)) {
    const modal = document.getElementById("auth-modal");
    modal.style.display = "flex";

    const password = "N4dir4Only"; // Set your password here

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
