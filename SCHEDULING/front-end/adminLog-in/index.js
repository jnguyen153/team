
// receives response from the user
function handleCredentialResponse(response) {
    const credential = response.credential; 
    const decodedToken = parseJwt(credential);
    // console.log("User Info: ", decodedToken);

    // sending the request to the back-end, and authenticating the user back there
    fetch ('https://student-scheduling-log-in-240e02feea96.herokuapp.com/api/login', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({token: response.credential})
    }) 
    .then (res => {
        if (!res.ok) throw new Error("Server returned error");
        return res.json()
    })
    .then (data => {
        console.log("Backend Response:", data); 
        // redirect to landing site if successfull 
        if (data.success) {
            window.location.href = "http://localhost:3000/admin/students";
        } else {
            alert("The authentication failed");
        }
    }) 

    .catch(err => console.log(err));
}  

function parseJwt(token) {
    let base64Url = token.split('.')[1]; 
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); 

    return JSON.parse(jsonPayload);
} 

// console.log(window.location.origin);