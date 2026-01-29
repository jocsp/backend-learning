import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "./menu.js";

function createCourse() {
    console.log("Create course")
}

function listCourses() {
    console.log("List all courses")
}

function viewCourseDetails() {
    console.log("View course details")
}

const drawCourseMenu = async () => await menu ({
    "Create course": createCourse,
    "List all courses": listCourses,
    "View course details": viewCourseDetails,
    "Go back": drawHomeMenu,
}, "Course Management")

export { drawCourseMenu }