import { FbQuery } from "../queries/fbquery";
import { QueryRoute } from "./queryRoute";

class Facebook extends QueryRoute {
  public fb: FbQuery;

  constructor() {
    super(new FbQuery());
  }
}

export default new Facebook().express;
