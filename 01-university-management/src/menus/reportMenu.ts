import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
import { spacer } from "../utils/spacer.js";
import { collectCourseId, question } from "../utils/userInput.js";
import { prisma } from "../prisma.js";
function coursesPerDepartment() {
    console.log("Courses for a specific department")
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
    console.log(`Total students enrolled: ${course._count.enrollments}`)

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
