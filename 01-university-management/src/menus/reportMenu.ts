import { drawHomeMenu } from "./homeMenu.js";
import { menu } from "./menu.js";

function generateEnrollmentReport() {
    console.log("Generate enrollment report")
}

function generateGradeReport() {
    console.log("Generate grade distribution report")
}

function generateProfessorWorkloadReport() {
    console.log("Generate professor workload report")
}

const drawReportMenu = async () => await menu({
    "Enrollment report": generateEnrollmentReport,
    "Grade distribution report": generateGradeReport,
    "Professor workload report": generateProfessorWorkloadReport,
    "Go back": drawHomeMenu,
}, "Reporting")

export { drawReportMenu }
