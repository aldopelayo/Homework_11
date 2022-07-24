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
        WrittenNotes = [].concat(JSON.parse(data))
        res.json(WrittenNotes);
    })
});
///save button activation
///write file
app.post('/public/notes',(req, res)=> {
    const note =req.body;
    console.log(note)
    readFileA('./db/db.json','utf-8').then(function(data){
    const WrittenNotes = [].concat(JSON.parse(data));
    note.id = WrittenNotes.length+1
    WrittenNotes.push(note);
    console.log(WrittenNotes)    
    return WrittenNotes
    })
    // .then 
    
        // return note
});



///post notes 


//delete data 




app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });


