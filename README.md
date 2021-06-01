# REST API for Blog Website

Entire project is build using Nodejs and its related libraries (can be found in package.json file)

This project includes all the major backend concepts like Error Handling, Authentication, Pagination etc.

This API includes server side validation and authentication using JWT token. 

After signing-up with email-ID and choosing an user name, user's email-ID, name and password (hashed password) is stored in the database (MongoDB is used). As a user, you can create,read, edit and delete the posts. And obviously one can delete or edit his own posts.
Posts created by one users is visible to all, but can only be edited/deleted by the owner of that post.

Kindly let me know if you are looking for building front-end for this API. I am happy to make changes as per front-end requirements.

I have already hosted this API [here](https://anime-aadi.herokuapp.com/feed)

Now, lets see the endpoints of this API.

# END POINTS

## Sign Up

### Request

`PUT /auth/signup`

#### Request Body

`{
    "email":"Aditya@github.com",
    "password":"123456",
    "name": "Aditya"
}`

### Response
`{
    "message": "Account created successfully",
    "userId": "60b642c1fa358a00046003e9"
}`


## LOGIN

### Request

`POST /auth/login`

#### Request Body

`{
    "email":"Aditya@github.com",
    "password":"123456"
}`

### Response
`{
    "message": "Token generated successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YUBnaXRodWIuY29tIiwidXNlcklkIjoiNjBiNjQyYzFmYTM1OGEwMDA0NjAwM2U5IiwiaWF0IjoxNjIyNTU3NDc2LCJleHAiOjE2MjI1NjEwNzZ9.o5raRC9-cAz4qn9Gx63ubmHFX4ZQgDrlvJQBCsniqr8",
    "userId": "60b642c1fa358a00046003e9"
}`
<b> This JWT token expires in 1h </b>

## SHOWING FEED OF POSTS

### Request

`GET /feed/?page=1`

Authorization is not required for this route.
Each page shows 3 posts.


### Response
`{
    "message": "All posts found successfully",
    "posts": [
        {
            "_id": "60b342b23036ad05000f569d",
            "title": "My post mna",
            "content": "Sorry sorry please",
            "createdAt": "2021-05-30T07:45:54.703Z",
            "userId": "60b28712c8f62d28c481a746"
        }
        ]
  }`
  
## SHOWING EACH POST

### Request

`GET /post/:postId`

Authorization is not required for this route

#### Request Params
| <b>Key</b>       | <b>Value</b> |
| ----------- | ----------- |
| postId      | Unique Id of each post       |

post id can be found using `GET/feed route`


### Response
`{
"message": "found successfully",
"posts": {
"_id": "60b646a0fa358a00046003ea",
"title": "Second Post",
"content": "This is not my First Post",
"createdAt": "2021-06-01T14:39:28.153Z",
"userId": "60b642c1fa358a00046003e9",
"updatedTime": [
"2021-06-01T14:43:44.663Z"
]
}
}`
  
## CREATING A POST

### Request

`POST /createpost`

Authorization is required for this route

#### Request Header
| <b>Key</b>       | <b>Value</b> |
| ----------- | ----------- |
| Authorization      | JWT Token       |

JWT token is received while logging-in by `POST/auth/login route`

#### Request Body

`{
    "title":"First Post",
    "content":"This is my First Post"
}`
### Response
`{
    "message": "Post created successfully!",
    "post": {
        "id": "60b646a0fa358a00046003ea",
        "title": "First Post",
        "content": "This is my First Post"
    }
}`

## EDITING A POST

### Request

`POST /editpost`

Authorization is required for this route

#### Request Header
| <b>Key</b>       | <b>Value</b> |
| ----------- | ----------- |
| Authorization      | JWT Token       |

JWT token is received while logging-in by `POST/auth/login route`

#### Request Body

`{
    "postId": "60b646a0fa358a00046003ea",
    "title":"Second Post",
    "content":"This is was not my First Post. This was last post"
}`
### Response
`{
    "message": "Post Edited successfully!",
    "post": {
        "title": "Second Post",
        "content": "This is not my First Post"
    }
}`

## DELETING A POST

### Request

`POST /deletepost`

Authorization is required for this route

#### Request Header
| <b>Key</b>       | <b>Value</b> |
| ----------- | ----------- |
| Authorization      | JWT Token       |

JWT token is received while logging-in by `POST/auth/login route`

#### Request Body
`{
    "postId": "60b646a0fa358a00046003ea"
}`
### Response
`{
    "message": "Deleted successfully"
}`

Any endpoints other than mentioned above will produce the below shown response. <br/>
`{
    "message": "Page not found"
}`

### Found this project useful? :heart:

If you found this project useful, then please consider giving it a :star: on Github and sharing it with your friends via social media.

## Project Created & Maintained By

### Aditya Maheshwari 
**Nodejs Developer** #Nodejs, #backend
<a href="https://www.linkedin.com/in/aditya-maheshwari-0b9961166/"><img src="https://github.com/aritraroy/social-icons/blob/master/linkedin-icon.png?raw=true" width="60"></a>
<a href="https://www.facebook.com/profile.php?id=100006237135556"><img src="https://github.com/aritraroy/social-icons/blob/master/facebook-icon.png?raw=true" width="60"></a>
<a href="https://www.instagram.com/aadi.mp3/"><img src="https://github.com/aritraroy/social-icons/blob/master/instagram-icon.png?raw=true" width="60"></a>

  
  
  
