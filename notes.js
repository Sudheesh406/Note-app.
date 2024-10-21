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
    let notes = readNotes();
    let duplicate = notes.find((note)=>note.title === title);
    if(!duplicate){
        notes.push({title,body});
        saveNotes(notes)
        console.log("Added successfully...".blue);  
    }else{
        console.log("it is already exists...".red);
        
    }
}

//.....saving the notes to the file.....

let saveNotes = function (notes){
    let dataJson = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJson);
};

//.....removing a note.....

let removeNote = (title)=>{
    let notes = readNotes();
    let filteredNotes = notes.filter((note)=>note.title !== title);
    if(notes.length < filteredNotes.length){
        console.log(`"${title}" not found...`.red);
    } else{
        saveNotes(filteredNotes);
        console.log(`"${title}" successfully removed...`.blue);
    }
};

//.....list of all notes.....

let listNote = () =>{
    let notes = readNotes();
    notes.forEach((note,index )=> {
        console.log(`${index+1}.${note.title}`.green);
    });
};

//.....Read a note by its title.....

let readNote = (title)=>{
    let notes = readNotes();
    let note = notes.find((note)=> note.title === title);
    if(note){
        console.log(`Title: "${note.title}" Body: "${note.body}"`.green);
    }else{
        console.log(`${title} not found...`.red);
    }
};

//.....Edit a note by its title.....

let editNote = (title,body)=>{
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
}

//.....exporting the function.....

module.exports = {addNote,removeNote,listNote,readNote,editNote};