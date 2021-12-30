
const yargs = require('yargs');
const studentObj = require('./studentObj');



yargs.command({
    command:'add',
    describe:'Add a student object',
    
    // options 
    builder:{
        id:{
            describe:'This is id in add command',
            demandOption:true,
            type:'number'
        },
        name:{
            describe:'This is name in add command',
            demandOption:true,
            type:'string'
        },
        grades:{
            describe:'This is grades in add command',
            demandOption:true,
            type: 'array'
        },
        comment:{
            describe:'This is comment in add command',
            type:'string'
        }
    },
    handler:(argv)=>{
        const gradesArray = JSON.parse(argv.grades);
        
        let total = 0;
        gradesArray.forEach(element => {
            total+=element;
        });

        studentObj.addStudent(argv.id, argv.name, gradesArray, argv.comment, total);
    }
})



// delete
yargs.command({
    command:'delete',
    describe:'Delete Student',
    builder:{
        id:{
            describe:'This is id in delete command',
            demandOption:true,
            type:'number'
        }
    },
    handler:(argv)=>{
        studentObj.deleteStudents(argv.id)
    }
})




// read 
yargs.command({
    command:'read',
    describe:'Read Student',
    builder:{
        id:{
            describe:'This is id in read command',
            demandOption:true,
            type:'number'
        }
    },
    handler:(argv)=>{
       studentObj.readStudent(argv.id);
    }
})
// list
yargs.command({
    command:'list',
    describe:'List Sudents',
    handler:()=>{
        studentObj.listStudents();
    }
})


// Match all
yargs.command({
    command:'*',
    describe:'Match all',
    handler:()=>{
        console.log('Sorry not a command')
    }
})


yargs.parse();
