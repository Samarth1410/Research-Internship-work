import { Typography , Grid , Container,  Select , MenuItem  , TextField , Button, Menu} from "@mui/material";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import "./../../../styles/styles.css" ;

const Register = () => {
    //setting neccesary parameters for registration
    //role determines which inputs are rendered on the page
    const [role , setRole] = useState("");
    const [email , setEmail] = useState()
    const [name , setName] = useState("");
    const [password , setPassword] = useState("");
    const [studentID , setstudentID] = useState("");
    const [classno , setClassno] = useState("");
    const [dob , setDob] = useState("");

    //checking if all the required parameters or registration are given 
    //giving an alert if not given
    const CheckInput = () => {

        if (role !== "class") {

            
            if (name === "") {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter name'
            })
        }
        else if (email === "") {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter email'
            })
            return false
        } 
        else if (password === "") {
            Swal.fire({
                icon : 'warning',
                text : 'Please enter password'
            })
        }
        else if (studentID === "") {
            Swal.fire({
                icon : 'warning',
                text : 'Please enter studentID no.'
            })
        }
        else if (classno === "" && role ==='student'){
            Swal.fire({
                icon : 'warning',
                text : 'Please enter Class'
            })
        }
        else {
            return true
        }
    }
    else if (role ==="class") {
        if (name === "") {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter name'
            })
        }
        else {
            return true
        }
    }
    }

    //clears all state variables on successful registration 
    const ClearForm = () => {
        setName("")
        setEmail("")
        setPassword("")
        setDob("")
        setClassno("")
    }

    //main registration fucntion
    const handleSubmit = () => {
        
        if (CheckInput()) {
            //making an user object
            //even though certain users do not require some parameters (like teacher does not require class)
            //the backend will automatically leave those parameters and take only those required
            const newUser = {
                name : name,
                email : email,
                password : password,
                studentID: studentID,
                class : classno,
                DOB : Date(dob)
            }

            Swal.fire({
                title: "Please Wait",
                text : "Uploading",
                backdrop: "true"
            })
            Swal.showLoading()

            //conditionally sending the user object to the appropriate Backend API endpoints
            if (role === "admin") {
                axios.post("http://localhost:5000/register/registerAdmin" , newUser)
                .then(res => {
                    Swal.close()
                    Swal.fire({
                        icon : 'success',
                        title : 'Admin successfully registered'
                    })
                    ClearForm()
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon : 'error',
                        title : err.response.data.message
                    })
                })
            }
            else if (role === "headmaster") {
                console.log('test')
                axios.post("http://localhost:5000/register/registerHeadmaster" , newUser)
                .then(res => {
                    Swal.close()
                    Swal.fire({
                        icon : 'success',
                        title : 'Headmaster successfully registered'
                    })
                    ClearForm()
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon : 'error',
                        title : err.response.data.message
                    })
                })
            }
            else if (role === "teacher") {
                axios.post("http://localhost:5000/register/registerTeacher" , newUser)
                .then(res => {
                    Swal.close()
                    Swal.fire({
                        icon : 'success',
                        title : 'Teacher successfully registered'
                    })
                    ClearForm()
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon : 'error',
                        title : err.response.data.message
                    })
                })
            }
            else if (role ==='student') {
                const studentsData = {
                    students: [
                        {
                            name: name,
                            email: email,
                            password: password,
                            studentID: studentID,
                            className: classno,
                            DOB: Date(dob)
                        }
                    ]
                }


                axios.post("http://localhost:5000/register/registerStudent" , studentsData)
                .then(res => {
                    Swal.close()
                    Swal.fire({
                        icon : 'success',
                        title : 'Student successfully registered'
                    })
                    ClearForm()
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon : 'error',
                        title : err.response.data.message
                    })
                })
            }
            else if (role === "class") {
                const newClass = {
                    name : name
                }

                axios.post("http://localhost:5000/register/registerClass" , newClass)
                .then(res => {
                    Swal.close()
                    Swal.fire({
                        icon : 'success',
                        title : 'class successfully registered'
                    })
                    ClearForm()
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
    }
    return (
        <Container >
            <Grid container >
                <Grid item xs={12} display="flex" alignItems='center' justifyContent='center'>
                    <Typography variant="Overline" sx={{fontSize:50 , color : "#242424"}} >Registration Portal</Typography>
                </Grid>
                <Grid item xs={6} display = 'flex' alignItems={"center"} justifyContent="right" padding={3}>
                    <Typography variant="body1"
                    sx ={{paddingRight:3,}}>Select Role being registered :</Typography>
                </Grid>
                <Grid item xs ={6}  display="flex" alignItems='center' justifyContent='left' padding={3}>
                    <Select value={role} label="Role"  
                    sx={{
                    width: 100,
                    height: 60,
                    marginRight: 15,
                    border: "1px solid darkgrey",
                    color: "#242424",
                    "& .MuiSvgIcon-root": {
                        color: "black",
                    },
                    }}
                    onChange={(e) => {setRole(e.target.value)}}>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="headmaster">Headmaster</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="class">Class</MenuItem>
                    </Select>
                </Grid>
                </Grid>
                <Container>
                <Grid container spacing={2} sx={{paddingTop:5}}>
                    <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                            color : "#242424"}}
                            >Name :</Typography>
                    </Grid>
                    <Grid item xs ={6} >
                        <TextField
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            }
                        }}
                        onChange={(e) => {setName(e.target.value)}}> </TextField>
                    </Grid>
                    {
                        (role !== "class") && 
                        <>
                        <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                            color : "#242424"}} 
                            >Email :</Typography>
                    </Grid>
                    
                    <Grid item xs ={6}>
                        <TextField 
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            }
                        }}
                        onChange={(e) => {setEmail(e.target.value)}}> </TextField>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                            color : "#242424"}} 
                            >Password :</Typography>
                    </Grid>
                    
                    <Grid item xs ={6}>
                        <TextField type='password' 
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            }
                        }}
                        onChange={(e) => {setPassword(e.target.value)}}> </TextField>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                            color : "#242424"}}
                            >studentID :</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField sx={{
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            }
                        }}
                        onChange={(e) => {setstudentID(e.target.value)}} ></TextField>
                    </Grid>
                    </>
                    }

                        {/* selectively rendering the neccessary inputs depending on the role (teacher or student) */}
                    {
                        (role=== "teacher" || role=== "headmaster") &&
                        <>
                        <Grid item xs ={6} display="flex" justifyContent={'right'} alignItems="center">
                        <Typography 
                        variant="body1" 
                        sx={{paddingRight:3,
                            color : "#242424"}} 
                            >Date of Birth :</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="date" sx={{
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            }
                        }}
                         onChange={(e) => {setDob(e.target.value)}}> </TextField>
                        </Grid>
                        </>
                    }
                    {
                        role === "student" &&
                        <>
                        <Grid item xs ={6} display="flex" justifyContent={'right'} alignItems="center">
                            <Typography 
                            variant="body1" 
                            sx={{paddingRight:3,
                                color : "#242424"}} 
                            >Date of Birth :</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="date" 
                            sx={{
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary'
                                }
                            }}
                             onChange={(e) => {setDob(e.target.value)}}> </TextField>
                        </Grid>
                        <Grid item xs ={6} display="flex" justifyContent={'right'} alignItems="center">
                            <Typography 
                            variant="body1" 
                            sx={{paddingRight:3,
                                color : "#242424"}} 
                            >Class :</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            sx={{
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary'
                                }
                            }}
                             onChange={(e) => {setClassno(e.target.value)}}> </TextField>
                        </Grid>
                        </>
                    }
                    <Grid item xs={12} display="flex" justifyContent={"center"} alignItems="center" >
                        <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
                </Container>
        </Container>
    )
}

export default Register;