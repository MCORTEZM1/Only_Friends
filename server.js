const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');



const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// const helpers = require('./utils/helpers');

const hbs = exphbs.create({ });



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pass in /public to make the image accessible in URL
app.use(/*'/public',*/ express.static(path.join(__dirname, 'public')));

// engine must be set up after app intialization above 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// initiate routes 
app.use(routes);


// syncing db to the server 
// set force:false, when done with final version
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});