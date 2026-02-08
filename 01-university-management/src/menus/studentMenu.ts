import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "../utils/menu.js";
import { spacer } from "../utils/spacer.js";
import { question, collectCourseId, collectStudentId } from "../utils/userInput.js";
import { validateDate } from "../utils/date.js";
import { prisma } from "../prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

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

async function enrollStudentInCourse() {
    
    spacer()
    // heading tittle
    console.log("Enroll student: ")

    let studentId: number, courseId: number

    studentId = await collectStudentId();

    spacer()

    const student = await prisma.student.findFirst({
        where: {
            id: studentId,
        }
    })

    if (!student) {
        
        console.log("No student found with the provided id")

        spacer()

        await question("Press Enter/Return to continue")

        return drawHomeMenu()
    }

    courseId = await collectCourseId()

    const course = await prisma.course.findFirst({
        where: {
            id: courseId,
        }
    })

    if (!course) {
        
        console.log("No course found with the provided id")

        spacer()

        await question("Press Enter/Return to continue")

        return drawHomeMenu()
    }

    // confirmation message

    spacer()
    const confirmation = await question(`Do you want to enroll ${student.name} in ${course.name} (${course.courseCode})? Y/n`)
    spacer()
    if (confirmation.toLowerCase() != "y") {
        console.log("Aborting enrollment...")

        spacer(2)

        await question("Press Enter/Return key to continue")
        
        return drawHomeMenu()
    }

    try {

        const enrollment = await prisma.enrollment.create({
            data: {
                courseId: course.id,
                studentId: student.id,
            }
        })

        console.log(`Enrollment Complete: ${student.name} successfuly enrolled in ${course.name} (${course.courseCode})`)

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code == "P2002") {
                console.log("Student already enrolled in the course!")
            } else {
                console.log(error.message)
            }
        } else {
            console.log(error);
        }
    }

    spacer(2)

    await question("Press Enter/Return key to continue")

    drawHomeMenu()
}

async function dropStudentFromCourse() {
    spacer()

    // heading title
    console.log("Drop Student: ")

    const studentId = await collectStudentId()

    const courseId = await collectCourseId()

    // looking up the enrollment and selecting name of student, course name and code
    const enrollment = await prisma.enrollment.findFirst({
        where: {
            courseId: courseId,
            studentId: studentId,
        },
        include: {
            student: {
                select: {
                    name: true,
                }
            },
            course: {
                select: {
                    name: true,
                    courseCode: true,
                }
            }
        }
    })

    if (!enrollment) {
        spacer()
        console.log("No enrollment found.")
        
        spacer(2)

        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    const confirmation = await question(`Are you sure you want to drop ${enrollment.student.name} from ${enrollment.course.name} (${enrollment.course.courseCode})? Y/n`)

    if (confirmation.toLowerCase() != 'y') {
        spacer()
        console.log("Aborting operation...")
        
        spacer(2)

        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    try {
        // dropping student
        const droppedEnrollment = await prisma.enrollment.delete({
            where: {
                courseId_studentId: {
                    studentId: studentId,
                    courseId: courseId,
                },
            },
            include: {
                student: {
                    select: {
                        name: true,
                    },
                },
                course: {
                    select: {
                        name: true,
                        courseCode: true,
                    },
                }
            }
        })

        spacer()
        console.log(`${droppedEnrollment.student.name} successfully dropped from ${droppedEnrollment.course.name} (${droppedEnrollment.course.courseCode})`)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e.message)
        }
    }

    spacer(2)

    await question("Press Enter/Return key to continue")

    return drawHomeMenu()


}

async function studentSchedule() {
    console.log("View student schedule")

    const studentId = await collectStudentId()

    const student = await prisma.student.findFirst({
        where: {
            id: studentId,
        },

        include: {
            enrollments: {
                include: {
                    course: {
                        select: {
                            name: true,
                            courseCode: true,
                            semester: true,
                            year: true,
                            mode: true,
                            credits: true,
                        }
                    },
                }
            }
        }
    })

    if (!student) {
        spacer()

        console.log("Student not found.")

        spacer(2)

        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    spacer()

    console.log(`${student.name}'s Schedule`)

    spacer()

    for (const enrollment of student.enrollments) {
        console.log(`Course: ${enrollment.course.name} (${enrollment.course.courseCode})`)
        console.log(`${enrollment.course.semester} ${enrollment.course.year}`)
        console.log(`Mode: ${enrollment.course.mode}`)
        console.log(`Credits: ${enrollment.course.credits}`)
        console.log(`Grade: ${enrollment.grade ?? "-"}`)
        
        spacer()
    }

    spacer()

    await question("Press Enter/Return to continue")

    drawHomeMenu()
}

async function gradeStudent() {

    spacer()

    // heading title
    console.log("Grade Student: ")

    const studentId = await collectStudentId()

    const courseId = await collectCourseId()

    spacer()

    const enrollment = await prisma.enrollment.findUnique({
        where: {
            courseId_studentId: {
                courseId: courseId,
                studentId: studentId,
            }
        },

        include: {
            student: true,
            course: true,
        }
    })

    if (!enrollment) {
        spacer()
        
        console.log("No enrollemnt with found")
        
        spacer(2)

        await question("Press Enter/Return key to continue")

        return drawHomeMenu()
    }

    const letterGrades: string[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

    let grade: string

    while (true) {
        const raw = await question(`Which grade do you want to assign ${enrollment.student.name} for ${enrollment.course.name} (${enrollment.course.courseCode})`)

        if (raw.trim() == '') {
            console.log("Grade input is empty, please try again")
            continue
        }

        if (letterGrades.includes(raw)) {
            grade = raw
            break
        } else {
            console.log("Letter grade not valid. Input a valid letter grade.")
        }
    }

    try {
        const enrollmentWithGrade = await prisma.enrollment.update({
            where: {
                courseId_studentId: {
                    courseId: courseId,
                    studentId: studentId,
                }
            },
            data: {
                grade: grade,
            }
        })

        spacer()

        console.log("Letter successfully assigned.")
    } catch (e) {
        console.log(e)
    }


    spacer(2)

    await question("Press Enter/Return key to continue")

    drawHomeMenu()
    
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
