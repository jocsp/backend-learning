import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
import { spacer } from "../utils/spacer.js";
import { question } from "../utils/userInput.js";
import { validateDate } from "../utils/date.js";
import { prisma } from "../prisma.js";

async function registerStudent() {

    let name: string, email: string, registrationDate: Date, major: string

    spacer()
    // heading title
    console.log("Register New Student")

    while (true) {
        name = await question("Student name")

        if (name.trim() == '') {
            console.log("Name is empty, please input the name of the student")
            continue
        }
        break
    }

    while (true) {
        email = await question("Student email")

        if (email.trim() == '') {
            console.log("Email is empty, please input the email of the student")
            continue
        }
        break
    }

    while (true) {
        console.log("Please enter the date with the following format: yyyy-mm-DD (eg. 2026-01-30)")

        const dateStr = await question("Student registration date (leave empty and hit enter if hire date is now)")

        try {
            registrationDate = validateDate(dateStr)
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

    while (true) {
        major = await question("Major")

        if (major.trim() == '') {
            console.log("Major is empty, please input the major of the student")
            continue
        }
        break
    }

    try {
        const student = await prisma.student.create({
            data: {
                name: name,
                email: email,
                registrationDate: registrationDate,
                major: major,
            }
        })

        spacer()

        console.log(`Student ${student.name} (${student.major}) has been succesfully registered.`)

    } catch(e) {
        console.log("Unexpected error occured", e)
    }

    spacer(2)

    await question("Press Enter/Return key to continue")

    drawHomeMenu()
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
