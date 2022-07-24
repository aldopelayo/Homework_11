const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const util = require('util')

const readFileA = util.promisify(fs.readFile)
const writeFileA = util.promisify(fs.writeFile)

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


///read db field 
app.get('/public/notes',(req, res)=>{
    readFileA('./db/db.json','utf-8').then(function(data){
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});
///save button activation
///write file
app.post('/public/notes',(req, res)=> {
    const writtenNote =req.body;
    // console.log(writtenNote)
    readFileA('./db/db.json','utf-8').then(function(data){
    blurb = [].concat(JSON.parse(data))
    writtenNote.id = blurb.length+1
    blurb.push(writtenNote)
    console.log(blurb)    
    return blurb
    })
});



///post notes 


//delete data 




app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });


