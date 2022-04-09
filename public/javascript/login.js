// this gets connected to the handelbars file with a script tag

// login handler function
async function loginHandler(event) {
    event.preventDefault();

    const email  = document.querySelector('#email-login').value.trim();
    const password  = document.querySelector('#password-login').value.trim();
   

    if (email && password) {
        // the password is not making it through the checks of this back end route in the user-routes.js
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
        }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // document.location.reload('/');
            // can have a redirect to a page with a different buton instead of log insincwe user will already be logged in
            console.log('logged in');
            document.location.reload();
        } else {
            console.log(response.statusText + ' ' + response.status);
        }
        
    }

}




// listening for log in button click
document.querySelector('#login-btn').addEventListener('click', loginHandler);