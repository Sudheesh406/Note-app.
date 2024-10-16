let yargs = require("yargs");
let notesJs = require("./notes");

//..... Add command.....

yargs.command({
  command: "add",
  describe: "add a new  note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesJs.addNote(argv.title, argv.body);
  },
});

//..... Remove command.....

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesJs.removeNote(argv.title);
  },
});

//..... list all notes.....

yargs.command({
  command: "list",
  describe: "list all notes",
  handler() {
    notesJs.listNote();
  },
});

//..... Read a note from all notes.....

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesJs.readNote(argv.title);
  },
});

//..... Edit a note.....

yargs.command({
    command: "edit",
    describe: "Edit an existing note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "New content for the note",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      notesJs.editNote(argv.title,argv.body);
    },
  });
  
  yargs.parse();
