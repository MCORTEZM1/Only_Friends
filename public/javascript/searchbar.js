const searchButtonEl = document.querySelector('#user-search-bar');
const searchBarEl = document.querySelector('#search-bar');
let usersArray = [];
// function to fetch all user data 
async function getAllUsers(event) {
    console.log('Search bar pressed')
    // this graves the text from the text box
    const userName = searchBarEl.value;
   
    document.location.replace(`/post/user/page/${userName}`);
    
};



searchButtonEl.addEventListener('click', getAllUsers);