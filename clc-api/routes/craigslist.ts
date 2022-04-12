import { CraigQuery } from "../queries/craigquery";
import { QueryRoute } from "./queryRoute";

class Craigslist extends QueryRoute {
  constructor() {
    super(new CraigQuery(), "Craigslist");
  }
}

export default new Craigslist().express;
