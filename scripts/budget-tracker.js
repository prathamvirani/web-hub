// Budget Tracker JavaScript
class BudgetTracker {
    constructor() {
        this.budget = this.loadFromStorage('budget') || 0;
        this.expenses = this.loadFromStorage('expenses') || [];
        this.init();
    }

    init() {
        this.updateSummary();
        this.renderExpenses();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('budgetForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.setBudget();
        });

        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });
    }

    setBudget() {
        const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);
        this.budget = budgetAmount;
        this.saveToStorage('budget', this.budget);
        this.updateSummary();
        document.getElementById('budgetForm').reset();
        this.showNotification('Budget set successfully!', 'success');
    }

    addExpense() {
        const name = document.getElementById('expenseName').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date: new Date().toLocaleDateString()
        };

        this.expenses.unshift(expense);
        this.saveToStorage('expenses', this.expenses);
        this.updateSummary();
        this.renderExpenses();
        document.getElementById('expenseForm').reset();
        this.showNotification('Expense added successfully!', 'success');
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(exp => exp.id !== id);
            this.saveToStorage('expenses', this.expenses);
            this.updateSummary();
            this.renderExpenses();
            this.showNotification('Expense deleted!', 'info');
        }
    }

    updateSummary() {
        const totalSpent = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const remaining = this.budget - totalSpent;

        document.getElementById('totalBudget').textContent = `$${this.budget.toFixed(2)}`;
        document.getElementById('totalSpent').textContent = `$${totalSpent.toFixed(2)}`;
        document.getElementById('remaining').textContent = `$${remaining.toFixed(2)}`;

        // Change color based on remaining budget
        const remainingElement = document.getElementById('remaining');
        if (remaining < 0) {
            remainingElement.style.color = 'var(--danger-color)';
        } else if (remaining < this.budget * 0.2) {
            remainingElement.style.color = 'var(--warning-color)';
        } else {
            remainingElement.style.color = 'var(--success-color)';
        }
    }

    renderExpenses() {
        const expenseList = document.getElementById('expenseList');
        
        if (this.expenses.length === 0) {
            expenseList.innerHTML = `
                <li class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p>No expenses recorded yet. Start tracking your spending!</p>
                </li>
            `;
            return;
        }

        expenseList.innerHTML = this.expenses.map(expense => `
            <li class="item-card">
                <div class="item-header">
                    <div>
                        <div class="item-title">${expense.name}</div>
                        <span class="category-badge">${expense.category}</span>
                    </div>
                    <div class="item-amount" style="color: var(--danger-color);">-$${expense.amount.toFixed(2)}</div>
                </div>
                <div class="item-details">
                    <span>${expense.date}</span>
                    <button class="btn btn-danger btn-small" onclick="budgetTracker.deleteExpense(${expense.id})">Delete</button>
                </div>
            </li>
        `).join('');
    }

    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the budget tracker
const budgetTracker = new BudgetTracker();
