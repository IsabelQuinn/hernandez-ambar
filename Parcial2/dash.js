const Dashboard = (function () {
    const init = function () {
        Dashboard.bindEvents();
        Dashboard.methods.loadUserInfo();
        Dashboard.methods.loadTransactions();
        Dashboard.methods.renderChart();
    };
    // Enlazar eventos de interfaz de usuario a los controladores
    const bindEvents = function () {
        document.getElementById('logoutButton').addEventListener('click', Dashboard.handlers.handleLogout);
        document.getElementById('addTransactionButton').addEventListener('click', Dashboard.handlers.handleAddTransaction);
        document.getElementById('profileButton').addEventListener('click', Dashboard.handlers.handleProfileRedirect);
    };
    // controladores de eventos
    const handlers = {
        handleLogout() {
            localStorage.removeItem('currentUser');//elimina un usuario
            window.location.href = 'login.html';//redirige al usuario al login
        },
        // Controlador para agregar una nueva transacción
        handleAddTransaction() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));  // Obtener el usuario actual
            const type = document.getElementById('transactionType').value;       // Obtener el tipo de transacción
            const amount = parseFloat(document.getElementById('transactionAmount').value);  // Obtener el monto de la transacción
            const date = new Date().toLocaleDateString();   // Obtener la fecha actual
            //Validacion del monto ingresado
            if (!amount || isNaN(amount)) {
                Dashboard.methods.showNotification('Por favor, ingrese un monto válido.', 'error');
                return;
            }
            // Crear un objeto de transacción
            const transaction = { type, amount, date };
            currentUser.transactions.push(transaction);  // Agregar la transacción al usuario actual
            Dashboard.methods.saveTransaction(currentUser);  // Guardar la transacción
            localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Actualizar el usuario en el almacenamiento local
            // Recargar las transacciones y renderizar el gráfico
            Dashboard.methods.loadTransactions();
            Dashboard.methods.renderChart();
        },
        // Controlador para redirigir al perfil del usuario
        handleProfileRedirect() {
            window.location.href = 'profile.html';  // Redirigir a la página de perfil
        }
    };

   
    // Definición de los métodos del Dashboard
    const methods = {
        // Cargar información del usuario
        loadUserInfo() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const profileButton = document.getElementById('profileButton');
                profileButton.textContent = currentUser.name;  // Mostrar el nombre del usuario en el botón de perfil
            } else {
                window.location.href = 'login.html';  // Redirigir a la página de inicio de sesión si no hay usuario
            }
        },
       // Cargar y mostrar las transacciones del usuario
       loadTransactions() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const transactions = currentUser.transactions || [];
        const tbody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';  // Limpiar la tabla de transacciones
        // Insertar filas de transacciones en la tabla
            transactions.forEach(transaction => {
                const row = tbody.insertRow();
                const cellType = row.insertCell(0);
                const cellAmount = row.insertCell(1);
                const cellDate = row.insertCell(2);

                cellType.textContent = transaction.type;
                cellAmount.textContent = transaction.amount;
                cellDate.textContent = transaction.date;
            });
        },
         // Guardar transacción en el almacenamiento local
        saveTransaction(user) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUserIndex = users.findIndex(u => u.username === user.username);
            // Actualizar el usuario existente o agregar uno nuevo
            if (existingUserIndex >= 0) {
                users[existingUserIndex] = user;
            } else {
                users.push(user);
            }

            localStorage.setItem('users', JSON.stringify(users));// Guardar la lista de usuarios actualizada
        },
         // Renderizar el gráfico de transacciones
        renderChart() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const transactions = currentUser.transactions || [];
            const income = transactions.filter(t => t.type === 'Entrada').reduce((sum, t) => sum + t.amount, 0);
            const expense = transactions.filter(t => t.type === 'Salida').reduce((sum, t) => sum + t.amount, 0);

            const chartContainer = document.getElementById('transactionsChart');
            chartContainer.innerHTML = '';// Limpiar el contenedor del gráfico

            const total = income + expense;
            const incomePercent = total ? (income / total * 100).toFixed(2) : 0;
            const expensePercent = total ? (expense / total * 100).toFixed(2) : 0;

            // Crear y agregar barras de ingresos y gastos al gráfico
            const incomeBar = document.createElement('div');
            incomeBar.classList.add('chart-bar');
            incomeBar.innerHTML = `<span class="income" style="width: ${incomePercent}%;">Ingresos: ${incomePercent}%</span>`;
            
            const expenseBar = document.createElement('div');
            expenseBar.classList.add('chart-bar');
            expenseBar.innerHTML = `<span class="expense" style="width: ${expensePercent}%;">Egresos: ${expensePercent}%</span>`;

            chartContainer.appendChild(incomeBar);
            chartContainer.appendChild(expenseBar);
        },
        showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification show ${type}`;
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }
    };

    return {
        init,
        bindEvents,
        handlers,
        methods
    };
})();

document.addEventListener('DOMContentLoaded', Dashboard.init);
