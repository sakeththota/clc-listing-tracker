import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  OutlinedInput,
} from "@mui/material";
import "../styles/SearchForm.css";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import cron from "node-cron";

function SearchForm({ color, name }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

  const radiusMarks = Array.from(Array(5).keys(), (x) => x * 20).map((x) => {
    return { value: x, label: `${x}mi` };
  });

  const [keywords, setKeywords] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(5000);
  const [condition, setCondition] = React.useState("all");
  const [isRecurring, setRecurring] = React.useState(false);
  const [interval, setInterval] = React.useState(15);

  const handleSubmit = async (e) => {
    const vals = {
      keywords: keywords,
      location: location,
      email: email,
      priceMin: min,
      priceMax: max,
      condition: condition,
      interval: isRecurring ? interval : 0,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vals),
      mode: "cors",
    };
    let route = name.toLowerCase();
    fetch(`http://localhost:3080/api/${route}`, requestOptions).then(
      (response) => console.log(response.json())
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="wrapper">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              label="Keyword(s)"
              variant="standard"
              onChange={(e) => {
                setKeywords(e.target.value.split(", "));
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              label="Location"
              variant="standard"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ gap: 1, s: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={min}
                onChange={(e) => {
                  setMin(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
            <FormControl sx={{ gap: 1, s: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={max}
                onChange={(e) => {
                  setMax(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
            <Typography id="input-slider" gutterBottom>
              Radius
            </Typography>
            <Slider
              marks={radiusMarks}
              min={0}
              max={80}
              step={10}
              labelId="radius-label"
              id="radius"
              defaultValue={30}
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Condition
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="new" control={<Radio />} label="New" />
                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="Used"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            direction="column"
            xs={6}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    setRecurring(!isRecurring);
                  }}
                />
              }
              label="Recurring?"
            />
            <FormControl>
              <InputLabel id="select-label">Interval</InputLabel>
              <Select
                value={interval}
                onChange={(e) => {
                  setInterval(e.target.value);
                }}
                disabled={!isRecurring}
                label="Interval"
                labelId="select-label"
                id="Interval"
              >
                <MenuItem value={1}>1 Minutes</MenuItem>
                <MenuItem value={5}>5 Minutes</MenuItem>
                <MenuItem value={15}>15 Minutes</MenuItem>
                <MenuItem value={30}>30 Minutes</MenuItem>
                <MenuItem value={60}>60 Minutes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent="center" alignContent="center" pt={5}>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default SearchForm;
