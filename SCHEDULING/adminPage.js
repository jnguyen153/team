
// going to test the google login API on another project before I implement it here
// window.onload = function () {
//     google.accounts.id.initialize({
//         client_id: "",
//         callback: ""
//     }); 
//     google.accounts.id.prompt();
// }; 

// takes input in username and password fields to attempt to sign in
function signIn() {
    username = document.querySelector('#username').value;
    password = document.querySelector('#password').value; 

    if (username == "") {
        alert("Must input a username");
    } 
    if (password == "") {
        alert("Must input a password")
    }


} 


