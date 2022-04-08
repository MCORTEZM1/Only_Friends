const newPostBtn = document.querySelector("#new-post");
const newPostModal = document.querySelector("#newPostModal");
const closePostModal = document.querySelector("#close-btn");

const body = document.querySelector("body");

//function to display and hide newPost modal
newPostBtn.addEventListener("click", function() {
    newPostModal.classList.add("modal");
    body.style.overflow="hidden";
});

closePostModal.addEventListener("click", function() {
    newPostModal.classList.remove("modal");
    body.style.overflow="visible";
});



async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#new-title').value;
    const post_body = document.querySelector('#new-body').value;
    const category_name = document.querySelector('#new-category').value;
    // let imageUrl = document.querySelector('#post-image').value.split('\\');
    // let image_path = `\\public\\images\\` + imageUrl[imageUrl.length -1];
    // console.log(imageUrl);
    
    const response = await fetch("/api/posts",  {
      method: 'post',
      body: JSON.stringify({
        title,
        post_body,
        category_name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response)

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText );
    }
}
  
document.querySelector('#imageBtn').addEventListener('click', newFormHandler);