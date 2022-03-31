import * as dotenv from "dotenv";
import { Route } from "./route";
import { Query } from "../queries/query";
dotenv.config();

const cronitor = require("cronitor")(process.env.CRONITOR);
const nodeCron = require("node-cron");
cronitor.wraps(nodeCron);

export class QueryRoute extends Route {
  public queryObj: Query;

  constructor(obj: Query) {
    super();
    this.queryObj = obj;
  }

  protected routes(): void {
    let type: string = this.queryObj.name;
    this.express.post(`/${type.toLowerCase()}`, (req, res) => {
      this.logger.info("url :: " + req.url);
      console.log(JSON.stringify(req.body, null, 2));
      const { keywords, location, email, min, max, condition, interval } =
        req.body;
      let cronString = `*/${interval} * * * *`;
      cronitor.schedule(
        `${type}: ${keywords} every ${interval} minutes`,
        cronString,
        () =>
          this.queryObj.query(keywords, location, min, max, email, condition)
      );
      res.status(200).send({ status: "OK" });
    });
  }
}
