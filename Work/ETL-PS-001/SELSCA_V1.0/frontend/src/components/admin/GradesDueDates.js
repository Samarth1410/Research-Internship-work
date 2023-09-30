import React, { useEffect, useState } from "react";
import {  Typography,  Grid,  TextField, Button,  MenuItem,  Select,  Table,TableHead,  TableRow,TableBody,   TableCell,FormControl,  InputLabel,  Box,  Card,  CardContent,} from "@mui/material";
import { makeStyles } from "@mui/styles";
import swal from "sweetalert2";
import axios from "axios";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    "& .MuiTextField-root": {
      marginBottom: "10px",
    },
  },
  tableContainer: {
    marginTop: "30px",
  },
});

function GradesDueDateForm() {
  const classes = useStyles();
  const [testName, setTestName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [gradesDueDates, setGradesDueDates] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testName || !subject || !date) {
      swal.fire({
        title: "Please fill out all required fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      await axios.post("http://localhost:5000/info/submitGradesDueDates", {
        testName,
        subject,
        date,
      });
      swal.fire({
        title: "Grades due date submitted successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setTestName("");
      setSubject("");
      setDate("");
    } catch (err) {
      swal.fire({
        title: "Error submitting grades due date",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubjectChange = async (event) => {
    setSelectedSubject(event.target.value);
    try {
      const response = await axios.post("http://localhost:5000/info/getGradesDueDates", {
        subject: event.target.value,
      });
      setGradesDueDates(response.data);
    } catch (err) {
      console.error("Error fetching grades due dates:", err);
    }
  };
  

  const filteredGradesDueDates = gradesDueDates.filter(
    (gradeDueDate) => gradeDueDate.subject === selectedSubject
  );

  return (
    <>
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Grades Due Dates
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" gutterBottom>
          Test Name:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
      <Select
      labelId="test-select-label"
      id="test-select"
    value={testName}
    onChange={(e) => setTestName(e.target.value)}
    variant="outlined"
    >
      <MenuItem value="fa1">fa1</MenuItem>
      <MenuItem value="fa2">fa2</MenuItem>
      <MenuItem value="sa1">sa1</MenuItem>
      <MenuItem value="fa3">fa3</MenuItem>
      <MenuItem value="fa4">fa4</MenuItem>
      <MenuItem value="sa2">sa2</MenuItem>
    </Select>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" gutterBottom>
          Subject:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
      <Select
            labelId="subject-select-label"
            id="subject-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Maths">Maths</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Social">Social</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
          </Select>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" gutterBottom>
          Date:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          label="Date"
          type="date"
          variant="outlined"

          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained"  sx={{ mt: 2  , alignItems: "center"}} type="submit">
          Submit
        </Button>
      </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Box mt={4} className={classes.tableContainer}>
        <Card>
          <CardContent>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="subject-select-label">Subject</InputLabel>
              <Select
                labelId="subject-select-label"
                id="subject-select"
                value={selectedSubject}
                onChange={handleSubjectChange}
                label="Subject"
              >
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Maths">Maths</MenuItem>
        <MenuItem value="Hindi">Hindi</MenuItem>
        <MenuItem value="Social">Social</MenuItem>
        <MenuItem value="Science">Science</MenuItem>
              </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGradesDueDates.map((gradeDueDate) => (
                    <TableRow key={gradeDueDate._id}>
                      <TableCell>
                        <Typography variant="body1">
                          {gradeDueDate.testName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {gradeDueDate.subject}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(gradeDueDate.date))}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default GradesDueDateForm;

