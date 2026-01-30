import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";

function addProfessor() {
    console.log("Add new professor")
}

function listProfessors() {
    console.log("List all professors")
}

function viewProfessorSchedule() {
    console.log("View a professor's complete schedule")
}

const drawProfessorMenu = async () => await menu({
    "Add new professor": addProfessor,
    "List all professors": listProfessors,
    "View a professor's complete schedule": viewProfessorSchedule,
    "Go back": drawHomeMenu,
}, "Professor Management")

export { drawProfessorMenu }