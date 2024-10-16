let fs = require("fs")

//.....Reading notes from the file.....

let readNotes = ()=>{
    try{
        let data = fs.readFileSync("notes.json");
        let dataJson = data.toString();
        return JSON.parse(dataJson)
    }catch(err){

    }
};

//.....adding new notes.....

let addNote = function(title,body){
    let notes = readNotes();
    let duplicate = notes.find((note)=>note.title === title);
    if(!duplicate){
        notes.push({title,body});
        saveNotes(notes)
        console.log("Added successfully...");  
    }else{
        console.log("it is already exists...");
        
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
    if(notes.length === filteredNotes.length){
        console.log(`"${title}" not found `);
    } else{
        saveNotes(filteredNotes);
        console.log(`"${title}" successfully removed`);
    }
};

//.....list of all notes.....

let listNote = () =>{
    let notes = readNotes();
    notes.forEach((note,index )=> {
        console.log(`${index+1}.${note.title}`);
    });
};


//.....Read a note by its title.....

let readNote = (title)=>{
    let notes = readNotes();
    let note = notes.find((note)=> note.title === title);
    if(note){
        console.log(`Title: "${note.title}" Body: "${note.body}"`);
    }else{
        console.log(`${title} not found`);
    }
};

//.....exporting the addNote function.....

module.exports = {addNote,removeNote,listNote,readNote};