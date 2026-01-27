## Project 2: Social Media Platform
**Estimated Time: 3-5 hours**
**Focus: Self-Relations & Complex Many-to-Many**

### Problem Description
Build a terminal-based social media platform where users can create posts, follow other users, like posts, comment on posts, and posts can have hashtags.

### Requirements

#### Data Model Requirements:

1. **Users**
   - Should have: id, username, email, bio, join date
   - Can follow other users (many-to-many self-relation)
   - Can create posts
   - Can like posts
   - Can comment on posts

2. **Posts**
   - Should have: id, content, created date, edited date (optional)
   - Belongs to ONE user (author)
   - Can have MANY likes (from different users)
   - Can have MANY comments
   - Can have MANY hashtags

3. **Comments**
   - Should have: id, content, created date
   - Belongs to ONE user (author)
   - Belongs to ONE post
   - Can be replies to other comments (self-relation - optional parent comment)

4. **Likes**
   - Should track: user who liked, post that was liked, timestamp
   - A user can only like a post once

5. **Hashtags**
   - Should have: id, tag name
   - Can be used in MANY posts
   - Posts can have MANY hashtags

#### Terminal Script Features Required:

1. **User Management**
   - Create a new user
   - Follow another user
   - Unfollow a user
   - View a user's profile (followers count, following count, post count)
   - List all followers of a user
   - List all users a person is following
   - Get mutual followers (users who follow each other)

2. **Post Management**
   - Create a post with content and hashtags
   - Edit a post (update content and/or hashtags)
   - Delete a post
   - View a post with all its details (author, likes count, comments count, hashtags)
   - List all posts by a specific user

3. **Interaction Features**
   - Like a post
   - Unlike a post
   - Comment on a post
   - Reply to a comment (nested comments)
   - View all comments on a post (including nested replies)

4. **Feed & Discovery Features**
   - Generate a feed for a user (posts from people they follow, sorted by date)
   - Find posts by hashtag
   - Find trending hashtags (most used in last 7 days)
   - Find most liked posts
   - Find users who liked a specific post
   - Find posts that a specific user has liked

5. **Analytics Features**
   - Get post engagement (total likes + comments)
   - Find a user's most popular post
   - Find influencers (users with most followers)
   - Find a user's activity summary (posts created, comments made, posts liked)

### Completion Criteria

Your project is complete when you can successfully:

- [ ] Create at least 8 users
- [ ] Set up follow relationships (at least 15 follow connections)
- [ ] Create at least 20 posts from different users with various hashtags
- [ ] Add at least 30 likes across different posts
- [ ] Add at least 25 comments (including 5 reply comments)
- [ ] Successfully generate a feed for a user showing only posts from followed users
- [ ] Successfully find all posts with a specific hashtag
- [ ] Successfully find mutual followers between two users
- [ ] Successfully unlike a post and verify the like is removed
- [ ] Successfully find the top 3 most liked posts
- [ ] Successfully find the top 3 users with most followers
- [ ] Successfully view a post with all its comments (including nested replies)
- [ ] Successfully find all hashtags used by a specific user
- [ ] Successfully calculate engagement score for posts
- [ ] Successfully delete a post and verify all related likes and comments are handled

### Bonus Challenges (Optional):
- Add direct messaging between users
- Add blocking/muting functionality
- Add post privacy settings (public, followers-only, private)
- Implement a recommendation system (suggest users to follow)
- Add post sharing/reposting functionality
- Add hashtag following (users can follow hashtags to see posts)

---
