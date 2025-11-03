// Task Tracker JavaScript
class TaskTracker {
    constructor() {
        this.tasks = this.loadFromStorage('tasks') || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.updateSummary();
        this.renderTasks();
        this.setupEventListeners();
        this.updateFilterButtons();
    }

    setupEventListeners() {
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
    }

    addTask() {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        const task = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toLocaleDateString()
        };

        this.tasks.unshift(task);
        this.saveToStorage('tasks', this.tasks);
        this.updateSummary();
        this.renderTasks();
        document.getElementById('taskForm').reset();
        this.showNotification('Task added successfully!', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage('tasks', this.tasks);
            this.updateSummary();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToStorage('tasks', this.tasks);
            this.updateSummary();
            this.renderTasks();
            this.showNotification('Task deleted!', 'info');
        }
    }

    filterTasks(filter) {
        this.currentFilter = filter;
        this.renderTasks();
        this.updateFilterButtons();
    }

    updateFilterButtons() {
        // Reset all buttons
        document.querySelectorAll('[id^="filter"]').forEach(btn => {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
        });

        // Highlight active filter
        const activeButton = document.getElementById(`filter${this.currentFilter.charAt(0).toUpperCase() + this.currentFilter.slice(1)}`);
        if (activeButton) {
            activeButton.style.background = 'var(--primary-color)';
        }
    }

    getFilteredTasks() {
        switch(this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    updateSummary() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            const emptyMessage = this.currentFilter === 'all' 
                ? 'No tasks yet. Add your first task to get started!'
                : this.currentFilter === 'completed'
                ? 'No completed tasks yet. Keep working!'
                : 'No pending tasks. Great job!';
                
            taskList.innerHTML = `
                <li class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <p>${emptyMessage}</p>
                </li>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="item-card ${task.completed ? 'task-completed' : ''}">
                <div class="item-header">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <input 
                            type="checkbox" 
                            class="task-checkbox" 
                            ${task.completed ? 'checked' : ''} 
                            onchange="taskTracker.toggleTask(${task.id})"
                        >
                        <div>
                            <div class="item-title">${task.title}</div>
                            ${task.description ? `<p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">${task.description}</p>` : ''}
                        </div>
                    </div>
                    <span class="category-badge" style="${this.getPriorityStyle(task.priority)}">${task.priority}</span>
                </div>
                <div class="item-details">
                    <span>
                        ${task.dueDate ? `📅 Due: ${this.formatDate(task.dueDate)}` : `Created: ${task.createdAt}`}
                    </span>
                    <button class="btn btn-danger btn-small" onclick="taskTracker.deleteTask(${task.id})">Delete</button>
                </div>
            </li>
        `).join('');
    }

    getPriorityStyle(priority) {
        const styles = {
            'High': 'background: rgba(239, 68, 68, 0.2); border-color: var(--danger-color); color: var(--danger-color);',
            'Medium': 'background: rgba(245, 158, 11, 0.2); border-color: var(--warning-color); color: var(--warning-color);',
            'Low': 'background: rgba(16, 185, 129, 0.2); border-color: var(--success-color); color: var(--success-color);'
        };
        return styles[priority] || '';
    }

    formatDate(dateString) {
        if (!dateString) return '';
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

// Initialize the task tracker
const taskTracker = new TaskTracker();
