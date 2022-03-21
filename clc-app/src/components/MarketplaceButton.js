import "../styles/MarketplaceButton.css";
import "@fontsource/roboto/400.css";
import Typography from "@mui/material/Typography";
function MarketplaceButton({ logosrc, name }) {
  let color =
    name === "OfferUp" ? "ou" : name === "Craigslist" ? "craigslist" : "fb";
  return (
    <button className={`btn btn5 ${color}`}>
      <img src={logosrc} alt={name} />
      <Typography variant="overline">{name}</Typography>
    </button>
  );
}
export default MarketplaceButton;
