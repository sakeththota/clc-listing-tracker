import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { Logger } from "../logger/logger";

export abstract class Route {
  public express: express.Application;
  public logger: Logger;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  protected abstract routes(): void;
}
