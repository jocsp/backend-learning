# Prisma Data Modeling Practice – Starter Projects

## Project 1: Notes Lite
A simple notes app where people can create personal notes. Every note must belong to one user, and one user can own many notes.

### Base Schema v1
- User: a profile with an auto-increment id, a unique email, an optional display name, a created-at timestamp, and a one-to-many connection to notes.
- Note: a record with an auto-increment id, a required title, optional content, an archived flag that starts as false, created-at and updated-at timestamps, and a required owner reference to a user.

1. **Exercise 1: Create Notes Lite v1 (From-Scratch)**
   **Concepts practiced:** primary keys, unique fields, default values, required one-to-many relationship.
   **Requirements:** A customer wants user accounts and notes. Create a User model with these fields: id, email, name, and createdAt. Email must be required and unique. Name should be optional. createdAt should default to the current time. Create a Note model with these fields: id, title, content, isArchived, createdAt, updatedAt, and userId. title is required, content is optional, isArchived defaults to false, createdAt defaults to now, updatedAt updates automatically, and userId is required. One user must be able to have multiple notes.
   **Deliverables:** Update schema.prisma with both models and a required ownership relation from Note to User. Add the unique rule on email. If you expect frequent lookups by owner, add an index for note owner lookups. Write 3-6 design notes in plain language about cardinality, required versus optional fields, and what the database enforces versus what the app enforces.
   **Self-check:**
   - Each note must require a user owner.
   - Both relation fields and the foreign key field should exist.
   - updatedAt should be automatic.

2. **Exercise 2: Add Shareable Note Slug (Feature Add)**
   **Concepts practiced:** optional unique field, migration-safe changes.
   **Requirements:** A customer wants shareable note links. Add a new Note field named slug. slug should be optional and unique so old notes can exist without a slug during rollout.
   **Deliverables:** Update schema.prisma by adding slug to Note. Keep all existing fields, constraints, and relationships the same. Add notes explaining that uniqueness is a database rule, while slug generation and backfill happen in application logic.
   **Self-check:**
   - slug must remain optional in this exercise.
   - email must remain unique on User.
   - note ownership rules must not change.

3. **Exercise 3: Add Publish State (Feature Add)**
   **Concepts practiced:** default values, optional timestamp fields.
   **Requirements:** A customer wants draft and published notes. Add two fields to Note: isPublished and publishedAt. isPublished should default to false. publishedAt should be optional.
   **Deliverables:** Update schema.prisma with the two new fields. Keep all previous relation and uniqueness rules. Add design notes clarifying that the database stores state, but the app decides when publishedAt must be set.
   **Self-check:**
   - publishedAt should be optional.
   - userId should stay required.
   - no advanced constraints should be introduced.

4. **Exercise 4: Rebuild Full Schema From Memory (From-Scratch)**
   **Concepts practiced:** repetition for modeling muscle memory.
   **Requirements:** Rebuild the current User and Note schema from scratch, including slug, isPublished, and publishedAt, with the same required and optional behavior as before.
   **Deliverables:** Deliver a complete schema with all current fields, unique email, unique optional slug, and required note ownership. Include 3-6 design notes about the choices.
   **Self-check:**
   - ids should still auto-increment.
   - createdAt defaults should still exist.
   - relation naming should stay consistent.

5. **Exercise 5: Add User Soft-Delete Fields (Feature Add)**
   **Concepts practiced:** optional lifecycle field, default boolean.
   **Requirements:** A customer wants to deactivate users without deleting them. Add deletedAt as an optional field on User and add isActive with default true.
   **Deliverables:** Update schema.prisma with deletedAt and isActive on User. Keep all note relationships and constraints unchanged. Write notes explaining that inactive filtering is app-level while foreign keys and uniqueness are database-level.
   **Self-check:**
   - note ownership must remain required.
   - User email must stay unique.
   - no existing field should be removed.

6. **Exercise 6: Add Normalized Title Field (Feature Add)**
   **Concepts practiced:** optional unique field on an existing model.
   **Requirements:** A customer wants cleaner dedup checks. Add titleNormalized to Note as an optional unique field. Keep title required.
   **Deliverables:** Update schema.prisma so Note now has both optional unique slug and optional unique titleNormalized. Keep relations and defaults unchanged. Add notes saying the app computes normalization while the database enforces uniqueness.
   **Self-check:**
   - title must stay required.
   - titleNormalized should be optional.
   - existing unique rules should remain.

