import React ,{ useState , useEffect} from 'react';
import {
Button,Typography,Box, Grid} from '@mui/material';
import axios from 'axios';
import Capsulestyle from '../common/Capsule';
import Smallcircles from './gradesview';
import { spacing } from '@mui/system';

const CircleWithFullLine = ({ upMark, downMark, isLarge, label }) => {
    const size = isLarge ? 120 : 5000;
    const circleStyle = {
      width: isLarge ? '100px' : '5000px',
      height: isLarge ? '100px' : '5000px',
      borderRadius: '50%',
      backgroundColor: 'white',
      border : '2px solid black',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isLarge ? '20px' : '10px',
    };

const lineStyle = {
width: '100%',
height: '2px',
backgroundColor: 'black ',
position: 'absolute',
left: 0,
top: '50%',
transform: 'translateY(-50%)',
};

const topMarkStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    position: 'absolute',
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 15px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black', 
    fontWeight:'bold'
  };

  const bottomMarkStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    position: 'absolute',
    bottom: 'calc(50% - 30px)',
    left: 'calc(50% - 15px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black', // added color property
    fontWeight:'bold'
  };

return (
<div style={circleStyle}>
<div style={lineStyle}></div>
<div style={topMarkStyle}>{upMark}</div>
<div style={bottomMarkStyle}>{downMark}</div>
<div style={{ position: 'absolute', bottom: '-30px', textAlign: 'center', width: '100%', color:'black' }}>
{label}
</div>
</div>
);
};


const capsuleStyle= {
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
const topSectionStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '50%',
  background: 'linear-gradient(to left, #D5E8D4 75%, #f0f0f0 50%)',
  borderRadius: '50px 50px 0 0',
};
const topSectionStyleforAbsent = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '50%',
  background: 'linear-gradient(to left, #F8CECC 75%, #f0f0f0 50%)',
  borderRadius: '50px 50px 0 0',
  fontWeight: 'bold'
  
};
const fulllineStyle = {
  position: 'absolute',
  top: '50%',
  left: '0',
  width: '100%',
  height: '2px',
  backgroundColor: '#000',
  fontWeight: 'bold',
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
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '14px',
  fontWeight: 'bold',
};


const date = ["2023-04-03",];
const score = "100";
const assessment = "FA-1";
const stage = 'Finals';

const App = () => {
  useEffect(() => {
    getGrades()
    console.log(currentDate)
  } , [])

  const current = new Date()
  const currentDate = `${current.getDate().toString().padStart(2, '0')}-${(current.getMonth()+1).toString().padStart(2, '0')}-${current.getFullYear()}`;

  const [studentData , setStudentData] = useState({ 
    studentIDs : [4,1,2,3],
    subject : ["English","Maths","Hindi","Science"]
  })
  
  const [subject , setSubject] = useState(["English","Maths","Hindi","Science"])
  const [grades , setGrades] = useState(["fa1","fa2","sa1","fa3","fa4","sa2"])
  
  
  const getGrades = async () => {
  
    setStudentData({
        studentIDs : [1,2,3,4],
        subject : [subject]
    })
  
    await axios.post("http://localhost:5000/grades/getGrades" , studentData)
    .then((res) => {
        console.log(res.data)
        setGrades(res.data)
    })
    .catch(err => {
        console.log(err)
    }) 
  }
// {grades due dates requesting from backend}
const [duedate, setDuedate] = useState({
  subject: "Hindi"
});

useEffect(() => {
  getDates();
}, []);

const  [tempDate , setTempDate] = useState()

const getDates = async () => {
  try {
    const response = await axios.post("http://localhost:5000/info/getGradesDueDates", duedate);
    console.log(response.data)
    setTempDate(response.data)
  } 
  catch (err) {
    console.log(err)
  }
};

// the below code is for testdates or displying dates
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }
  
