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
        alert("Usuario no existe, por favor regístrese"); // Muestra un mensaje si el usuario no existe
      } else if (user.password === App.methods.hashCode(password)) {
        localStorage.setItem("currentUser", JSON.stringify(user)); // Guarda el usuario actual en el localStorage
        window.location.href = "dashboard.html"; // Redirige al dashboard
      } else {
        alert("Contraseña incorrecta"); // Muestra un mensaje si la contraseña es incorrecta
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
          alert("Las contraseñas no coinciden");
          return;
      }
      if (App.methods.getUser(username)) {
        alert("El usuario ya existe");
        window.location.href = "login.html"; // Redirige a la página de login
        return;
      }
      const user = { username, name, password: App.methods.hashCode(password),transactions: []  };
      App.methods.saveUser(user);
      alert("Usuario registrado exitosamente");
      window.location.href = 'login.html';
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
        alert("Las contraseñas no coinciden");
        return;
      }

      if (name) {
        currentUser.name = name;
      }

      if (password) {
        currentUser.password = App.methods.hashCode(password);
      }

      App.methods.updateUser(currentUser);
      alert("Perfil actualizado exitosamente");
      App.methods.populateProfileForm(); // Actualiza el formulario de perfil con los nuevos datos
      window.location.href = "dashboard.html";
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
    populateProfileForm() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('profileName').value = currentUser.name;
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
