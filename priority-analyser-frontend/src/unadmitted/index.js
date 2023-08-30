import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import api from "../lib/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  inputField: {
    marginBottom: theme.spacing(2),
    "& .MuiInputBase-root": {
      fontSize: "1.2rem",
      padding: theme.spacing(1),
    },
    "& .MuiInputLabel-outlined": {
      fontSize: "1.2rem",
    },
  },
  missingRanks: {
    marginTop: theme.spacing(2),
  },
}));

const UnadmittedPage = () => {
  const classes = useStyles();

  const [minRank, setMinRank] = useState(100); // Default min rank
  const [maxRank, setMaxRank] = useState(500); // Default max rank
  const [missingStudents, setMissingStudents] = useState(0); // State to store the missing students count
  const [missing, setMissing] = useState([]); // State to store the missing ranks

  useEffect(() => {
    fetchData(minRank, maxRank); // Fetch data initially and whenever minRank or maxRank changes
  }, [minRank, maxRank]);

  const fetchData = (min, max) => {
    const data = new FormData();
    data.set("min_rank", min);
    data.set("max_rank", max);
    data.set("college", "ALL");

    api.post("/rank/", data).then((res) => {
      /* sanitize data in required form */
      setMissingStudents(res.data.unadmitted_students);
      setMissing(res.data.missing_ranks);
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3">Unadmitted</Typography>
      {/* Input fields for min and max rank */}
      <TextField
        className={classes.inputField}
        label="Min Rank"
        type="number"
        value={minRank}
        onChange={(e) => setMinRank(Number(e.target.value))}
        variant="outlined"
      />
      <TextField
        className={classes.inputField}
        label="Max Rank"
        type="number"
        value={maxRank}
        onChange={(e) => setMaxRank(Number(e.target.value))}
        variant="outlined"
      />
      {/* Display the missing students count */}
      <Typography variant="h4">Unadmitted Students: {missingStudents}</Typography>
      {/* Display the missing ranks with proper spaces */}
      <Box className={classes.missingRanks}>
        <Typography variant="h4">Unadmitted Ranks:</Typography>
        <Typography variant="body1">{missing.join(", ")}</Typography>
      </Box>
      {/* Add other components or UI elements as needed */}
    </div>
  );
};

export default UnadmittedPage;