// const gradesdueon = "11-04-2023"4
// const today = new Date();
// const nextDate = new Date(today);
// nextDate.setDate(nextDate.getDate() + 10);

 

  
return (

<>
<div>
  
<Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '50px 0' }}>
<Grid container spacing={5}>
    {grades.map((item, i) => {
  //     return (
  //       <Grid item xs={12}>
  //         <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px', spacing:'5px', flexDirection: { xs: 'column', sm: 'row' } }}>
  // <Typography variant="h4" component="h1" color="black" display={'flex'} sx={{ width: { xs: '100%', sm: '120px' }, marginRight: { xs: '0', sm: '30px' }, fontSize: '28px' }}>
  //   <strong>{subject[i]}</strong>
  // </Typography> 
  //           <CircleWithFullLine upMark={grades[i]["fa1"]} downMark="100" label={<strong>FA 1</strong>} marginleft={{ xs: '0', sm: '40px' }} />
  //           <CircleWithFullLine upMark={grades[i]["fa2"]} downMark="100" label={<strong>FA 2</strong>} />
  //           <CircleWithFullLine upMark={grades[i]["sa1"]} downMark="100" label={<strong>SA 1</strong>} isLarge="SA 1" />
  //           <CircleWithFullLine upMark={grades[i]["fa3"]} downMark="100" label={<strong>FA 3</strong>} />
  //           <CircleWithFullLine upMark={grades[i]["fa4"]} downMark="100" label={<strong>FA 4</strong>} />
  //           <CircleWithFullLine upMark={grades[i]["sa2"]} downMark="100" isLarge label={<strong>SA 2</strong>} />
  //           {/* <Button variant="contained" disableElevation style={{ marginLeft: { xs: '0', sm: '40px' }, marginTop: { xs: '20px', sm: '0' }, backgroundColor: '#d9d9d9', color: 'black' , fontWeight:'bold'}}> final grade {grades[i]['finalGrade']}</Button>
  //         </Box> */}
  //            <Button
  //     variant="contained"
  //     disableElevation
  //     style={{
  //       width: '15000px', 
  //       height: '40px', 
  //       marginLeft: { xs: '0', sm: '40px' },f
  //       marginTop: { xs: '20px', sm: '0' },
  //       backgroundColor: '#d9d9d9',
  //       color: 'black',
  //       fontWeight: 'bold'
  //     }}
  //   >
  //     final grade {grades[i]['finalGrade']}
  //   </Button>
  //         </Box>
  //       </Grid> 
  //     );
    })}
  </Grid>
</Box>


 {/* below code is for capsule components */}
      <div>
      <br></br>
        <Capsulestyle date={formatDate(grades[0]['fa1Date'])} score={grades[0]['fa1']} assessment="FA-1" />
        <Capsulestyle date={currentDate} score={grades[0]['fa2']} assessment="FA-2" />
        {/* <Capsulestyle date={formatDate(grades[0]['sa1Date'])} score={grades[0]['sa1']} assessment="SA-1" />
        <Capsulestyle date={formatDate(grades[0]['fa3Date'])} score={grades[0]['fa3']} assessment="FA-3" />
        <Capsulestyle date={formatDate(grades[0]['fa4Date'])} score={grades[0]['fa4']} assessment="FA-4" />
        <Capsulestyle date={formatDate(grades[0]['sa2Date'])} score={grades[0]['sa2']} assessment="SA-2" /> */}
       </div>
       <Smallcircles></Smallcircles>

        <div>

      <br/>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ ...capsuleStyle, marginLeft: '40px' }}>
          <span style={dateStyle}>{stage}</span>
          <span style={fulllineStyle}>Test on<br></br><span style={{ fontWeight: 'normal' }}>{currentDate}</span></span>
        </div>
        {/* <div style={{ ...capsuleStyle, marginLeft: '40px' }}>
        <div style={bottomSectionStyle} />
        <span style={dateStyle}>{stage}</span>
          <span style={fulllineStyle}>Grades Due on<br></br> <span style={{ fontWeight: 'normal' }}>{duedate.gradesDue.toDateString()}</span> </span>
        </div> */}
        <div>
      {duedate.gradesDue && (
        <div style={{ ...capsuleStyle, marginLeft: '40px' }}>
          <div style={bottomSectionStyle} />
          <span style={dateStyle}>{stage}</span>
          <span style={fulllineStyle}>Grades Due on<br></br> <span style={{ fontWeight: 'normal' }}>{formatDate(duedate.gradesDue)}</span> </span>
        </div>
      )}
    </div>
        <div style={{ ...capsuleStyle, marginLeft: '40px', fontFamily: 'Roboto' }}>
  <div style={bottomSectionStyleforAbsent} />
  <span style={dateStyle}>{stage}</span>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <span style={fulllineStyle}>ABSENT!!!</span>
  </div>
</div>
 <div style={{ ...capsuleStyle, marginLeft: '40px', fontFamily: 'Roboto' }}>
          <div style={ bottomSectionStyleforGrade} />
          <span style={dateStyle}>{stage}</span>
          <span style={fulllineStyle}>Grades Pending!!</span>
        </div>
      </div>
    </div>
    </div>   




    <div>
      {
        (tempDate) => {
          let formatedDate = formatDate(tempDate[0]['date'])
          if (true) {
            return(
              <>
            <p>test</p>
            </>
          )
        }
        }
      }
    <Button onClick={() => {console.log(formatDate(tempDate[0]['date']))}} >console</Button>
    </div>
    </>



)

};
export default App;
