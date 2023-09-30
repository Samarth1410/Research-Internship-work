import { Button, Card, CardContent, Grid, OutlinedInput, Select, MenuItem, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./../../styles/styles.css";

const ExamDates = () => {
    const [dates , setDates] = useState([{

    }])

    const [selectedSubject, setSelectedSubject] = useState("");
    const [testDates , setTestDates] = useState([]);
    const [tests , setTests] = useState(["fa1Date","fa2Date","sa1Date","fa3Date","fa4Date","sa2Date",])


    const Change = (e,exam) => {

        if (!dates[0][exam]) {
            console.log('not found')
            setDates(s => {
                const newDates = s.slice();
                newDates[0][exam] = e.target.value;
                return newDates;
            })
        }
        else {
            console.log('found')   
            setDates(s => {
                const newDates = s.slice();
                newDates[0][exam] = e.target.value;
                return newDates;
            })
        }
        console.log(dates[0])
    }
    
    const handleSubjectChange = async (event) => {
        setSelectedSubject(event.target.value);
        try {
          const response = await axios.post("http://localhost:5000/grades/getTestDates", {
            subject: event.target.value,
          });
          setTestDates(response.data);
          console.log(testDates)
        } catch (err) {
          console.error("Error fetching grades due dates:", err);
        }
      };


    const OnSubmit = async () => {

        if (!dates[0]['subject']) {
            Swal.fire({
                icon: 'warning',
                text: 'Please select subject'
            })
            return
        } else 
        {
            Swal.fire({
                title: "Please Wait",
                text : "Uploading",
                backdrop: "true"
            })
            Swal.showLoading()
            console.log('subject found!')
            try {
                const response = axios.post('http://localhost:5000/grades/submitDates' , dates)
                console.log(response)
                Swal.close()
                    Swal.fire({
                        icon : 'success',
                        title : 'Dates successfully updated'
                    })
                    
            }
            catch (err) {
                Swal.fire({
                    icon : 'error',
                    title : err.response.data.message
                })
            }
        }
        

    }


  return (
    <>
      <Container>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container>
            <Grid item xs ={6} className="spacedGrid" justifyContent="right" >
        <Typography variant="body1">Subject : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left" >
        <Select className="primarySelect"
        onChange={(e) => Change(e,'subject')}>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Maths">Maths</MenuItem>
                        <MenuItem value="Hindi">Hindi</MenuItem>
                        <MenuItem value="Social">Social</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
        </Select>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right" >
        <Typography variant="body1">fa1 : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left">
        <TextField type="date" onChange={(e) => Change(e,'fa1Date')}></TextField>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right">
        <Typography variant="body1">fa2 : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left">
        <TextField type="date" onChange={(e) => Change(e,'fa2Date')}></TextField>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right">
        <Typography variant="body1">sa1 : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left">
        <TextField type="date" onChange={(e) => Change(e,'sa1Date')}></TextField>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right">
        <Typography variant="body1">fa3 : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left">
        <TextField type="date" onChange={(e) => Change(e,'fa3Date')}></TextField>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right">
        <Typography variant="body1">fa4 : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left">
        <TextField type="date" onChange={(e) => Change(e,'fa4Date')}></TextField>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right">
        <Typography variant="body1">sa2 : </Typography>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="left">
        <TextField type="date" onChange={(e) => Change(e,'sa2Date')}></TextField>
        </Grid>
        <Grid item xs ={6} className="spacedGrid" justifyContent="right">
        <Button onClick={OnSubmit}>submit</Button>
        </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={6} className="spacedGrid" justifyContent="right">
                <Typography variant="body1">Subject:</Typography>
              </Grid>
              <Grid item xs={6} className="spacedGrid" justifyContent="left">
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
              </Grid>
              {/* Create a table to display the exam dates */}
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>fa1</TableCell>
                      <TableCell>fa2</TableCell>
                      <TableCell>sa1</TableCell>
                      <TableCell>fa3</TableCell>
                      <TableCell>fa4</TableCell>
                      <TableCell>sa2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {testDates.length > 0 && (
                      <TableRow>
                        {tests.map((test) => (
                            <TableCell key={test}>
                                <Typography variant="body1">
                                {testDates[0][test] ? new Date(testDates[0][test]).toLocaleDateString("en-GB")
                                : "Not updated"}
                                </Typography>
                            </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ExamDates;
