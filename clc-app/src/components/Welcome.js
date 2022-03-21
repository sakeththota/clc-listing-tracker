import "../styles/Welcome.css";
import "@fontsource/roboto/400.css";
import MarketplaceButton from "./MarketplaceButton";
import fb from "../images/fb.png";
import ou from "../images/ou.png";
import craigslist from "../images/craigslist.png";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

function Welcome() {
  const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    return (
      <RouterLink
        style={{ display: "flex", flex: "1 1 0" }}
        data-testid="custom-link"
        ref={ref}
        to={href}
        {...other}
      />
    );
  });
  return (
    <div className="Welcome">
      <div className="Content">
        <div className="Text">
          <Typography variant="h2">Welcome</Typography>
          <Typography variant="h6">
            We are a service to help you track various digital marketplaces
          </Typography>
        </div>

        <div className="Marketplaces">
          <Link component={LinkBehavior} underline="none" to="/facebook">
            <MarketplaceButton name="Facebook Marketplace" logosrc={fb} />
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link component={LinkBehavior} underline="none" to="/offerup">
            <MarketplaceButton name="OfferUp" logosrc={ou} />
          </Link>
          <Divider orientation="vertical" flexItem />
          <Link component={LinkBehavior} underline="none" to="/craigslist">
            <MarketplaceButton name="Craigslist" logosrc={craigslist} />
          </Link>
        </div>
        <div className="Dashboard">
          <Link
            component={LinkBehavior}
            color="gray"
            underline="none"
            to="/jobs"
          >
            <Typography variant="button">Dashboard</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
