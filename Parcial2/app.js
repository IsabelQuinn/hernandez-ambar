const App = (function () {
  // Inicializa la aplicación
  const init = function () {
    App.bindEvents(); // Vincula los eventos a los elementos del DOM
    App.methods.redirectIfAuthenticated(); // Redirige si el usuario ya está autenticado
    App.methods.populateProfileForm(); // Actualiza el formulario de perfil con los datos del usuario actual
  };

  // Vincula los eventos del formulario y botones
  const bindEvents = function () {
    const path = window.location.pathname;
    if (path.endsWith("login.html")) {
      document
        .getElementById("loginForm")
        .addEventListener("submit", App.handlers.handleLoginForm);
    } else if (path.endsWith("register.html")) {
      document
        .getElementById("registerForm")
        .addEventListener("submit", App.handlers.handleRegisterForm);
    } else if (path.endsWith("dashboard.html")) {
      document
        .getElementById("logoutButton")
        .addEventListener("click", App.handlers.handleLogout);
    } else if (path.endsWith("profile.html")) {
      document
        .getElementById("logoutButton")
        .addEventListener("click", App.handlers.handleLogout);
      document
      .getElementById('backButton')
      .addEventListener('click', App.handlers.handleBackButton);
      document
        .getElementById("profileForm")
        .addEventListener("submit", App.handlers.handleProfileForm);
    }
  };

  // Gestiona los eventos de los formularios y el botón de logout
  const handlers = {
    // Gestiona el evento de envío del formulario de login
    handleLoginForm(e) {
      e.preventDefault(); // Previene el envío del formulario
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const user = App.methods.getUser(username);
      if (!user) {
        App.methods.showNotification("Usuario no existe, por favor regístrese", "error"); // Muestra un mensaje si el usuario no existe
      } else if (user.password === App.methods.hashCode(password)) {
        localStorage.setItem("currentUser", JSON.stringify(user)); // Guarda el usuario actual en el localStorage
        window.location.href = "dashboard.html"; // Redirige al dashboard
      } else {
        App.methods.showNotification("Contraseña incorrecta", "error"); // Muestra un mensaje si la contraseña es incorrecta
      }
    },
    // Gestiona el evento de envío del formulario de registro
    handleRegisterForm(e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const name = document.getElementById("name").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
          App.methods.showNotification("Las contraseñas no coinciden", "error");
          return;
      }
      if (App.methods.getUser(username)) {
        App.methods.showNotification("El usuario ya existe", "error");
        window.location.href = "login.html"; // Redirige a la página de login
        return;
      }
      const user = { username, name, password: App.methods.hashCode(password),transactions: []  };
      App.methods.saveUser(user);
      App.methods.showNotification("Usuario registrado exitosamente", "success","login.html");

  },
    // Gestiona el evento de envío del formulario de perfil
    handleProfileForm(e) {
      e.preventDefault(); 
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const name = document.getElementById("profileName").value;
      const password = document.getElementById("profilePassword").value;
      const confirmPassword = document.getElementById(
        "confirmProfilePassword"
      ).value;

      if (password && password !== confirmPassword) {
        App.methods.showNotification("Las contraseñas no coinciden", "error");
        return;
      }

      if (name) {
        currentUser.name = name;
      }

      if (password) {
        currentUser.password = App.methods.hashCode(password);
      }

      App.methods.updateUser(currentUser);
      App.methods.showNotification("Perfil actualizado exitosamente", "success", "dashboard.html");
      App.methods.populateProfileForm(); // Actualiza el formulario de perfil con los nuevos datos
    },
    // Gestiona el evento de click del botón de logout
    handleLogout() {
      App.methods.logout(); // Cierra la sesión del usuario
    },
    handleBackButton() {
        window.location.href = "dashboard.html"; // Redirige al dashboard
    }
  };

  // Métodos auxiliares
  const methods = {
    // Hashea una cadena de texto usando un algoritmo sencillo
    hashCode(str) {
      let hash = 0;
      for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convierte a un entero de 32 bits
      }
      return hash.toString();
    },
    // Obtiene un usuario por su nombre de usuario del localStorage
    getUser(username) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      return users.find((user) => user.username === username);
    },
    // Guarda un usuario en el localStorage
    saveUser(user) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    },
    // Actualiza un usuario en el localStorage
    updateUser(updatedUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const index = users.findIndex(
        (user) => user.username === updatedUser.username
      );
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Actualiza el usuario actual en el localStorage
      }
    },
    // Verifica si un usuario está autenticado
    isAuthenticated() {
      return localStorage.getItem("currentUser") !== null;
    },
    // Cierra la sesión del usuario
    logout() {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    },
    // Redirige al usuario si está autenticado
    redirectIfAuthenticated() {
      const path = window.location.pathname;
      if (path.endsWith("login.html") && App.methods.isAuthenticated()) {
        window.location.href = "dashboard.html";
      } else if (
        path.endsWith("dashboard.html") &&
        !App.methods.isAuthenticated()
      ) {
        window.location.href = "login.html";
      }
    },
    // Actualiza el formulario de perfil con los datos del usuario actual
    populateProfileForm() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('profileName').value = currentUser.name;
        }
    },
    showNotification(message, type, redirectUrl) {
      const notification = document.getElementById('notification');
      notification.textContent = message;
      notification.className = `notification show ${type}`;
      
      if (type === "success" && redirectUrl) {
          const button = document.createElement('button');
          button.className = 'btn';
          button.textContent = 'Aceptar';
          button.addEventListener('click', () => {
              notification.className = 'notification';
              window.location.href = redirectUrl;
          });
          notification.appendChild(button);
      } else {
          setTimeout(() => {
              notification.className = 'notification';
          }, 3000);
      }
    }
  };

  // Función de renderizado
  const render = function (res) {
    // Placeholder para funcionalidad de render si se necesita en el futuro
  };

  // Retorna los métodos públicos del módulo
  return {
    init,
    bindEvents,
    handlers,
    methods,
    render,
  };
})();

// Inicializa la aplicación cuando el contenido del DOM esté cargado
document.addEventListener("DOMContentLoaded", App.init);
