const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const mongoose = require('mongoose');
const {mongoURL} = require('./configuration');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// change the db
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log('everything in place');
  })
  .catch((e) => {
    console.log('connection failed');
    console.log(e);
  });

  const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    console.log(`Listening on http://localhost:${port}`);
  };

const port = normalizePort(process.env.PORT || 8000);
app.set("port", port);

const server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