7. **Exercise 7: Relation Naming Drill (From-Scratch)**
   **Concepts practiced:** relation naming clarity without behavior changes.
   **Requirements:** Rebuild the same schema but rename the relation fields to clearer names, such as author on Note and notes on User. Keep the required foreign key from Note to User.
   **Deliverables:** Deliver the same schema behavior with clearer relation names. Keep all fields and constraints from the previous step. Add notes about naming consistency.
   **Self-check:**
   - relation names should match on both sides.
   - the foreign key field must still exist.
   - one user to many notes should stay unchanged.

8. **Exercise 8: Add Last Viewed Timestamp (Feature Add)**
   **Concepts practiced:** optional lifecycle metadata.
   **Requirements:** A customer wants to track note activity. Add lastViewedAt as an optional field on Note.
   **Deliverables:** Update schema.prisma with lastViewedAt and preserve all prior constraints and relations. Add 3-6 notes summarizing final Notes Lite design decisions.
   **Self-check:**
   - lastViewedAt should be optional.
   - all existing unique rules should still be present.
   - this remains schema-only work.

## Project 2: Simple Store
A small store where customers place orders for products. This project repeats the same core modeling habits in a different business story.

### Base Schema v1
- Customer: an auto-increment id, unique email, full name, created-at timestamp, and one-to-many relation to orders.
- Product: an auto-increment id, unique sku, product name, price in cents, active flag with default true, created-at timestamp, and one-to-many relation to orders.
- Order: an auto-increment id, placed-at timestamp, quantity, status text, required customer reference, and required product reference.

1. **Exercise 1: Create Simple Store v1 (From-Scratch)**
   **Concepts practiced:** primary keys, unique fields, defaults, required one-to-many relationships.
   **Requirements:** A customer wants basic ordering. Create Customer with id, email, fullName, and createdAt. email must be unique. Create Product with id, sku, name, priceCents, isActive, and createdAt. sku must be unique and isActive should default to true. Create Order with id, placedAt, quantity, statusText, customerId, and productId. placedAt should default to now, statusText should default to PENDING, and both customerId and productId must be required.
   **Deliverables:** Add all three models and required relationships so one customer can have many orders and one product can appear in many orders. Add unique rules for customer email and product sku. Write short notes on what is DB-enforced and what is app-enforced.
   **Self-check:**
   - both Order foreign keys must be required.
   - relation fields and foreign key fields must both be present.
   - keep scope to basic modeling only.

2. **Exercise 2: Add Customer Phone (Feature Add)**
   **Concepts practiced:** optional unique field.
   **Requirements:** A customer wants optional phone contact. Add phone on Customer as optional and unique.
   **Deliverables:** Update schema.prisma with the new Customer field and keep all existing relations and constraints unchanged. Add notes that phone formatting happens in app code.
   **Self-check:**
   - phone should stay optional.
   - email should stay unique.
   - order relations should not change.

3. **Exercise 3: Expand Product Details (Feature Add)**
   **Concepts practiced:** optional scalar field and default numeric field.
   **Requirements:** A customer wants richer catalog details. Add description as optional on Product and stockCount with default zero.
   **Deliverables:** Update Product with description and stockCount. Keep sku unique and product-to-order relation unchanged. Add notes saying stock rules like no negatives are app-level for now.
   **Self-check:**
   - priceCents must remain required.
   - stockCount must have a default.
   - no new advanced concept should appear.

4. **Exercise 4: Rebuild Current Store Schema (From-Scratch)**
   **Concepts practiced:** repetition across three related models.
   **Requirements:** Rebuild the full current Customer, Product, and Order schema from memory, including phone and stockCount.
   **Deliverables:** Deliver schema with all current fields, required relationships, unique rules, and defaults. Write short notes on cardinality and field optionality.
   **Self-check:**
   - all relations should still be correct.
   - all defaults should still be present.
   - still basics-only.

