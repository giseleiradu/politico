import app from './app';

// import constants from './configuration/constants';

// Starting our Express server and pass it the port to listen to.
const port = process.env.PORT || 3000;
console.log(`welcome, Politico server is on port ${port}`);
app.listen(port);
