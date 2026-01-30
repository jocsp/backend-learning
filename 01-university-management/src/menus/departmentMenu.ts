import { question } from '../utils/userInput.js'
import { menu } from "../utils/menu.js";
import { drawHomeMenu } from "./homeMenu.js";
import { prisma } from "../prisma.js"

async function createDepartments() {
    console.clear()

    // collecting user input
    const departmentName = await question("Input the department name");
    const departmentLocation = await question("Input the department location");

    // submitting info to database
    const newDepartment = await prisma.department.create({
        data: {
            name: departmentName,
            buildingLocation: departmentLocation,
        }
    })

    // success message output to screen
    console.log(`Succesfully created the ${newDepartment.name} department.`);
    console.log("")
    console.log("")
    await question("Press Enter/Return key to continue")

    drawHomeMenu()
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