5. **Exercise 5: Add Order Lifecycle Timestamps (Feature Add)**
   **Concepts practiced:** optional timestamp fields.
   **Requirements:** A customer wants cancellation and fulfillment tracking. Add cancelledAt and fulfilledAt as optional fields on Order.
   **Deliverables:** Update Order with both optional timestamps. Keep existing required foreign keys and uniqueness rules unchanged. Add notes clarifying lifecycle consistency is mostly app-level in this stage.
   **Self-check:**
   - both new fields should be optional.
   - customer and product links should remain required.
   - status field should remain.

6. **Exercise 6: Add Shipping Snapshot Fields (Feature Add)**
   **Concepts practiced:** denormalized order data, required versus optional fields.
   **Requirements:** A customer wants each order to store shipping details at purchase time. Add shippingName, shippingLine1, and shippingCity as required fields on Order. Add shippingLine2 as optional.
   **Deliverables:** Update Order with these four shipping fields and keep all existing relationships and constraints. Add notes explaining why these fields live on Order history, not only on Customer profile.
   **Self-check:**
   - only shippingLine2 should be optional.
   - do not remove existing order fields.
   - do not move shipping snapshot into another model.

7. **Exercise 7: Add Business Order Number (Feature Add)**
   **Concepts practiced:** unique business identifier.
   **Requirements:** A customer support team needs a human-friendly order ID. Add orderNumber as a required unique field on Order.
   **Deliverables:** Update Order with orderNumber and enforce uniqueness at the database level. Keep all other fields and relations unchanged. Add notes saying order number generation belongs to app logic.
   **Self-check:**
   - keep id as the primary key.
   - keep existing unique constraints.
   - keep required foreign keys unchanged.

8. **Exercise 8: Store Consolidation Rebuild (From-Scratch)**
   **Concepts practiced:** full basics consolidation before new concepts.
   **Requirements:** Rebuild the final Project 2 schema from memory with all fields added so far.
   **Deliverables:** Deliver complete schema and 3-6 plain-language notes covering cardinality, required versus optional fields, defaults, and uniqueness.
   **Self-check:**
   - Projects 1 and 2 must stay basics-only.
   - relationships must remain unchanged.
   - no query code should be added.

## Project 3: Library Loans
A library tracks which member borrowed which book and when each loan should be returned. This project introduces one new concept: an explicit join model with a composite uniqueness rule.

### Base Schema v1
- Member: an auto-increment id, unique email, full name, joined-at timestamp, and one-to-many relation to loans.
- Book: an auto-increment id, unique isbn, title, optional publication year, created-at timestamp, and one-to-many relation to loans.
- Loan: an auto-increment id, required member reference, required book reference, borrowed-at timestamp, due-at date, optional returned-at date.

1. **Exercise 1: Create Library Loan Schema v1 (From-Scratch)**
   **Concepts practiced:** explicit join model, required relations, baseline uniqueness and defaults.
   **Requirements:** A customer wants loan history with loan-specific fields. Create Member with id, email, fullName, and joinedAt. email must be unique, joinedAt should default to now. Create Book with id, isbn, title, publishedYear, and createdAt. isbn must be unique, publishedYear is optional, createdAt defaults to now. Create Loan with id, memberId, bookId, borrowedAt, dueAt, and returnedAt. memberId and bookId must be required, borrowedAt defaults to now, dueAt is required, returnedAt is optional.
   **Deliverables:** Build Loan as an explicit bridge between Member and Book so loan-specific fields can be stored. Keep required foreign keys and baseline unique rules. Add notes describing why this bridge model is necessary.
   **Self-check:**
   - do not use an implicit many-to-many setup.
   - both Loan foreign keys must be required.
   - returnedAt should stay optional.

2. **Exercise 2: Add Composite Uniqueness Rule to Loan (Feature Add)**
   **Concepts practiced:** composite unique constraint.
   **Requirements:** A customer wants to prevent duplicate copies of the same borrowing event. Add one rule saying the combination of memberId, bookId, and borrowedAt must be unique.
   **Deliverables:** Add that composite uniqueness rule on Loan and keep Loan id as the primary key. Keep all existing single-field unique rules unchanged.
   **Self-check:**
   - do not replace primary key with a composite primary key.
   - keep member and book unique identifiers unchanged.
   - keep relation cardinality unchanged.

