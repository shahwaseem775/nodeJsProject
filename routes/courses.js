const express = require('express')
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
];
router.get('/',(req,res)=>{
    res.send(courses);
    
});

router.post('/',(req,res)=>{

 const {error} = validateCourse(req.body)
 
    if(error) return res.status(404).send(error.details[0].message);
    const data =  courses[courses.length - 1]
    const course = {
        id : data.id + 1,
        name : req.body.name,
    }
    courses.push(course)
    res.send(course)
});
router.get('/:id',(req,res)=>{
 const course = courses.find(c => c.id === parseInt(req.params.id))
 if(!course) return res.status(404).send("the course with the given id is not present")
 res.send(course)
});
router.delete('/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with the given id is not present")
    const index = courses.indexOf(course);
    courses.splice(index,1)
    res.send(courses)
   });
   router.put('/:id', (req , res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course)return res.status(404).send("the course with the given id is not present")
      const {error} = validateCourse(req.body)
    if(error) return res.status(404).send(error.details[0].message);
    course.name = req.body.name;
    res.send(course);
})
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
  return Joi.validate(course , schema);
}

module.exports = router;