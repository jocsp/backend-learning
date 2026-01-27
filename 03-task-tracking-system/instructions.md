## Project 3: Project Management & Task Tracking System
**Estimated Time: 4-8 hours**
**Focus: Complex Relations, Optional Fields, and Cascading Actions**

### Problem Description
Build a terminal-based project management system similar to Jira/Asana where teams can manage projects, create tasks with subtasks, assign team members, track time, and manage dependencies.

### Requirements

#### Data Model Requirements:

1. **Teams**
   - Should have: id, name, description, created date
   - Has MANY members (users)
   - Has MANY projects

2. **Users**
   - Should have: id, name, email, role (admin, member, viewer)
   - Can belong to MANY teams
   - Can be assigned to MANY tasks
   - Can create tasks
   - Can log time entries

3. **Projects**
   - Should have: id, name, description, start date, end date, status
   - Belongs to ONE team
   - Has MANY tasks
   - Has ONE project owner (user)

4. **Tasks**
   - Should have: id, title, description, priority, status, created date, due date
   - Belongs to ONE project
   - Can have ONE parent task (for subtasks - self-relation)
   - Can have MANY subtasks
   - Assigned to MANY users
   - Can have MANY dependencies (other tasks that must be completed first)
   - Created by ONE user
   - Can have MANY time entries
   - Can have MANY comments

5. **TaskAssignments**
   - Links users to tasks
   - Should track: assigned date, role on task (owner, contributor, reviewer)

6. **TaskDependencies**
   - Links tasks to other tasks they depend on
   - Should track: dependency type (blocks, blocked_by)

7. **TimeEntries**
   - Should have: id, hours, description, date
   - Belongs to ONE user
   - Belongs to ONE task

8. **Comments**
   - Should have: id, content, created date
   - Belongs to ONE user
   - Belongs to ONE task

#### Terminal Script Features Required:

1. **Team & User Management**
   - Create a team
   - Add users to a team
   - Remove users from a team
   - List all teams with member counts
   - View team details (all members, all projects)

2. **Project Management**
   - Create a project for a team
   - Assign a project owner
   - Update project status (planning, active, on-hold, completed)
   - List all projects in a team
   - View project details (all tasks, total time logged, completion percentage)

3. **Task Management**
   - Create a task in a project
   - Create a subtask under a parent task
   - Assign users to a task with specific roles
   - Update task status (todo, in-progress, review, done)
   - Update task priority (low, medium, high, critical)
   - Set task dependencies (Task A must be completed before Task B)
   - Delete a task (handle subtasks and dependencies)
   - List all tasks in a project (with filters for status, priority, assignee)
   - View task details (all assignees, subtasks, dependencies, time logged, comments)

4. **Time Tracking**
   - Log time to a task
   - View all time entries for a task
   - View all time entries by a user
   - Calculate total time logged on a project
   - Calculate total time logged on a task (including subtasks)

5. **Workflow Features**
   - Add a comment to a task
   - View all comments on a task
   - Find all tasks assigned to a specific user
   - Find all tasks created by a specific user
   - Find tasks blocked by incomplete dependencies
   - Find overdue tasks (past due date and not completed)

6. **Reporting & Analytics**
   - Generate project summary (total tasks, completed tasks, in-progress tasks, total time)
   - Generate user workload report (tasks assigned, total hours logged this week)
   - Find the critical path (tasks with most dependencies)
   - Find orphaned tasks (no assignees)
   - Calculate completion percentage for a project
   - Find tasks with most time logged
   - Find most active users (by comments, time entries, tasks created)

### Completion Criteria

Your project is complete when you can successfully:

- [ ] Create at least 3 teams
- [ ] Add at least 10 users across different teams (some users in multiple teams)
- [ ] Create at least 5 projects across different teams
- [ ] Create at least 30 tasks with various statuses and priorities
- [ ] Create at least 10 subtasks under parent tasks
- [ ] Set up at least 8 task dependencies
- [ ] Assign users to tasks with different roles
- [ ] Log at least 40 time entries across different tasks and users
- [ ] Add at least 20 comments to various tasks
- [ ] Successfully query a project and see completion percentage
- [ ] Successfully find all tasks blocked by dependencies
- [ ] Successfully find all overdue tasks
- [ ] Successfully generate a workload report for a user
- [ ] Successfully delete a task and verify subtasks are handled properly
- [ ] Successfully calculate total time logged on a project (including all subtasks)
- [ ] Successfully find orphaned tasks (no assignees)
- [ ] Successfully view the critical path for a project
- [ ] Successfully query a user's tasks across all their teams
- [ ] Successfully update a task status and verify dependency impacts

### Bonus Challenges (Optional):
- Add task templates (reusable task structures)
- Add sprints/iterations to projects
- Add file attachments to tasks
- Add notifications when tasks are assigned or commented on
- Add task labels/tags for categorization
- Add recurring tasks
- Add task history/audit log (track all changes)
- Add Gantt chart data export (task start/end dates with dependencies)
- Add velocity tracking (tasks completed per week/sprint)

---

## General Guidelines for All Projects

### Setup Instructions:
1. Initialize a new Node.js project
2. Install dependencies: `prisma`, `@prisma/client`, `typescript` (optional), any CLI helper libraries you prefer
3. Set up PostgreSQL database
4. Design your Prisma schema
5. Create and run migrations
6. Build your terminal interface

### Testing Your Implementation:
- Create a seed script to populate initial data
- Write a comprehensive test script that runs through all features
- Test edge cases (deleting records with relations, updating references, etc.)
- Verify cascading deletes work as expected
- Test queries with multiple levels of nesting

### What You'll Practice:
- One-to-one relations
- One-to-many relations
- Many-to-many relations (implicit and explicit)
- Self-relations
- Optional vs required relations
- Cascading actions (onDelete, onUpdate)
- Complex nested queries
- Relation filtering
- Aggregations with relations
- Transaction handling

### Code Quality Criteria:
- Clean, readable code with proper error handling
- Modular functions (separate concerns)
- Clear terminal UI with proper prompts
- Input validation
- Proper async/await usage
- Comments explaining complex queries

---

## Submission Checklist (For Each Project)

When you complete a project, verify you have:

- [ ] A complete Prisma schema file
- [ ] Migration files
- [ ] A seed script with sample data
- [ ] A terminal script with all required features
- [ ] Clear console output showing each feature working
- [ ] All completion criteria checked off
- [ ] Error handling for common scenarios
- [ ] A README explaining how to run the project

---
