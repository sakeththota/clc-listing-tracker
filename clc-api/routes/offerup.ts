import { QueryRoute } from "./queryRoute";
import { OUQuery } from "../queries/ouquery";

class Offerup extends QueryRoute {
  public ou: OUQuery;

  constructor() {
    super(new OUQuery());
  }
}

export default new Offerup().express;
