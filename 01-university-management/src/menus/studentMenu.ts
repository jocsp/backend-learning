import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "./menu.js";

function createStudent() {
    console.log("Create student")
}

function listStudents() {
    console.log("List all students")
}

function viewStudentDetails() {
    console.log("View student details")
}

const drawStudentMenu = async () => await menu({
    "Create student": createStudent,
    "List all students": listStudents,
    "View student details": viewStudentDetails,
    "Go back": drawHomeMenu,
}, "Student Management")

export { drawStudentMenu }
