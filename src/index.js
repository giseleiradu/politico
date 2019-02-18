import app from './app';
import constants from './configuration/constants';

// Starting our Express server and pass it the port to listen to.

app.listen(constants.PORT, () => {
  console.log(`server is running to port:${constants.PORT}`);
});
