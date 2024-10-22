const { error } = require("console");
let fs = require("fs");
require("colors");

//.....Reading notes from the file.....

let readNotes = ()=>{
    try{
        let bufferData = fs.readFileSync("notes.json");
        let data = bufferData.toString();
        return JSON.parse(data)
    }catch(err){
        return [];
    }
};

//.....adding new notes.....

let addNote = function(title,body){
    try{
    let notes = readNotes();
    let duplicate = notes.find((note)=>note.title === title);
    if(!duplicate){
        notes.push({title,body});
        saveNotes(notes)
        console.log("Added successfully...".blue);  
    }else{
        console.log("it is already exists...".red);
        
    }
}catch(err){
    console.error(err)
}
}

//.....saving the notes to the file.....

let saveNotes = function (notes){
    try{
    let dataJson = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJson);
    }catch(err){
        console.error(err)
    }
};

//.....removing a note.....

let removeNote = (title)=>{
    try{
    let notes = readNotes();
    let filteredNotes = notes.filter((note)=>note.title !== title);
    if(notes.length < filteredNotes.length){
        console.log(`"${title}" not found...`.red);
    } else{
        saveNotes(filteredNotes);
        console.log(`"${title}" successfully removed...`.blue);
    }
}catch(err){
    console.error(err); 
}
};

//.....list of all notes.....

let listNote = () =>{
    try{
    let notes = readNotes();
    notes.forEach((note,index )=> {
        console.log(`${index+1}.${note.title}`.green);
    });
}catch(err){
    console.error(err);
}
};

//.....Read a note by its title.....

let readNote = (title)=>{
    try{
    let notes = readNotes();
    let note = notes.find((note)=> note.title === title);
    if(note){
        console.log(`Title: "${note.title}" Body: "${note.body}"`.green);
    }else{
        console.log(`${title} not found...`.red);
    }
}catch(err){
    console.error(err);
}
};

//.....Edit a note by its title.....

let editNote = (title,body)=>{
    try{
    let value = true;
    let notes = readNotes();
    notes.forEach((element) => {
    if(element.title === title){
        element.body = body
        saveNotes(notes);
        value = false;
    }
    });
    if(!value){
        console.log("Edited successfully...".blue);
    }else{
        console.log(`${title} not found...`.red);
    }
}catch{
    console.error(err);
}
}

//.....exporting the function.....

module.exports = {addNote,removeNote,listNote,readNote,editNote};