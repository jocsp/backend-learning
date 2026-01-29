import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "./menu.js";
function registerStudent() {
    console.log("Register new student")
}

function enrollStudentInCourse() {
    console.log("Enroll student in a course")
}

function dropStudentFromCourse() {
    console.log("Drop a student from a course")
}

function studentSchedule() {
    console.log("View a student's schedule")
}

function gradeStudent() {
    console.log("Assign grade to a student")
}

const drawStudentMenu = async () => await menu({
    "Register new student": registerStudent,
    "Enroll student in a course": enrollStudentInCourse,
    "Drop a student from a course": dropStudentFromCourse,
    "View a student's schedule": studentSchedule,
    "Assign grade to a student": gradeStudent,
    "Go Back": drawHomeMenu,
}, "Student Management")

export { drawStudentMenu }
