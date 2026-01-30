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

async function listDepartments() {

    // fetch all departments with their courses count
    const departments = await prisma.department.findMany({
        include: {
            _count: {
                select: {
                    courses: true,
                }
            }
        }
    })

    console.log("")
    for (const department of departments) {
        console.log(`Department name: ${department.name}`)
        console.log(`Amount of courses: ${department._count.courses}`)
        console.log("")
    }

    console.log("")
    console.log("")
    await question("Press Enter/Return key to continue")

    drawHomeMenu()
    
}

const drawDepartmentMenu = async () => await menu({
    "Create new department": createDepartments,
    "List Departments": listDepartments,
    "Go back": drawHomeMenu,
}, "Department Management")

export { drawDepartmentMenu }