const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3000;  // <-- Define the PORT variable here

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Basic route to render the main.handlebars
app.get('/', (req, res) => {
    res.render('index'); // Assuming 'index.handlebars' is the name of your main file
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

