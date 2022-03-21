import "../styles/App.css";
import Welcome from "./Welcome";
import Marketplace from "./Marketplace";
import Dashboard from "./Dashboard";
import { HashRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/facebook" element={<Marketplace name="Facebook" />} />
          <Route path="/offerup" element={<Marketplace name="OfferUp" />} />
          <Route
            path="/craigslist"
            element={<Marketplace name="Craigslist" />}
          />
          <Route path="/jobs" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
