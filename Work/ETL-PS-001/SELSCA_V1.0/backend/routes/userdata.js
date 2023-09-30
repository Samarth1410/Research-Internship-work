var express = require('express');
var router = express.Router();

const Teacher = require('../models/Teacher');



router.post('/' , (req,res) => {
    var users = Teacher.findById()
    console.log(users)
    res.send('meh')

})

router.get('/test', function(req, res, next) {
    
    var users = []
    Teacher.find((err, docs) => {
        if (!err) {
            console.log(docs)
            users = {docs}
            res.send(docs)
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
            res.status(401).send('error')
        }
    });

});

module.exports = router;