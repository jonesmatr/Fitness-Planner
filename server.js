const express = require('express');
const handlebars = require('express-handlebars');

const app = express();  // Initialize the Express app first

const PORT = process.env.PORT || 3000;

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Serve static files from the "public" directory
app.use(express.static('public'));  // Place this line after initializing the app

// Basic route to render the main.handlebars
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});
