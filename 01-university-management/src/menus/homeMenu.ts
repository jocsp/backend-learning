import { drawCourseMenu } from "./courseMenu.js";
import { drawDepartmentMenu } from "./departmentMenu.js";
import { menu } from "../utils/menu.js";
import { drawProfessorMenu } from "./professorMenu.js";
import { drawReportMenu } from "./reportMenu.js";
import { drawStudentMenu } from "./studentMenu.js";

const drawHomeMenu = async () => await menu ({
    "Department Management": drawDepartmentMenu,
    "Professor Management": drawProfessorMenu,
    "Course Management": drawCourseMenu,
    "Student Management":drawStudentMenu,
    "Reports": drawReportMenu,
    "Exit": () => process.exit(),
    
}, "University Management System")


export { drawHomeMenu }