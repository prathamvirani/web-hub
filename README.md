# Web Hub 🌐

A mini web hub featuring multiple microsites to help you manage your productivity and finances. Built with vanilla HTML, CSS, and JavaScript with local storage for data persistence.

## Features

### 💰 Budget Tracker
- Set monthly budget targets
- Track expenses by category
- Real-time budget calculations
- Visual feedback for budget status
- Category-based expense organization

### 📈 Income Tracker
- Record income from multiple sources
- Track monthly and total income
- Categorize income by type
- Date-based income tracking
- Income history visualization

### ✅ Task Tracker
- Create and manage tasks
- Set task priorities (Low, Medium, High)
- Add due dates and descriptions
- Filter tasks by status (All, Pending, Completed)
- Track completion progress

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/prathamvirani/web-hub.git
   cd web-hub
   ```

2. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## Project Structure

```
web-hub/
├── index.html              # Main hub landing page
├── README.md              # Project documentation
├── microsites/            # Individual microsite applications
│   ├── budget-tracker.html
│   ├── income-tracker.html
│   └── task-tracker.html
├── scripts/               # JavaScript files
│   ├── budget-tracker.js
│   ├── income-tracker.js
│   └── task-tracker.js
└── styles/                # CSS stylesheets
    ├── main.css
    └── microsite.css
```

## Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **JavaScript (ES6+)** - Interactive functionality
- **LocalStorage API** - Data persistence

## Features

- ✨ Modern and responsive design
- 🎨 Beautiful gradient backgrounds and animations
- 💾 Data persistence using browser local storage
- 📱 Mobile-friendly responsive layout
- 🚀 No dependencies - pure vanilla JavaScript
- ⚡ Fast and lightweight

## Browser Support

Works on all modern browsers that support:
- CSS Grid and Flexbox
- ES6+ JavaScript
- LocalStorage API

## Future Enhancements

- Export data to CSV/JSON
- Dark/Light theme toggle
- Data visualization with charts
- Recurring income/expense support
- Task reminders and notifications
- Data backup and restore

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.