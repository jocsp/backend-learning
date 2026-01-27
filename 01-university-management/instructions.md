## Project 1: University Course Management System
**Estimated Time: 2-4 hours**
**Focus: One-to-Many & Many-to-Many Relations**

### Problem Description
Build a terminal-based university course management system where students can enroll in courses, professors teach courses, and courses belong to departments.

### Requirements

#### Data Model Requirements:
1. **Students**
   - Should have: id, name, email, enrollment date, major
   - Can enroll in multiple courses

2. **Professors**
   - Should have: id, name, email, department, hire date
   - Can teach multiple courses

3. **Courses**
   - Should have: id, course code, name, credits, semester
   - Belongs to ONE department
   - Is taught by ONE professor
   - Has MANY students enrolled

4. **Departments**
   - Should have: id, name, building location
   - Has MANY courses
   - Has MANY professors

5. **Enrollments** (for tracking student-course relationship)
   - Should track: enrollment date, grade (optional)
   - Links students to courses

#### Terminal Script Features Required:

1. **Department Management**
   - Create a new department
   - List all departments with their course count

2. **Professor Management**
   - Add a new professor to a department
   - List all professors with their department and number of courses taught
   - View a professor's complete schedule (all courses they teach)

3. **Course Management**
   - Create a course (must assign to department and professor)
   - List all courses with: professor name, department, enrolled student count
   - View course details including all enrolled students

4. **Student Management**
   - Register a new student
   - Enroll a student in a course (with enrollment date)
   - Drop a student from a course
   - View a student's full schedule (all enrolled courses with professor names)
   - Assign a grade to a student for a specific course

5. **Reporting Features**
   - Find all courses in a specific department
   - Find all students in a specific course
   - Find all courses taught by a specific professor
   - List students by major with their total enrolled credits
   - Find courses with no students enrolled

### Completion Criteria

Your project is complete when you can successfully:

- [ ] Create at least 3 departments
- [ ] Add at least 5 professors across different departments
- [ ] Create at least 8 courses with different professors and departments
- [ ] Register at least 10 students with different majors
- [ ] Enroll students in multiple courses (each student in at least 2 courses)
- [ ] Assign grades to at least 5 student-course combinations
- [ ] Successfully query a professor and see all their courses with student counts
- [ ] Successfully query a student and see all their courses with professor names
- [ ] Successfully query a course and see all enrolled students
- [ ] Successfully query a department and see all courses and professors
- [ ] Drop a student from a course and verify the relationship is removed
- [ ] Generate a report showing courses with zero enrollments
- [ ] Generate a report showing total credits per student

### Bonus Challenges (Optional):
- Add a prerequisite system (courses can have prerequisite courses)
- Add validation to prevent students from enrolling in the same course twice
- Calculate GPA for students based on their grades
- Find scheduling conflicts (students enrolled in courses at the same time)

---