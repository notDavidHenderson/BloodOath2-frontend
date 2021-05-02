//* PUT YOUR CODE IN HERE
const CultURL = 'http://localhost:3000/cults/'
const CommentsURL = 'http://localhost:3000/comments/?cult_id='
const CultId = '1'
const titleElement = document.querySelector('.title')
const imageElement = document.querySelector('.image')
const likesElement = document.querySelector('.bloodoaths')
const commentElement = document.querySelector('.comments')
const commentInput = document.querySelector('.comment-input')
const commentButton = document.querySelector('.comment-button')
const bloodButton = document.querySelector('.bloodoath-button')

// like functionality
const handleClick = () => {
    const likes = parseInt(likesElement.innerText)
    const newLikes = likes + 1
    likesElement.innerText = `${newLikes} Blood Oaths`
    const options = {
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: newLikes
        })
    }
    fetch(CultURL + CultId, options) // changes backend values
}
bloodButton.addEventListener('click',handleClick)


const handleNewComment = (event) =>{
    event.preventDefault() // stops refresh
    // get new comment
    const newComment = commentInput.value
    // display new comment
    const li = document.createElement('li') // create
    li.innerText = newComment               // set
    commentElement.append(li)               // append
    // add the comment to the server

    const commentObject =  {
        "cult_id": CultId,
        "comment": newComment,
      }

    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentObject)
    }
    fetch(CommentsURL, options)

    commentInput.value = '' // reset form input to empty string
}
commentButton.addEventListener('click', event => handleNewComment(event) )

// set initial card values
fetch(CultURL+CultId)
    .then(response => response.json())
    .then(response => {
        titleElement.innerText = response.name
        imageElement.src = response.img_url
        likesElement.innerText = `${response.likes} Blood Oaths`
    })

fetch(CommentsURL + CultId)
    .then(response => response.json())
    .then(comments => {
        commentElement.innerHTML = ''
        comments.forEach(comment => {
            const li = document.createElement('li') // create
            li.innerText = comment.comment          // set
            commentElement.append(li)               // append
        })
    })

