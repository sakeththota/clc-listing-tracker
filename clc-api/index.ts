import * as http from "http";
import App from "./app";
import { Logger } from "./logger/logger";

const port = process.env.PORT;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new Logger();

server.on("listening", function (): void {
  const addr = server.address();
  if (addr) {
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
  } else {
    logger.error(`server address null`);
  }
});

module.exports = App;
