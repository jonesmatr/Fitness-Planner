const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { format_date } = require('./utils/helpers');
const homeRoutes = require('./controllers/api/homeRoutes');

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Log the current directory
console.log("Current directory:", __dirname);

const app = express();
const PORT = process.env.PORT || 3001;

// Explicitly set the views directory
app.set('views', path.join(__dirname, 'views'));

const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret', // Use an environment variable
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ 
  helpers: {
    format_date
  },
  defaultLayout:'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials/')
});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Activate specific routes
app.use('/', homeRoutes);

// Activate routes
app.use(routes);

// Error handling middleware (Add this part)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
