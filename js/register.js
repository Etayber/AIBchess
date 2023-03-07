//const reg = require('./authentication.js');

function GetMethod(){
    fetch('http://localhost:3000/').then(res => res.json()).then(res =>{
        console.log(res);
    });
}
GetMethod();
function Register(){
    em = document.getElementById("email").value;
    ps = document.getElementById("password").value;
    ph = document.getElementById("phone").value;

    const data = { email: em,password: ps,phone: ph};

    fetch('http://localhost:3000/post', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

