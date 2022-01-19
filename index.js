// note actually this not a mongo project it is the CRUD project 
const { urlencoded } = require('express');
const config = require('config');
const express =  require('express'); 
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
app.use(helmet());
app.use(express.json())
app.set('view engine','pug')
app.set('views','./views')
app.use(urlencoded({extended : true}));
const courses = require('./routes/courses');
const home = require('./routes/home')
app.use('/api/courses',courses)
app.use('/',home)
console.log(`Application Name === ${config.get('name')}`)
console.log(`Mail server === ${config.get('mail.host')}`)
console.log(`Mail password === ${config.get('mail.password')}`)
if (app.get('env')=== 'development')
{
 app.use(morgan('tiny')) ,console.log("morgan enabled")
}
const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`listening on port ${port}...`))