import { Mode, Semester } from "../../generated/prisma/enums.js";
import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
import { spacer } from "../utils/spacer.js";
import { prisma } from "../prisma.js";
import { question } from "../utils/userInput.js";


async function createCourse() {
    let courseName: string, courseCode: string, courseMode: Mode, courseSemester: Semester, courseYear: number, courseCredits: number, courseProfessorId: number, courseDepartmentId: number;

    // heading section
    console.log("Create course: ")

    spacer()

    while (true) {
         courseName = await question("Please input course name")

        if (courseName.trim() == '') {
            console.log("Name is empty, please input the name of the course")
            continue
        }
        break
    }

    while (true) {
        courseCode = await question("Please input course Code")
        if (courseCode.trim() == '') {
            console.log("Code is empty, please input the course code")
            continue
        }
        break
    }

    spacer()

    console.log("Course mode:")
    const modes = Object.values(Mode);
    for (let i = 1; i <= modes.length; i++) {
        console.log(`${i}. ${modes[i-1]}`)
    }

    spacer()

    while (true) {
        const raw = await question("Please input course mode")
        
        if (raw.trim() == '') {
            console.log("Mode is empty, please input the course mode")
            continue
        }

        const parsed = Number(raw)
        if (isNaN(parsed)) {
            console.log("Please input a valid integer option from the list above")
            continue
        }

        if (parsed >= 1 && parsed <= modes.length) {
            courseMode = modes[parsed-1] as Mode
            break;
        } else {
            console.log("Please choose an option from the list above")
        }
    }

    spacer()

    const semesters = Object.values(Semester);

    console.log("Select semester:")
    for (let i = 1; i <= semesters.length; i++) {
        console.log(`${i}. ${semesters[i-1]}`)
    }

    spacer()

    while (true) {
        const raw = await question("Please input course semester")
        if (raw.trim() == '') {
            console.log("Semester is empty, please input the course semester")
            continue
        }

        const parsed = Number(raw)

        if (isNaN(parsed)) {
            console.log("Please choose a valid integer option from the list above")
            continue
        }

        if (parsed >= 1 && parsed <= semesters.length) {
            courseSemester = semesters[parsed-1] as Semester
            break
        } else {
            console.log("Please select a valid option from the list above")
        }

    }

    while (true) {
        const raw = await question("Please input course Year")
        if (raw.trim() == '') {
            console.log("Year is empty, please input the course year")
            continue
        }
        const parsed = Number(raw)
        if (isNaN(parsed)) {
            console.log("Invalid year, please enter a number")
            continue
        }

        if (parsed < 0) {
            console.log("Please input a valid year")
            continue
        }

        courseYear = parsed
        break
    }

    while (true) {
        const raw = await question("Please input course credits")
        if (raw.trim() == '') {
            console.log("Credits is empty, please input the course credits")
            continue
        }
        const parsed = Number(raw)
        if (isNaN(parsed)) {
            console.log("Invalid credits, please enter a number")
            continue
        }

        if (parsed < 1 && !Number.isInteger(parsed)) {
            console.log("Please input a valid amount of credits")
        }

        courseCredits = parsed
        break
    }


    const professors = await prisma.professor.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    spacer()

    for (const professor of professors) {
        console.log(`Professor Id: ${professor.id} Professor name: ${professor.name}`)
    }

    spacer()

    while (true) {
        const raw = await question("Please input the professor id from the list of professors above")
        if (raw.trim() == '') {
            console.log("Professor id is empty, please input the professor id")
            continue
        }
        const parsed = Number(raw)
        if (isNaN(parsed)) {
            console.log("Invalid professor id, please enter a number")
            continue
        }

        const isProfessorId = professors.some(professor => professor.id == parsed)
        
        if (isProfessorId) {
            courseProfessorId = parsed
            break
        } else {
            console.log("Please choose a professor id from the list above")
        }
    }

    spacer()

    const departments = await prisma.department.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    for (const department of departments) {
        console.log(`Department Id: ${department.id} Department name: ${department.name}`)
    }

    spacer()

    while (true) {
        const raw = await question("Please input the department id")
        if (raw.trim() == '') {
            console.log("Department id is empty, please input the department id")
            continue
        }
        const parsed = Number(raw)
        if (isNaN(parsed)) {
            console.log("Invalid department id, please enter a number")
            continue
        }

        const isDepartmentId = departments.some(department => department.id == parsed)

        if (isDepartmentId) {
            courseDepartmentId = parsed
            break
        } else {
            console.log("Please select a department id from the list above")
        }
    }

    try {
        const course = await prisma.course.create({
            data: {
                courseCode: courseCode,
                mode: courseMode,
                name: courseName,
                credits: courseCredits,
                semester: courseSemester,
                year: courseYear,
                professorId: courseProfessorId,
                departmentId: courseDepartmentId,

            }
        })

        console.log("Course created successfully")

        await question("Please press Enter/Return to continue")

        drawHomeMenu()

    } catch (error) {
        console.log(error)
    }


    
}

async function listCourses() {

    spacer()

    // heading section
    console.log("All courses: ")


    // fetch all courses, sorted by dpeartment and year
    // including the professor and department
    const courses = await prisma.course.findMany({
        orderBy: [
            { departmentId: "asc"},
            { year: "desc"},
        ],
        include: {
            department: true,
            professor: true,
            _count: {
                select: {
                    enrollments: true,
                }
            }
        }
    })

    spacer()

    for (const course of courses) {
        console.log(`Course: ${course.name} (${course.courseCode})`)
        console.log(`${course.semester} ${course.year} (${course.mode}) `)
        console.log(`Credits: ${course.credits}`)
        console.log(`Department: ${course.department.name}`)
        console.log(`Professor: ${course.professor.name}`)
        console.log(`Students enrolled: ${course._count.enrollments}`)

        spacer()
    }

    spacer()

    await question("Press Enter/Return key to continue")

    drawHomeMenu()
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