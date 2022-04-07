async function commentFormHandler(event) {
    event.preventDefault();
  
    
    const comment_text = document.querySelector('#new-comment').value.trim();
    // we were working w Jaydon here vvvvvvvvv 
    let post_url = (window.location).href;
    let URL_id = post_url.split('/')
    let finalId = URL_id[URL_id.length - 1]

    console.log(finalId); 

    if (comment_text) {
      const response = await fetch(`/api/comments/${finalId}`, {
        method: 'post',
        body: JSON.stringify({
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  