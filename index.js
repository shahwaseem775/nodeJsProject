// note actually this not a mongo project it is the CRUD project 
const { urlencoded } = require('express');
const config = require('config');
const express =  require('express')
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const { process_params } = require('express/lib/router');
const app = express();
app.use(helmet());
app.use(express.json())
app.set('view engine','pug')
app.set('views','./views')
app.use(urlencoded({extended : true}));

console.log(`Application Name === ${config.get('name')}`)
console.log(`Mail server === ${config.get('mail.host')}`)
console.log(`Mail password === ${config.get('mail.password')}`)


if (app.get('env')=== 'development') app.use(morgan('tiny')) ,console.log("morgan enabled")
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    
    {id: 3, name: "course3"},
];
app.get('/',(req,res)=>{
    res.render('index',{title : "My express App",message : 'hello world'})

});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
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
 app.get('/api/courses/:id',(req,res)=>{
 const course = courses.find(c => c.id === parseInt(req.params.id))
 if(!course) return res.status(404).send("the course with the given id is not present")
 res.send(course)
});
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with the given id is not present")
    const index = courses.indexOf(course);
    courses.splice(index,1)
    res.send(courses)
   });
app.put('/api/courses/:id', (req , res)=>{
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


const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`listening on port ${port}...`))