import { menu } from "./menu.js";
import { drawHomeMenu } from "./homeMenu.js";

function createDepartments() {
    console.log("Create departments")
}

function listDepartments() {
    console.log("List departments")
}

const drawDepartmentMenu = async () => await menu({
    "Create new department": createDepartments,
    "List Departments": listDepartments,
    "Go back": drawHomeMenu,
}, "Department Management")

export { drawDepartmentMenu }