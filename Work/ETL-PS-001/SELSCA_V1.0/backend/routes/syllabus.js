var express = require('express');
var router = express.Router();

const Syllabus = require('../models/Syllabus');

router.post('/submitSyllabus' , async (req,res) => {

    const subject = req.body.subject;
    const testName = req.body.testName;
    const syllabus = req.body.syllabus;

    const doesExist = await Syllabus.findOne({subject :subject , testName : testName})
    if (!doesExist) {
        console.log('test syllabus does not exist , creating new colletion in mongoDB ')
        const newSyllabus = new Syllabus({
            subject : subject,
            testName : testName,
            syllabus : syllabus
        })
        
        Syllabus.create(newSyllabus)
        .then(syl => {
            res.status(200).send('new syllabus succesfully registered and updated')
        })
        .catch(err => {
            res.status(400).send(err)
        })
    }
    else {
        try {
            await Syllabus.updateOne({subject : subject , testName : testName} , {syllabus : syllabus})
            res.status(200).send('Syllabus updated successfuly!')
        }
        catch (err) {
            console.log(err)
        }
    }
})

router.get('/getSyllabus' , async (req,res) => {
    
    const subject = req.body.subject;
    const testName = req.body.testName;

    const syllabus = await Syllabus.findOne({subject : subject , testName : testName})

    if (!syllabus) {
        console.log("syllabus does not exist")
        res.status(404).send('please check parameters , syllabus does not exist with given parameters')
    }
    else {
        res.status(200).send(syllabus)
    }
})

module.exports = router;