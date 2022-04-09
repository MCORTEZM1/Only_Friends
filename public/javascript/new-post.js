const newPostBtn = document.querySelector("#new-post");
const newPostModal = document.querySelector("#newPostModal");
const closePostModal = document.querySelector("#image-btn");

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

function submitHandler(event){
  document.querySelector('')
}


async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const post_body = document.querySelector('#post_body').value;
    const category_name = document.querySelector('#category_name').value;
    // let imageUrl = document.querySelector('#post-image').value.split('\\');
    // let image_path = `\\public\\images\\` + imageUrl[imageUrl.length -1];
    // console.log(imageUrl);

    const response = await fetch("/api/posts/",  {
      method: 'post',
      body: JSON.stringify({
        title,
        post_body,
        category_name,
        image_path
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response)

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText );
    }
}
  
document.querySelector('#image-btn').addEventListener('submit', newFormHandler);