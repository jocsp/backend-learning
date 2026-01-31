import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
import { question } from "../utils/userInput.js";
import { prisma } from "../prisma.js";
import { validateDate } from "../utils/date.js";
import { spacer } from "../utils/spacer.js";

async function addProfessor() {
    let name: string, email: string, department: string, hireDate: string
    // heading for the section
    console.log("Add new professor: ")

    // fetching the departments to display so the user can select the department to the user
    const departments = await prisma.department.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    while (true) {
        name = await question("Professor name")

        if (name.trim() == '') {
            console.log("Name is empty, please input the name of the professor")
            continue
        }
        break
    }

    while (true) {
        email = await question("Professor email")

        if (email.trim() == '') {
            console.log("Email is empty, please input the email of the professor")
            continue
        }

        break
    }
    console.log("")
    console.log("Departments: ")

    for (const department of departments) {
        console.log(`${department.name} - id: ${department.id}`)
    }

    console.log("")
    
    while (true) {
        department = await question("Professor Department (see list of departments above)")

        const departmentExist = departments.some((d) => d.id == Number(department))

        if (!departmentExist) {
            console.log("The input department does not exist, please see the list above.")
            continue
        }

        break
    }

    console.log("")

    // variable that will contain the validated date
    let validDate: Date

    while (true) {
        console.log("Please enter the date with the following format: yyyy-mm-DD (eg. 2026-01-30)")
        console.log("Leave empty and hit enter if hire date is now")
        hireDate = await question("Profesor hire date (hit enter if hire date is now)")

        try {
            validDate = validateDate(hireDate)
            break
        } catch(e: any) {

            if (e instanceof Error) {
                console.log(e.message)
            } else {
                console.log(e)
            }
            continue
        }
    }

    // at this point all fields were collected and validated

    const newProfessor = await prisma.professor.create({
        data: {
            name: name,
            email: email,
            departmentId: Number(department),
            hireDate: validDate,
        },
        // only selecting name of the professor and department name
        select: {
            name: true,
            department: {
                select: {
                    name: true
                }
            }
        }
    })

    spacer(2)

    console.log(`Successfully created ${newProfessor.name} under ${newProfessor.department.name} department`)

    spacer(2)

    await question("Press the Enter/Return key to continue")

    drawHomeMenu()

}

async function listProfessors() {
    console.log("All professors")

    const professors = await prisma.professor.findMany({
        select: {
            name: true,
            department: {
                select: {
                    name: true,
                }
            },
            _count: {
                select: {
                    courses: true,
                }
            }
        }
    })

    
    for (const professor of professors) {
        console.log(`Name: ${professor.name}`)
        console.log(`Department: ${professor.department.name}`)
        console.log(`Courses: ${professor._count.courses}`)

        spacer()
    }

    spacer(2)

    await question("Enter the Enter/Return key to continue")

    drawHomeMenu()
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