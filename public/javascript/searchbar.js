const searchButtonEl = document.querySelector('#user-search-bar');
const searchBarEl = document.querySelector('#search-bar');

// function to handel search bar when clicked
function searchBarHandeler(event) {
    console.log('Search bar pressed')
    const userName = searchBarEl.value;
    console.log(userName);
    // search bar needs to get value and then do a redirect with the value at the end of the routes
    // still need a back end route to search by user and test
    document.location.replace('/');
}

searchButtonEl.addEventListener('click', searchBarHandeler);