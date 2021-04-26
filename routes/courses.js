const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const validator = require("express-validator");
const { check, validationResult } = validator;

//Routes
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const courseValidator = [
    check("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Very Short Name!"),

    check("code")
        .trim()
        .toUpperCase()
        .isLength({ min: 6, max: 6 })
        .withMessage("Code must be exactly 6 chars!"),
    check("code").custom(
        (value, { req }) => {
            if (
                !(
                    /^[a-zA-Z]+$/.test(value.substring(0, 3)) &&
                    /^[1-9]+$/.test(value.substring(3, 6))
                )
            ) {
                throw new Error("Wrong code format ");
            }
            return true;
        }
    ),
    check("description")
        .isLength({ max: 200 })
        .withMessage("Maximum length is 200 chars!"),
];

router.get('/', (req, res) => {
    const courses = Course.find().limit(5);
    courses.exec()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(404).send({ message: err });
        });
});

router.get('/:id', (req, res) => {

    const course = Course.findOne({ _id: req.params.id });
    course.exec()
        .then(post => {
            res.send(post)
        }).catch(err => {
            res.status(404).send({ message: err });
        });
})



router.post('/', courseValidator, (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    const c = new Course({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description
    });
    c.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(404).send({ message: err });
        })

});
router.delete('/:id', (req, res) => {
    Course.remove({ _id: req.params.id })
        .exec()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({ message: err });
        });
})

router.patch('/:id', (req, res) => {

    Course.updateOne({ _id: req.params.id }, { $set: req.body })
        .exec()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(404).send({ message: err });
        });
})


module.exports = router;