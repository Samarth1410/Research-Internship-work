var express = require("express");
var router = express.Router();

const Grades = require("../models/Grades");
const Student = require("../models/Student");

router.post("/getGrades", async (req, res) => {
  const studentIDs = req.body.studentIDs;
  const subjects = req.body.subjects;
  const grades = [];

  console.log(subjects)

  for (let i = 0; i < studentIDs.length; i++) {
    for (let j = 0; j < subjects.length; j++) {
      console.log(subjects[j]);
      const subjectGrades = await Grades.findOne({
        studentID: studentIDs[i],
        subject: subjects[j],
      }).populate('tests'); // Add this line to populate the tests array

      if (subjectGrades) {
        console.log("found");
        grades.push(subjectGrades);
      } else {
        console.log(subjects[j], "not found");
      }
    }
  }

  console.log(grades);
  res.status(200).send(grades);
});




router.post("/submitGrades", async (req, res) => {
  const studentIDs = req.body.studentIDs;
  const subject = req.body.subject;
  const grades = req.body.grades;

  console.log(studentIDs, subject, grades);

  for (let grade of grades) { // Change this line to iterate through the grades array
    try {
      const studentID = grade["studentID"];
      const tests = grade["tests"];

      const existingGrades = await Grades.findOne({ studentID: studentID, subject: subject });

      if (existingGrades) {
        for (const newTest of tests) {
          const existingTestIndex = existingGrades.tests.findIndex(test => test.testName === newTest.testName);

          if (existingTestIndex > -1) {
            existingGrades.tests[existingTestIndex] = newTest;
          } else {
            existingGrades.tests.push(newTest);
          }
        }

        await existingGrades.save();
      } else {
        const newGrades = new Grades({
          studentID: studentID,
          subject: subject,
          tests: tests
        });

        await newGrades.save();
      }
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).send("success");
});




router.post("/getTestDates", async (req, res) => {
  const subject = req.body.subject;
  console.log(subject);

  try {
    const testDates = await Grades.aggregate([
      { $match: { subject: subject } },
      { $unwind: "$tests" },
      {
        $group: {
          _id: "$tests.testName",
          testDate: { $first: "$tests.date" },
        },
      },
    ]);

    res.status(200).json(testDates);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching test dates." });
  }
});

module.exports = router;
