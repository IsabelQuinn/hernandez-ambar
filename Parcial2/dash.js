const Dashboard = (function () {
    const init = function () {
        Dashboard.bindEvents();
        Dashboard.methods.loadUserInfo();
        Dashboard.methods.loadTransactions();
        Dashboard.methods.renderChart();
    };

    const bindEvents = function () {
        document.getElementById('logoutButton').addEventListener('click', Dashboard.handlers.handleLogout);
        document.getElementById('addTransactionButton').addEventListener('click', Dashboard.handlers.handleAddTransaction);
        document.getElementById('profileButton').addEventListener('click', Dashboard.handlers.handleProfileRedirect);
    };

    const handlers = {
        handleLogout() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        },
        handleAddTransaction() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const type = document.getElementById('transactionType').value;
            const amount = parseFloat(document.getElementById('transactionAmount').value);
            const date = new Date().toLocaleDateString();

            if (!amount || isNaN(amount)) {
                alert('Por favor, ingrese un monto válido.');
                return;
            }

            const transaction = { type, amount, date };
            currentUser.transactions.push(transaction);
            Dashboard.methods.saveTransaction(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            Dashboard.methods.loadTransactions();
            Dashboard.methods.renderChart();
        },
        handleProfileRedirect() {
            window.location.href = 'profile.html';
        }
    };

    const methods = {
        loadUserInfo() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const profileButton = document.getElementById('profileButton');
                profileButton.textContent = currentUser.name;
            } else {
                window.location.href = 'login.html';
            }
        },
        loadTransactions() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const transactions = currentUser.transactions || [];
            const tbody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

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
        saveTransaction(user) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUserIndex = users.findIndex(u => u.username === user.username);

            if (existingUserIndex >= 0) {
                users[existingUserIndex] = user;
            } else {
                users.push(user);
            }

            localStorage.setItem('users', JSON.stringify(users));
        },
        renderChart() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const transactions = currentUser.transactions || [];
            const income = transactions.filter(t => t.type === 'Entrada').reduce((sum, t) => sum + t.amount, 0);
            const expense = transactions.filter(t => t.type === 'Salida').reduce((sum, t) => sum + t.amount, 0);

            const chartContainer = document.getElementById('transactionsChart');
            chartContainer.innerHTML = '';

            const total = income + expense;
            const incomePercent = total ? (income / total * 100).toFixed(2) : 0;
            const expensePercent = total ? (expense / total * 100).toFixed(2) : 0;

            const incomeBar = document.createElement('div');
            incomeBar.classList.add('chart-bar');
            incomeBar.innerHTML = `<span class="income" style="width: ${incomePercent}%;">Ingresos: ${incomePercent}%</span>`;
            
            const expenseBar = document.createElement('div');
            expenseBar.classList.add('chart-bar');
            expenseBar.innerHTML = `<span class="expense" style="width: ${expensePercent}%;">Egresos: ${expensePercent}%</span>`;

            chartContainer.appendChild(incomeBar);
            chartContainer.appendChild(expenseBar);
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
