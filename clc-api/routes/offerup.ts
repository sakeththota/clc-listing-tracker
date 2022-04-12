import { QueryRoute } from "./queryRoute";
import { OUQuery } from "../queries/ouquery";

class Offerup extends QueryRoute {
  constructor() {
    super(new OUQuery(), "Offerup");
  }
}

export default new Offerup().express;
