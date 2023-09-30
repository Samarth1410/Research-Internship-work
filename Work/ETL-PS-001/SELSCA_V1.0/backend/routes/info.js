const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const GradesDueDate = require('../models/GradesDueDates');
const Attendance = require('../models/Attendance');
const Class = require("../models/Class");
const Syllabus = require('../models/Syllabus');
const TestInfo = require('../models/TestInfo');

// router.post('/getGradesDueDates', async (req, res) => {
//     const subject = req.body.subject;
  
//     console.log(subject)
//     try {
//       const gradesDueDates = await GradesDueDate.find({ subject: subject });
//       console.log(gradesDueDates)
  
//       if (!gradesDueDates || gradesDueDates.length === 0) {
//         console.log('grades due date not found')
//         return res.status(404).json({ message: "Grades due date not found" });
//       }
//       return res.status(200).json(gradesDueDates);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Internal server error" })
//     }
//   })
router.post('/getTestGrades', async (req, res) => {
  const { class: classId, studentID, subject } = req.body;

  if (!classId || !studentID || !subject) {
    return res.status(400).json({ message: "Please provide class, studentID, and subject." });
  }

  try {
    const testGrades = await Grades.find({
      studentID: studentID,
      subject: subject,
    }).populate('tests');

    if (!testGrades || testGrades.length === 0) {
      return res.status(404).json({ message: "No test grades found for the given criteria." });
    }

    // Extract the test grades from the testGrades array
    const result = testGrades.map(grade => grade.tests);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/submitGradesDueDates' , async (req,res) => {

    const {testName , subject, date} = req.body;

    try {
        let gradesDueDate = await GradesDueDate.findOne({testName : testName, subject : subject});

        if (!gradesDueDate) {
            gradesDueDate = new GradesDueDate({testName : testName , subject : subject , date : date}); 
        } else {
            gradesDueDate.date = date;
        }

        await gradesDueDate.save();
        console.log('grades registered')
        return res.status(201).json({ message : "Grades due date registered successfully"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message : "Internal server error"})
    }
})


router.post('/submitAttendance' , async (req,res) => {
  
  try {
    const studentAttendanceRecords = req.body;

    // Validate input
    if (!Array.isArray(studentAttendanceRecords)) {
      return res.status(400).json({ error: 'Input should be an array of student attendance records.' });
    }

    const savedRecords = [];
    for (const record of studentAttendanceRecords) {
      const { name, class: classNumber, month, date, status } = record;

      const newAttendance = new Attendance({
        name,
        class: classNumber,
        month,
        date,
        status,
      });

      const savedAttendance = await newAttendance.save();
      savedRecords.push(savedAttendance);
    }

    res.status(201).json({ message: 'Attendance records saved successfully.', data: savedRecords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})



//endpoints for getting a list of the students in a class 
router.post('/getClass', async (req, res) => {
  try {
    let body = {};
    if (req.body.class) {
      // Convert the class query parameter to a number
      body.class = parseInt(req.body.class, 10);
    }

    const students = await Student.find(body);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// In your routes file, e.g., routes.js

router.get('/allClasses', async (req, res) => {
    try {
        // Fetch all the existing class names from your database
        const classes = await Class.find({}, { name: 1, _id: 0 });
        
        // Extract class names into an array
        const classNames = classes.map(cls => cls.name);

        // Return the class names as a JSON array
        res.status(200).json(classNames);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching classes', error: error.message });
    }
});




router.post('/getTestInfo', async (req, res) => {
  const { class: className, subject } = req.body;

  if (!className || !subject) {
    return res.status(400).json({ message: "Please provide class and subject." });
  }

  try {
    const classInfo = await Class.findOne({ name: className }).populate({
      path: 'tests',
      match: { subject: subject },
    });

    if (!classInfo || !classInfo.tests || classInfo.tests.length === 0) {
      return res.status(404).json({ message: "No test information found for the given criteria." });
    }

    res.status(200).json(classInfo.tests);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Define an endpoint for storing data
router.post('/info', async (req, res) => {
  try {
    const { class: studentClass,date,subject, testName, syllabus,max_score } = req.body;

    // Create a new data instance
    const newData = new TestInfo({ class: studentClass,date,subject, testName, syllabus,max_score })


    // Save the data to the database
    await newData.save();

    res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint for retrieving data
router.get('/info', async (req, res) => {
  try {
    // Retrieve all data from the database
    const allData = await TestInfo.find();

    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post("/test" , (req, res) => {
  res.send('working')
})
module.exports = router;