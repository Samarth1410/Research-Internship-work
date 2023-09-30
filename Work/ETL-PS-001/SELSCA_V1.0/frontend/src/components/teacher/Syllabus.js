import { Button, Grid, MenuItem, Select, TextField, Typography, useScrollTrigger } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState,useEffect } from "react";
import Swal from "sweetalert2";

const Syllabus = () => {
    const [subject , setSubject] = useState('')
    const [testName , setTestName] = useState('')
    const [syllabus , setSyllabus] = useState('')
    const [classes , setClasses] = useState('')
    const [testInfo , setTestInfo] = useState([])
    const [allClasses , setAllClasses] = useState([])

    
    useEffect(() => {
        fetch('http://localhost:5000/info/allClasses').then((response) => response.json())
        .then((data) => (setAllClasses(data)))
        .catch((error) => console.log(error));
    } ,[])

    useEffect(() => {
        if (classes && subject) {
            const postData = {
                class: classes,
                subject: subject
              };
            fetch('http://localhost:5000/info/getTestInfo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
              })
                .then((response) => response.json())
                .then((data) => (setTestInfo(data)))
                .catch((error) => console.log(error));
            };
        }
      , [classes, subject]);



    //function for checking if all the neccessary fields have been entered
    const CheckInput = () => {

        if (subject === "") {
            Swal.fire({
                icon: 'warning',
                text: 'Please select subject'
            })
        }
        else if (testName === "") {
            Swal.fire({
                icon: 'warning',
                text: 'Please select test'
            })
            return false
        } 
        else if (syllabus === "") {
            Swal.fire({
                icon : 'warning',
                text : 'Please enter the new syllabus'
            })
        }
        else {
            return true
        }
    }


    //function for updating the new syllabus in the backend ,
    //creates a new object in the neccessary format and sends it to the backend
    const handleSubmit = async () => {

        if (CheckInput()) {

            
            Swal.fire({
                title : "Please Wait",
                text : "Uploading",
                backdrop : "true"
            })
            Swal.showLoading()
            
            
            const request = {
                subject : subject,
                testName : testName,
                syllabus : syllabus
            }
            
            axios.post("http://localhost:5000/syllabus/submitSyllabus" , request)
            .then(res => {
                Swal.close()
                Swal.fire({
                    icon : 'success',
                    title : 'Syllabus successfully updated!'
                })
                .then(() => {
                window.location.reload(false);
            })
        })
        .catch(err => {
            console.log(err)
            Swal.fire({
                icon : 'error',
                title : err.response.data.message
            })
        })
    }
    }
    
    return(
        <Container >
        <Grid container >
                <Grid item xs={12} display="flex" alignItems='center' justifyContent='center'>
                    <Typography variant="Overline" sx={{fontSize:50 , color : "#242424"}} >Syllabus Portal</Typography>
                </Grid>








                <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                        color : "#242424"}}
                        >Select Class :</Typography>
                    </Grid>
                <Grid item xs ={6}  display="flex" alignItems='center' justifyContent='left' padding={3}>
                    <Select value={classes} label="Classes"
                    sx={{
                        backgroundColor : "#a3a2a2",
                        color : "#242424"
                    }}
                    onChange={(e) => {setClasses(e.target.value)}}>
                
                        
                {allClasses.map((cls)=>(
                            <MenuItem key = {cls} value={cls}>{cls}</MenuItem>
                        ))}
                        
                    </Select>
                </Grid>





                <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                        color : "#242424"}}
                        >Select Subject :</Typography>
                    </Grid>
                <Grid item xs ={6}  display="flex" alignItems='center' justifyContent='left' padding={3}>
                    <Select value={subject} label="Subject"
                    sx={{
                        backgroundColor : "#a3a2a2",
                        color : "#242424"
                    }}
                    onChange={(e) => {setSubject(e.target.value)}}>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Maths">Maths</MenuItem>
                        <MenuItem value="Hindi">Hindi</MenuItem>
                        <MenuItem value="Social">Social</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
                        
                    </Select>
                </Grid>
                    <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                        color : "#242424"}}
                        >Select test :</Typography>
                    </Grid>
                    <Grid item xs ={6}  display="flex" alignItems='center' justifyContent='left' padding={3}>
                    <Select value={testName} label="TestName"
                    sx={{
                        backgroundColor : "#a3a2a2",
                        color : "#242424"
                    }}
                    onChange={(e) => {setTestName(e.target.value)}}>
                        {testInfo.map((test)=>(
                            <MenuItem key = {test} value={test}>{test}</MenuItem>
                        ))}
           
                       
                        
                    </Select>
                </Grid>
                    <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                            color : "#242424"}} 
                    >Sylabus :</Typography>
                    </Grid>
                    
                    <Grid item xs ={6} display="flex" alignItems='center' justifyContent='left' padding={2}>
                        <TextField 
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            }
                        }}
                         onChange={(e) => {setSyllabus(e.target.value)}}> </TextField>
                    </Grid>
                    <Grid item xs={12} 
                    sx={{
                        display : "flex",
                        justifyContent : "center",
                        alignContent : "center"
                    }}>
                        <Button onClick={handleSubmit} >Submit</Button>
                    </Grid>
                    </Grid>
        </Container>
    )
}


export default Syllabus;