3. **Exercise 3: Add Loan State Fields (Feature Add)**
   **Concepts practiced:** defaults on join model fields.
   **Requirements:** A customer wants to track missing books and renewals. Add isLost with default false and renewalCount with default zero on Loan.
   **Deliverables:** Update Loan with these two fields and preserve all existing uniqueness and relation rules. Add notes explaining which loan workflow checks remain app-level.
   **Self-check:**
   - returnedAt must remain optional.
   - new fields must have defaults.
   - no additional new concept should be added.

4. **Exercise 4: Expand Member Identity (Feature Add)**
   **Concepts practiced:** repeated uniqueness patterns.
   **Requirements:** A customer wants stronger member identity data. Add cardNumber as required and unique, and add phone as optional and unique on Member.
   **Deliverables:** Update Member with cardNumber and phone while keeping email unique and all Loan relations unchanged. Add notes on required versus optional identity fields.
   **Self-check:**
   - phone should remain optional.
   - email and cardNumber should both be unique.
   - relation mapping should remain intact.

5. **Exercise 5: Rebuild Library Schema (From-Scratch)**
   **Concepts practiced:** interleaving basics with explicit join and composite uniqueness.
   **Requirements:** Rebuild the full current schema for Member, Book, and Loan from memory, including all fields and rules added so far.
   **Deliverables:** Deliver a complete schema with explicit Loan model, all unique rules, and the composite uniqueness rule on borrowing events. Add concise design notes.
   **Self-check:**
   - verify the composite rule uses memberId, bookId, and borrowedAt.
   - verify required foreign keys remain required.
   - verify defaults and optional fields are correct.

6. **Exercise 6: Add Book Metadata (Feature Add)**
   **Concepts practiced:** optional metadata fields, default boolean.
   **Requirements:** A customer wants richer book details. Add subtitle as optional, pageCount as optional, and isReferenceOnly with default false on Book.
   **Deliverables:** Update Book with the three fields while preserving all existing relationships and uniqueness rules. Add notes on what metadata quality checks happen at app level.
   **Self-check:**
   - isbn must remain unique.
   - subtitle and pageCount should remain optional.
   - Loan relationships should stay unchanged.

7. **Exercise 7: Add Staff Snapshot Fields (Feature Add)**
   **Concepts practiced:** required and optional scalar fields in the join model.
   **Requirements:** A customer wants staff names captured during checkout and return. Add checkedOutByStaffName as required and returnedToStaffName as optional on Loan.
   **Deliverables:** Update Loan with both fields and keep all existing uniqueness and relationship rules intact.
   **Self-check:**
   - returnedToStaffName should be optional.
   - do not introduce new models.
   - keep the composite uniqueness rule.

8. **Exercise 8: Project 3 Consolidation Rebuild (From-Scratch)**
   **Concepts practiced:** spiral reinforcement of all concepts introduced so far.
   **Requirements:** Rebuild the final Project 3 schema exactly, including Member, Book, and Loan with all current fields and constraints.
   **Deliverables:** Submit complete schema and 3-6 design notes explaining database-enforced rules versus app-level business rules.
   **Self-check:**
   - Project 3 should only add explicit join modeling and composite uniqueness as new concepts.
   - basics from earlier projects must remain strong.
   - keep scope to schema-only.

## Project 4: Class Enrollment Mini
A training center tracks student enrollments in courses. This project reuses the join model and composite uniqueness pattern, then introduces one new concept: indexes for query performance.

### Base Schema v1
- Student: an auto-increment id, unique email, full name, created-at timestamp, and one-to-many relation to enrollments.
- Course: an auto-increment id, unique course code, title, start date, end date, and one-to-many relation to enrollments.
- Enrollment: an auto-increment id, required student reference, required course reference, enrolled-at timestamp, optional dropped-at timestamp, optional completion-recorded-at timestamp.

1. **Exercise 1: Create Enrollment Schema v1 (From-Scratch)**
   **Concepts practiced:** explicit join reuse, composite uniqueness reuse.
   **Requirements:** A customer wants enrollment history. Create Student with id, email, fullName, and createdAt. email must be unique and createdAt should default to now. Create Course with id, code, title, startsOn, and endsOn. code must be unique. Create Enrollment with id, studentId, courseId, enrolledAt, droppedAt, and completionRecordedAt. studentId and courseId are required, enrolledAt defaults to now, droppedAt and completionRecordedAt are optional. Add one rule saying studentId plus courseId plus enrolledAt must be unique together.
   **Deliverables:** Deliver schema with all three models, required Enrollment ownership links, and the composite uniqueness rule on enrollment events.
   **Self-check:**
   - keep Enrollment as an explicit model.
   - keep Enrollment id as primary key.
   - keep droppedAt and completionRecordedAt optional.

