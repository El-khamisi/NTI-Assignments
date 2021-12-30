const fs = require('fs');

/**
 * Functions To manipulating Students file records
 * 
 */

const fileName = 'students';

/**
 * A function to load a .json file OR create a new one if not exist
 * @returns [] emtpy array || Data of the file if exist
 */
const loadStudents = () => {
    try {
        const dataBuffer = fs.readFileSync(`${fileName}.json`).toString();
        return JSON.parse(dataBuffer); 
    }catch (e) {
        if(e.code == 'ENOENT'){
            console.log(`${fileName}.json Just has Created...`);
        }else{
            console.log(`There's an error while trying to read ${fileName}.json`);
        }
        return [];
    }
};





/**
 * 
 * @param {int} id A unique number of the student
 * @param {String} name Name of the student
 * @param {[int]} grades An array of integers which indicates the student's grades
 * @param {String} comment An optional short brief comment about the student
 */
const addStudent = (id, name, grades, comment = 'default comment') => {

    const student = {
        id: id,
        name: name,
        grades: grades,
        comment: comment,
        totalGrades: 0        
    };
    for(const e of student.grades){
        student.totalGrades+=e;
    }

    const students = loadStudents(); 
    const duplicateId = students.filter((record) => record.id === id );


    if (duplicateId.length === 0) {
        students.push(student);
        saveStudents(students);
        console.log("Saved Successfully");
    } else {
        console.log("Error duplicate ID");
    }
};





/**
 * 
 * @param {Json} students Json object of Student to write in the file
 */
const saveStudents = (students) => {
    
    const saveData = JSON.stringify(students);
    fs.writeFileSync(`${fileName}.json`, saveData);
};


/**
 * 
 * @param {int} id ID number of student to delete 
 */
const deleteStudents = (id) => {
    const students = loadStudents();
    const studentsToKeep = students.filter((student) => {        
        return student.id !== id
    });
  
    saveStudents(studentsToKeep);
    console.log('Removed');

}

/**
 * 
 * @param {int} id ID number of student to read it form the file 
 */
const readStudent = (id) => {
    const students = loadStudents();
    const studentToReade = students.find((student) => {
        return student.id === id
    });

    
    if (studentToReade) {
        console.log(studentToReade);
    } else {
        console.log('Sorry not found');
    }
}



/**
 * A function to list all of the file content 
 */
const listStudents = () => {
    const students = loadStudents();

    students.forEach((student) => {
        console.log(`Student name is ${student.name}, Total of his grades ${student.totalGrades}`);
    });

};

module.exports = {
    addStudent,
    deleteStudents,
    readStudent,
    listStudents
};


