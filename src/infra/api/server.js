const App = require('./app');

const port = process.env.PORT || 3333;

const program = new App();

program.server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
