# Find Friends by interests

## page is about
- Setting Profile including interests
- finding new friends based on that activities
- finding groups around that topics
- maybe getting news to the topic on landingPage (Depending on existance of API)

## whats important
- get as most profiles as possible
    - signup simple (maybe facebook signup)
    - getting good place on websearch (as fas as we can )
    - social media connection
    - getting advantage of inviting people
- one click contact
- good experience
    - design
    - search-engine-optimised
    - performance of the page

## basic functions
- Users-Databank
- search for Users
- groups
- sending messages
- post-board
- pictures in posts and user

## nice functions
- login with facebook
- syncronise to facebook group
- invitation link and email
- language switch/translation
- newsfeed to the selected topics
- nice adress

# Steps and Milestones
## name and terms
- finding a name and web-adress
- describing page, search terms

## frontend general layout
- general layout with placeholders
- styling
- logo
- responsiveness of page

## BackEnd
- User Schema
- Message Schema
- BlogPosts Schema
- Search and Filter

## questions
- user-rating-users? AnswerRation/Time to answer
- -picture upload check by users

Learned from Project
- Protocoll of group-decisions
- Deviding work


db.collection.aggregate([
{ $addFields:
{ age: { $dateDiff: { startDate: "$dob", endDate: "$$NOW", unit: "year" } } }
}
])