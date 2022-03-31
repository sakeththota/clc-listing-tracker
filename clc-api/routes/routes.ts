import Facebook from "./facebook";
import Offerup from "./offerup";
import Craigslist from "./craigslist";
import { Route } from "./route";

class Routes extends Route {
  constructor() {
    super();
  }

  protected routes(): void {
    // facebook query route
    this.express.use("/", Facebook);
    this.express.use("/", Offerup);
    this.express.use("/", Craigslist);
  }
}

export default new Routes().express;
