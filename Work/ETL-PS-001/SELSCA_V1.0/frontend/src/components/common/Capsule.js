import React ,{ useState , useEffect} from 'react';
import {Button,Typography,Box} from '@mui/material';

const Capsulestyle=(props)=>{
    const capsuleStyle = {
        position: 'relative',
        display: 'inline-block',
        borderRadius: '50px',
        backgroundColor: '#f0f0f0',
        padding: '50px 100px',
        fontSize: '16px',
        color: '#000',
        textAlign: 'center',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        lineHeight: '1.5',
        verticalAlign: 'middle',
        border: '2px solid #000', 
        boxSizing: 'border-box'
    };
    
    const lineStyle = {
        position: 'absolute',
        top: '50%',
        left: '25%',
        width: '75%',
        height: '2px',
        backgroundColor: '#000',
        fontWeight: 'bold',
    };
    
    
    const verticalLineStyle = {
        position: 'absolute',
        top: '0',
        left: '25%',
        width: '2px',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px'
    };
    
    const assessmentStyle = {
        position: 'absolute',
        top: '50%',
        left: '1',
        transform: 'translate(-50%, -50%)',
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: '10px',
        whiteSpace: 'nowrap',
        marginRight: '20px' // Add margin-right here
      };
      
    const dateStyle = {
        position: 'absolute',
        top: '22%',
        // left: '50%',
        right: 4,
        transform: 'translate(-50%, -50%)',
        fontSize: '14px',
        fontWeight: 'bold', // Add fontWeight here
      };

      
    const scoreStyle = {
        fontWeight: 'light', 
      };

    // const date = "2023-02-27";
    // const score = "25";
    // const assessment = "FA-1";
    
    return(
        <div>

            <br></br>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" component="h1" color="black">
                Subject 1
                </Typography>
                <div style={{ ...capsuleStyle, marginLeft: '40px' }}>
                <span style={dateStyle}> Test on
                <span style={scoreStyle}> <br></br>{props.date}</span></span>
                <span style={lineStyle}>Max Score Possible<br></br>{props.score}</span>
                <span style={verticalLineStyle}>
                    <span style={assessmentStyle}>{props.assessment}</span>
                </span>
                </div>
                <Button variant="contained" disableElevation style={{ marginLeft: '40px', backgroundColor: '#d9d9d9', color: 'black' }}>
  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Syllabus</Typography>
  <span style={{ fontWeight: 'light', textTransform: 'lowercase', marginLeft: '5px' }}>ch1 and ch2</span>
</Button>

</div>   
        </div>    
    );
};

export default Capsulestyle;