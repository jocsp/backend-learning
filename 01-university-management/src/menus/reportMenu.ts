import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
function coursesPerDepartment() {
    console.log("Courses for a specific department")
}

function studentsInACourse() {
    console.log("Students in a course")
}

function coursesByProfessor() {
    console.log("Courses taught by a specific professor")
}

function studentsByMajor() {
    console.log("Students by major")
}

function coursesWithNoStudents() {
    console.log("Courses with no students")
}

const drawReportMenu = async () => await menu({
    "Courses for a specific department": coursesPerDepartment,
    "Students in a course": studentsInACourse,
    "Courses taught by a specific professor": coursesByProfessor,
    "Students by major": studentsByMajor,
    "Courses with no students": coursesWithNoStudents,
    "Go back": drawHomeMenu,
}, "Reporting")

export { drawReportMenu }
