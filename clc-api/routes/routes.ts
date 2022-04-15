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
    this.express.use("/facebook", Facebook);
    this.express.use("/offerup", Offerup);
    this.express.use("/craigslist", Craigslist);
  }
}

export default new Routes().express;
