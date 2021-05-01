//* PUT YOUR CODE IN HERE
const imageElement = document.querySelector('.image')
const titleElement = document.querySelector('.title')
const likesElement = document.querySelector('.bloodoaths')
const likesButton = document.querySelector('.bloodoath-button')
const commentButton = document.querySelector('.comment-button')
const commentsElement = document.querySelector('.comments')
const CultId = 1 // change this to change your cult
const CultURL = 'http://localhost:3000/cults/'
const CommentURL = 'http://localhost:3000/comments/'
// attatch event listeners
likesButton.addEventListener('click', handleLikes)
commentButton.addEventListener('click', handleNewComment)

displayPictureCard = () => {
    fetch(CultURL+CultId) // fetch for title, image, and likes
        .then(response => response.json())
        .then(cult => {
            titleElement.innerText = cult.name
            imageElement.src = cult.img_url
            likesElement.innerText = `${cult.likes} Blood Oaths`
    })
    fetch(CommentURL) // fetch for comments
        .then(response => response.json())
        .then(comments => {
            displayComments(comments)
        })
}

displayComments = (comments) => { // loop over comments and display them
    for(let comment in comments){
        if(comments[comment].cult_id === CultId){
            const li = document.createElement('li')
            li.innerText = comments[comment].comment
            commentsElement.append(li)
        }
    }
}

function handleLikes() { // add new like and update on page
    const currentLikes = parseInt(likesElement.innerText)
    const newLikes = currentLikes + 1
    likesElement.innerText = `${newLikes} Blood Oaths`
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'likes' : newLikes
        })
    }
    fetch(CultURL,options)
}

function handleNewComment(event) { //grab and post comment
    event.preventDefault()
    console.log('submitting comment')
    const newComment = document.querySelector('.comment-input').value
    let commentObj = {
        "cult_id" : CultId,
        "comment" : newComment
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(commentObj),
        headers: {
            "Content-type" : "application/json",
            "accept": "application/json"
        }
    }
    fetch(CommentURL,options)
    //optomist
    const li = document.createElement('li')
    li.innerText = newComment
    commentsElement.append(li)
    // TODO : reset comment field after submit
}


displayPictureCard()

