// Income Tracker JavaScript
class IncomeTracker {
    constructor() {
        this.incomes = this.loadFromStorage('incomes') || [];
        this.init();
    }

    init() {
        this.updateSummary();
        this.renderIncomes();
        this.setupEventListeners();
        this.setTodayDate();
    }

    setupEventListeners() {
        document.getElementById('incomeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addIncome();
        });
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('incomeDate').value = today;
    }

    addIncome() {
        const source = document.getElementById('incomeSource').value;
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        const category = document.getElementById('incomeCategory').value;
        const date = document.getElementById('incomeDate').value;

        const income = {
            id: Date.now(),
            source,
            amount,
            category,
            date,
            dateAdded: new Date().toLocaleDateString()
        };

        this.incomes.unshift(income);
        this.saveToStorage('incomes', this.incomes);
        this.updateSummary();
        this.renderIncomes();
        document.getElementById('incomeForm').reset();
        this.setTodayDate();
        this.showNotification('Income added successfully!', 'success');
    }

    deleteIncome(id) {
        if (confirm('Are you sure you want to delete this income entry?')) {
            this.incomes = this.incomes.filter(inc => inc.id !== id);
            this.saveToStorage('incomes', this.incomes);
            this.updateSummary();
            this.renderIncomes();
            this.showNotification('Income deleted!', 'info');
        }
    }

    calculateMonthlyIncome() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        return this.incomes
            .filter(income => {
                const incomeDate = new Date(income.date);
                return incomeDate.getMonth() === currentMonth && 
                       incomeDate.getFullYear() === currentYear;
            })
            .reduce((sum, income) => sum + income.amount, 0);
    }

    updateSummary() {
        const totalIncome = this.incomes.reduce((sum, inc) => sum + inc.amount, 0);
        const monthlyIncome = this.calculateMonthlyIncome();
        const incomeCount = this.incomes.length;

        document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById('monthlyIncome').textContent = `$${monthlyIncome.toFixed(2)}`;
        document.getElementById('incomeCount').textContent = incomeCount;
    }

    renderIncomes() {
        const incomeList = document.getElementById('incomeList');
        
        if (this.incomes.length === 0) {
            incomeList.innerHTML = `
                <li class="empty-state">
                    <div class="empty-state-icon">💵</div>
                    <p>No income recorded yet. Start tracking your earnings!</p>
                </li>
            `;
            return;
        }

        incomeList.innerHTML = this.incomes.map(income => `
            <li class="item-card">
                <div class="item-header">
                    <div>
                        <div class="item-title">${income.source}</div>
                        <span class="category-badge">${income.category}</span>
                    </div>
                    <div class="item-amount" style="color: var(--success-color);">+$${income.amount.toFixed(2)}</div>
                </div>
                <div class="item-details">
                    <span>📅 ${this.formatDate(income.date)}</span>
                    <button class="btn btn-danger btn-small" onclick="incomeTracker.deleteIncome(${income.id})">Delete</button>
                </div>
            </li>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
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

// Initialize the income tracker
const incomeTracker = new IncomeTracker();
