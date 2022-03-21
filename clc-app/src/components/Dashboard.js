import Navbar from "./Navbar";
import "../styles/Dashboard.css";
import { React, useState, useEffect } from "react";
import { Divider, Paper, IconButton, CircularProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Circle from "@mui/icons-material/Circle";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoreJobs = () => {
    fetch(
      "https://lit-shore-03824.herokuapp.com/https://cronitor.io/api/monitors",
      {
        mode: "cors",
        headers: {
          Authorization: "Basic " + btoa("3094330eaf0848f59a4541930df0abea:"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setJobs([...jobs, ...data.monitors]);
        window.history.pushState({ jobs: [...jobs, ...data.monitors] }, "");
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const stopJob = (monitorKey) => {
    fetch(
      `https://lit-shore-03824.herokuapp.com/https://cronitor.io/api/monitors/${monitorKey}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Basic " + btoa("3094330eaf0848f59a4541930df0abea:"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        setJobs(jobs.filter((item, index) => item.key !== monitorKey));
        console.log(`${monitorKey} has been deleted`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
      setJobs(window.history.state.jobs);
    } else {
      setLoading(true);
      fetchMoreJobs();
    }
  }, []);

  return (
    <div className="Marketplace">
      <Navbar color="#000000" name="Jobs Dashboard" />
      <Divider />
      <div className="Jobs">
        {loading && <CircularProgress sx={{ m: "2.5%" }} />}
        {!loading &&
          jobs.map((job) => {
            return (
              <Paper
                key={job.key}
                className="Job"
                sx={{ m: "1%", p: "1%", width: "30%" }}
                elevation={3}
              >
                <Circle
                  size="small"
                  color={job.passing ? "success" : "error"}
                />
                <p>{job.key}</p>
                <IconButton onClick={(e) => stopJob(job.key)}>
                  <ClearIcon />
                </IconButton>
              </Paper>
            );
          })}
      </div>
    </div>
  );
}

export default Dashboard;
