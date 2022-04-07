import { QueryRoute } from "./queryRoute";
import { OUQuery } from "../queries/ouquery";

class Offerup extends QueryRoute {
  constructor() {
    super(new OUQuery());
  }
}

export default new Offerup().express;
