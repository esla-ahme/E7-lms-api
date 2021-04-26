const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const validator = require("express-validator");
const { check, validationResult } = validator;

//Routes
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const studentValidator = [
    check("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Very Short Name!")
        .isAlpha("en-US", { ignore: "'- " })
        .withMessage("Please Enter our real name in English"),
    check("code")
        .trim()
        .toUpperCase()
        .isLength({ min: 7, max: 7 })
        .withMessage("Code must be exactly 7 chars!"),
];



router.get('/', (req, res) => {
    const students = Student.find();
    students.exec()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(400).send({ message: err });
        });
});

router.get('/:id', (req, res) => {

    const student = Student.findOne({ id: req.params.id });
    student.exec()
        .then(post => {
            res.send(post)
        }).catch(err => {
            res.status(404).send({ message: err });
        });
})



router.post('/', studentValidator, (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const s = new Student({
        name: req.body.name,
        code: req.body.code
    });
    s.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send({ message: err });
        })

});
router.delete('/:id', (req, res) => {
    Student.remove({ id: req.params.id })
        .exec()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({ message: err });
        });
})

router.patch('/:id', (req, res) => {

    Student.updateOne({ id: req.params.id }, { $set: req.body })
        .exec()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({ message: err });
        });
})


module.exports = router;