const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT ||3000;

var app=express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('ScreamIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now=new Date().toDateString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('serverLog.txt',log + '\n');
    next();
});

/* app.use((req,res,next)=>{
    res.render('maintaince.hbs');
});
 */
app.get('/',(req,res)=>{


res.render('home.hbs',{
    Title:"Devil's Pc",
    authorsName:"satan",
    welcomeMessage:"This is the Entry to Hell Gate Proceed with caution",
    //Copyright: new Date()
})
});
app.get('/about',(req,res)=>{ 
res.render('about.hbs',{
    authorsName: 'About Page',
    //Copyright: new Date().getFullYear()
});
});

app.get('/projects',(req,res)=>{
    res.render('portfolio.hbs');
});

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
});
