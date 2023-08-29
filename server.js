const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const { format_date } = require('./utils/helpers');
const homeRoutes = require('./controllers/api/homeRoutes');
const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Log the current directory

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess))

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ 
  helpers: {
    format_date
  },
  defaultLayout:'homepage',
  partialsDir: path.join(__dirname, 'views/partials/')
});

// Explicitly set the views directory
// app.set('views', path.join(__dirname, 'views'));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.set('views', './views');


// Activate specific routes
// app.use('/', homeRoutes);

// // Activate routes
app.use(routes);

// Error handling middleware (Add this part)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});