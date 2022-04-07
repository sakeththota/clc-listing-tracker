import { FbQuery } from "../queries/fbquery";
import { QueryRoute } from "./queryRoute";

class Facebook extends QueryRoute {
  constructor() {
    console.log("Facebook constructor");
    super(new FbQuery());
  }
}

export default new Facebook().express;
