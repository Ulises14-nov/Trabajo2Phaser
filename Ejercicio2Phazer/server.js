const express =require('express');
const app=express();

app.get('/',(req, res)=>{
    //res.send("bienvenido al servidor backemd NODE");
    //console.log(__dirname),
    res.sendFile(__dirname+'/public/index.html')
});

app.use('/public',express.static(__dirname+'/public'));
app.use('/src',express.static(__dirname+'/src'));
app.use('/node_modules',express.static(__dirname+'/node_modules'));

app.listen(5002); 
//{
  // console.log("servidor NODE corriendo");
//});