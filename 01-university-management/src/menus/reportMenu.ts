import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
import { spacer } from "../utils/spacer.js";
import { collectCourseId, question } from "../utils/userInput.js";
import { prisma } from "../prisma.js";
import { parse } from "node:path";

async function coursesPerDepartment() {
    
    spacer()
    
    // heading title
    console.log("Courses per Department")

    spacer()

    const departments = await prisma.department.findMany()

    for (const department of departments) {
        console.log(`${department.name} - ID: ${department.id}`)
    }

    spacer()

    let departmentId: number

    while (true) {
        const raw = await question("Select department by ID (see list of departments above)")

        if (raw.trim() == '') {
            console.log("Input is empty, please enter the department ID from the list above")
            continue
        }

        const parsed = Number(raw)

        if (isNaN(parsed) || !Number.isInteger(parsed)) {
            console.log("Please enter a valid department ID from the above list")
            continue
        }

        const departmentExist = departments.some((d) => d.id == parsed)

        if (!departmentExist) {
            console.log("The input department does not exist, please see the list above.")
            continue
        }

        // the input id is validated and therefore assigned
        departmentId = parsed

        break
    }

    const department = await prisma.department.findUnique({
        where: {
            id: departmentId,
        },
        select: {
            name: true,
        },
    })

    const courses = await prisma.course.findMany({
        where: {
            departmentId: departmentId,
        },
        include: {
            _count: {
                select: {
                    enrollments: true,
                }
            }
        }
    })

    spacer()

    if (!courses) {
        console.log("No courses found in the department")
        spacer(2)
        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    console.log(`Coures for ${department?.name} department: `)

    spacer()

    for (const course of courses) {
        console.log(`Course: ${course.name} (${course.courseCode})`)
        console.log(`${course.semester} ${course.year} (${course.mode})`)
        console.log(`Students enrolled: ${course._count.enrollments}`)
        
        spacer()
    }



    await question("Press Enter/Return key to continue")

    drawHomeMenu()

}

async function studentsInACourse() {
    
    spacer()

    // heading title
    console.log("Student's by Course Report: ")

    spacer()

    const courseId = await collectCourseId()

    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            enrollments: {
                include: {
                    student: true,
                }
            },
            _count: {
                select: {
                    enrollments: true,
                }
            }
        }
    })

    if (!course) {
        spacer()
        
        console.log("No course found with the provided course id")
        
        spacer(2)

        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    console.log("Course details: ")

    console.log(`Course: ${course.name} (${course.courseCode})`)
    console.log(`${course.semester} ${course.year} (${course.mode})`)
    console.log(`Students enrolled: ${course._count.enrollments}`)

    spacer()

    console.log("Students enrolled: ")

    spacer()

    for (const enrollement of course.enrollments) {
        console.log(`ID: ${enrollement.student.id} Student: ${enrollement.student.name}`)
        console.log(`Email: ${enrollement.student.email}`)
        console.log(`Major: ${enrollement.student.major}`)
        console.log(`Course grade: ${enrollement.grade ?? "-"}`)

        spacer()
    }

    spacer()

    await question("Press Enter/Return key to continue")

    drawHomeMenu()

}

async function coursesByProfessor() {
    
    spacer()
    // heading title
    console.log("Courses by Professor")

    let professorId: number

    while (true) {
        const raw = await question("Input professor ID")

        if (raw.trim() == '') {
            console.log("Input is empty, please enter the department ID from the list above")
            continue
        }

        const parsed = Number(raw)

        if (isNaN(parsed) || !Number.isInteger(parsed)) {
            console.log("Please enter a valid professor ID")
            continue
        }

        // the input id is validated and therefore assigned
        professorId = parsed

        break
    }

    spacer()

    // query for professor, include the courses and the count of students enrolled
    const professor = await prisma.professor.findUnique({
        where: {
            id: professorId,
        },
        include: {
            courses: {
                include: {
                    _count: {
                        select: {
                            enrollments: true,
                        }
                    }
                }
            },
        }
    })

    if (!professor) {
        console.log("No professor found with the provided ID")

        spacer()

        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    console.log(`Courses taught by professor ${professor.name}: `)

    if (professor.courses.length != 0) {
        for (const course of professor.courses) {
            console.log(`Course: ${course.name} (${course.courseCode})`)
            console.log(`${course.semester} ${course.year} (${course.mode})`)
            console.log(`Students enrolled: ${course._count.enrollments}`)
            
            spacer()
        }
    } else {
        spacer()
        console.log("No courses yet...")
        spacer()
    }

    await question("Press Enter/Return key to continue")

    drawHomeMenu()
}

async function studentsByMajor() {
    
    spacer()

    // heading title
    console.log("Students by major: ")

    spacer()

    const students = await prisma.student.findMany({
        orderBy: {
            major: "asc"
        }
    })

    let majorSet = new Set()

    for (const student of students) {
        if (!majorSet.has(student.major)) {
            // print major for the section heading
            console.log(`*** ${student.major.toUpperCase()} ***`)
            spacer()
            majorSet.add(student.major)
        }

        console.log(`Student: ${student.name} (${student.id})`)
        console.log(`Email: ${student.email}`)
        console.log(`Registration date: ${student.registrationDate.toLocaleDateString()}`)

        spacer()
    }

    await question("Press Enter/Return key to continue")

    drawHomeMenu()
}

async function coursesWithNoStudents() {
    
    spacer()

    // heading title
    console.log("Courses with zero enrollments: ")

    spacer()

    // courses with zero enrollments
    const courses = await prisma.course.findMany({
        where: {
            enrollments: {
                none: {},
            }
        },
        include: {
            professor: true,
            department: true,
        }
    })

    for (const course of courses) {
        console.log(`Course: ${course.name} (${course.courseCode})`)
        console.log(`${course.semester} ${course.year} (${course.mode}) `)
        console.log(`Credits: ${course.credits}`)
        console.log(`Department: ${course.department.name}`)
        console.log(`Professor: ${course.professor.name}`)

        spacer()
    }

    await question("Press Enter/Return key to continue")

    drawHomeMenu()

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
