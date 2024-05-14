const LoginFormModule = (function() {
    // Captura del formulario y elementos relacionados
    const loginForm = document.getElementById("loginForm");
  
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevenir envío del formulario
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      alert("Datos guardados en local storage");
  
      window.location.href = "vista.html"; // Redirección a vista.html
    }
  
    function bindEvents() {
      loginForm.addEventListener("submit", handleFormSubmit);
    }
  
    return {
      init: function() {
        bindEvents();
      }
    };
  })();
  
  document.addEventListener("DOMContentLoaded", LoginFormModule.init);
  