import "../styles/Navbar.css";
import HistoryIcon from "@mui/icons-material/History";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
function Navbar({ color, name }) {
  return (
    <div className="Navbar">
      <Link to="/">
        <IconButton>
          <ArrowBackIcon style={{ color: color }} />
        </IconButton>
      </Link>
      <Typography color={color} variant="h6">
        {name}
      </Typography>
      <IconButton>
        {name !== "Jobs Dashboard" ? (
          <HistoryIcon style={{ color: color }} />
        ) : (
          <HistoryIcon style={{ color: "white" }} />
        )}
      </IconButton>
    </div>
  );
}

export default Navbar;
