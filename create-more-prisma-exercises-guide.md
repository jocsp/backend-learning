# How To Create More Prisma Data Modeling Exercises

## Goal
Use this guide to create new Prisma schema-only exercises that match your current curriculum style: plain customer language, explicit field requirements, gradual interleaving, and no guessing.

## Non-Negotiable Rules
- Keep it schema-only. Do not include Prisma Client queries.
- Write Requirements and Deliverables in plain language, like a customer request.
- Name every field to create or change. Also state if each field is required or optional.
- State every constraint clearly (unique, composite unique, indexes, required relationship).
- Keep each exercise scoped to 15-25 minutes.
- Every exercise must include:
  - Exercise title
  - Concepts practiced
  - Requirements
  - Deliverables
  - Self-check bullets
- Every exercise must require 3-6 design notes covering:
  - cardinality
  - required vs optional
  - uniqueness/composite/index choices
  - DB-enforced vs app-enforced rules

## Exercise Mix Per 8-Exercise Mini-Project
- Exercise 1: From-scratch base schema.
- Exercises 2-3: Small feature adds that repeat basics.
- Exercise 4: From-scratch rebuild from memory.
- Exercises 5-7: Feature adds with one concept introduced slowly.
- Exercise 8: Final from-scratch consolidation.

Target mix per project:
- 3 from-scratch exercises
- 5 feature-add exercises

## Interleaving Rules (Spiral Learning)
- Keep about 70% repetition and 30% novelty.
- Introduce only one new concept at a time.
- After introducing a new concept, reuse it for at least 2-3 later exercises.
- In each new exercise, bring back at least 2 older concepts.
- Do not switch topics abruptly (no hard "beginner block" then "advanced block").

## Step-by-Step Workflow To Author New Exercises
1. Pick a tiny realistic domain.
2. Define Base Schema v1 with 2-3 models (max 4 if needed).
3. Write Exercise 1 from scratch with explicit fields and required relationships.
4. For Exercises 2-3, add small features that repeat ids, unique fields, defaults, and required/optional decisions.
5. Write Exercise 4 as a full rebuild from memory.
6. Introduce exactly one new concept in Exercise 5 (or later if needed).
7. Reuse that new concept in Exercises 6-8 while still repeating old concepts.
8. End with a consolidation rebuild that includes all fields and constraints.

## Copy-Paste Exercise Template
1. **Exercise X: <title> (From-Scratch|Feature Add)**
   **Concepts practiced:** <list>
   **Requirements:** A customer wants <outcome>. Create or update these fields: <field list with required/optional>. Add or keep these relations: <cardinality in plain language>. Add or keep these constraints: <unique/composite/index/defaults>.
   **Deliverables:** Update `schema.prisma` with exactly the fields and relations listed above. Keep existing constraints unless this exercise explicitly changes them. Add indexes only when the exercise says the query pattern is obvious. Write 3-6 design notes explaining cardinality, optionality, uniqueness/index choices, and DB vs app enforcement.
   **Self-check:**
   - <mistake to avoid 1>
   - <mistake to avoid 2>
   - <mistake to avoid 3>

## Writing Style Rules (Important)
- Avoid pseudo code notation in Requirements/Deliverables.
- Prefer customer language, for example:
  - "A user can have many notes, but each note must belong to one user."
  - "Order number must be unique so support can find orders quickly."
- Still be explicit:
  - Say field names directly.
  - Say required vs optional directly.
  - Say unique/default/index decisions directly.

## Validation Checklist Before Publishing New Exercises
- Heading and project title format are consistent.
- Exactly 8 exercises per mini-project.
- Each exercise includes all required sections.
- Requirements mention exact field names and what changes.
- Deliverables do not force guessing.
- New concepts are introduced one at a time.
- Earlier concepts are visibly repeated in later exercises.
- No Prisma Client query tasks are included.

## Suggested Concept Ladder For Future Projects (One New Concept At A Time)
- Next new concept option A: enum fields for status/role.
- Next new concept option B: one-to-one relation.
- Next new concept option C: composite primary key.
- Next new concept option D: relation actions (`onDelete` / `onUpdate`).
- Next new concept option E: mapped names (`@@map` / `@map`) introduced lightly.

Use only one option per project, then repeat it across multiple exercises.
