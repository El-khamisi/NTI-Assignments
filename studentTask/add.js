const addStudent = (id, name, grades, comment = 'default comment') => {

    const student = {
        id: id,
        name: name,
        grades: grades,
        comment: comment,
        totalGrades: 0,
        
    };
    
    for(const e of student.grades){
        student.totalGrades+=e;
    }

    console.log(student);
}


addStudent(1, 'omar', [1, 3, 4, 6, 7]);