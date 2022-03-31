import { CraigQuery } from "../queries/craigquery";
import { QueryRoute } from "./queryRoute";

class Craigslist extends QueryRoute {
  public craig: CraigQuery;

  constructor() {
    super(new CraigQuery());
  }
}

export default new Craigslist().express;
