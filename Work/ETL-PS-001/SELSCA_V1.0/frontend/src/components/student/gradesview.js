import React from 'react';
import { Button, Typography } from '@mui/material';
import App from './grades';
import  { useState, useEffect } from 'react';
import axios from 'axios';

const Capsule = () => {
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
    
    
    fontFamily: 'Roboto',
  };

  
  const fulllineStyle = {
    position: 'absolute',
    top: '50%',
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: '#000',
  };
  

  const dateStyle = {
    position: 'absolute',
    top: '22%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '14px',
  };

  const bottomSectionStyle = {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '50%',
    background:  '#D5E8D4',
    borderRadius: '0 0 50px 50px',
  };
  const bottomSectionStyleforAbsent = {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '50%',
    background:  '#F8CECC' ,
    borderRadius: ' 0 0 50px 50px ',
    fontWeight: 'bold',
    textAlign:'center'
    
  };
  const bottomSectionStyleforGrade = {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '50%',
    background:  '#F9D39A' ,
    borderRadius: ' 0 0 50px 50px ',
    fontWeight: 'bold',
    textAlign:'center'
    
  };

  const stage = 'Finals';
  const date = '2023-03-03';

  return (
    <div>
      <br/>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ ...capsuleStyle, marginLeft: '40px' }}>
          <span style={dateStyle}><strong style={{fontWeight: 'bold'}}>{stage}</strong></span>
          <span style={fulllineStyle}>Test on<br></br>{date}</span>
        </div>
        <div style={{ ...capsuleStyle, marginLeft: '40px' }}>
        <div style={bottomSectionStyle} />
        <span style={dateStyle}><strong style={{fontWeight: 'bold'}}>{stage}</strong></span>
          <span style={fulllineStyle}>Grades Due on<br></br>{date}</span>
        </div>
        <div style={{ ...capsuleStyle, marginLeft: '40px', fontFamily: 'Roboto' }}>
          <div style={ bottomSectionStyleforAbsent} />
          <span style={dateStyle}><strong style={{fontWeight: 'bold'}}>{stage}</strong></span>
          <span style={fulllineStyle}><strong style={{fontWeight: 'bold'}}>ABSENT!!!</strong></span>
        </div>
        <div style={{ ...capsuleStyle, marginLeft: '40px', fontFamily: 'Roboto' }}>
          <div style={ bottomSectionStyleforGrade} />
          <span style={dateStyle}><strong style={{fontWeight: 'bold'}}>{stage}</strong></span>
          <span style={fulllineStyle}><strong style={{fontWeight: 'bold'}}>Grades Pending!</strong></span>
        </div>
      </div>
      
      
    </div>
  );
};
      

export default Capsule;
