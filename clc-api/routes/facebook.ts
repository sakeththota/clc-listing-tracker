import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { FbQuery } from "../fbquery/fbquery";
import { Logger } from "../logger/logger";
import * as dotenv from "dotenv";
dotenv.config();

const cronitor = require("cronitor")(process.env.CRONITOR);
const nodeCron = require("node-cron");
cronitor.wraps(nodeCron);

class Facebook {
  public express: express.Application;
  public logger: Logger;
  public fb: FbQuery;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
    this.fb = new FbQuery();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private routes(): void {
    this.express.post("/facebook", (req, res) => {
      this.logger.info("url :: " + req.url);
      console.log(JSON.stringify(req.body, null, 2));
      const { keywords, location, email, min, max, condition, interval } =
        req.body;
      let cronString = `*/${interval} * * * *`;
      cronitor.schedule(
        `${keywords} every ${interval} minutes`,
        cronString,
        () => {
          this.fb.queryFbMarketplace(
            keywords,
            location,
            min,
            max,
            email,
            condition
          );
        }
      );

      res.status(200).send({ status: "OK" });
    });
  }
}

export default new Facebook().express;