2. **Exercise 2: Add First Indexes (Feature Add)**
   **Concepts practiced:** non-unique indexes.
   **Requirements:** A customer expects frequent lookups of enrollment history by student and by course. Add one index using studentId and enrolledAt, and another index using courseId and enrolledAt.
   **Deliverables:** Update Enrollment with both indexes while keeping all uniqueness and relationship rules unchanged. Add notes that indexes help performance and do not enforce uniqueness.
   **Self-check:**
   - do not replace uniqueness rules with indexes.
   - keep both indexes present.
   - do not add extra new concepts here.

3. **Exercise 3: Expand Student Identity Fields (Feature Add)**
   **Concepts practiced:** repeated unique patterns with existing indexes.
   **Requirements:** A customer wants better external identity mapping. Add externalRef as required and unique on Student. Add phone as optional and unique on Student.
   **Deliverables:** Update Student with both fields and preserve Enrollment composite uniqueness and both indexes.
   **Self-check:**
   - phone should remain optional.
   - email should remain unique.
   - Enrollment constraints should remain unchanged.

4. **Exercise 4: Add Course Capacity Fields (Feature Add)**
   **Concepts practiced:** default numeric field and optional numeric field.
   **Requirements:** A customer wants class capacity tracking. Add capacity as required with default 30, and add waitlistCapacity as optional on Course.
   **Deliverables:** Update Course with these fields and keep code unique plus all existing relationships unchanged. Add notes on what capacity business rules remain app-level.
   **Self-check:**
   - capacity must be required with a default.
   - waitlistCapacity should be optional.
   - course code uniqueness should remain.

5. **Exercise 5: Add Enrollment Status Fields (Feature Add)**
   **Concepts practiced:** default text field and optional lifecycle timestamp.
   **Requirements:** A customer wants simple enrollment lifecycle status. Add statusText as required with default ENROLLED, and add completedAt as optional on Enrollment.
   **Deliverables:** Update Enrollment with these fields while preserving required foreign keys, composite uniqueness, and both indexes.
   **Self-check:**
   - completedAt should be optional.
   - indexes should remain intact.
   - composite uniqueness should remain intact.

6. **Exercise 6: Rebuild Current Project 4 Schema (From-Scratch)**
   **Concepts practiced:** full interleaving with index usage.
   **Requirements:** Rebuild the current Student, Course, and Enrollment schema from memory with all fields, uniqueness rules, composite rule, and indexes added so far.
   **Deliverables:** Deliver complete schema and short notes that clearly separate integrity constraints from performance indexes.
   **Self-check:**
   - both Enrollment indexes should exist.
   - the composite enrollment uniqueness rule should exist.
   - required student and course references should stay required.

7. **Exercise 7: Model Rejoin Timeline (Feature Add)**
   **Concepts practiced:** optional lifecycle expansion with existing composite uniqueness.
   **Requirements:** A customer wants to track re-enrollment moments. Add rejoinedAt as optional on Enrollment. Keep the existing uniqueness rule based on studentId, courseId, and enrolledAt.
   **Deliverables:** Update Enrollment with rejoinedAt and keep all prior constraints and indexes unchanged. Add notes explaining why enrolledAt stays in the composite uniqueness rule for history tracking.
   **Self-check:**
   - rejoinedAt should be optional.
   - keep both indexes unchanged.
   - keep composite uniqueness unchanged.

8. **Exercise 8: Final Consolidation Rebuild (From-Scratch)**
   **Concepts practiced:** final spiral review.
   **Requirements:** Rebuild the final Project 4 schema exactly as designed, including all fields and constraints.
   **Deliverables:** Submit complete schema and 3-6 plain-language notes on cardinality, required versus optional fields, uniqueness, composite uniqueness, index usage, and DB-level versus app-level enforcement.
   **Self-check:**
   - Projects 1 and 2 should still be basics-only.
   - Project 3 should have introduced explicit join model plus composite uniqueness.
   - Project 4 should only add indexes as the new concept.
