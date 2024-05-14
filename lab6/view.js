const View= (function() {
    function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.href = "login.html"; // Redirección al login
    }
  
    function checkUser() {
      if (!localStorage.getItem("username") || !localStorage.getItem("password")) {
        window.location.href = "login.html"; // Redirección al login si no están los datos
      } else {
        document.getElementById("welcomeText").textContent = `Bienvenido, ${localStorage.getItem("username")}!`;
      }
    }
  
    return {
      init: function() {
        document.getElementById("logoutButton").addEventListener("click", logout);
        checkUser();
      }
    };
  })();
  
  document.addEventListener("DOMContentLoaded", View.init);
  