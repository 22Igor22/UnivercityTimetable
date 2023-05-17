let loginCheck = false;
let passwordCheck = false;

function checkLogin(str) {
    document.getElementById("error").innerHTML = "";
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Login must be more than 4 characters";
        loginCheck = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        loginCheck = true;
    }
}

function checkPassword(str) {
    document.getElementById("error").innerHTML = "";
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Password must be more than 4 characters";
        passwordCheck = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        passwordCheck = true;
    }
}

const loginUser = () =>{
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    if(loginCheck&&passwordCheck){
        fetch("https://UniversityTimetable:5000/auth/login", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    login : login,
                    password: password
                })
        }).then(response => {return response.json()})
            .then(result => {
                if(result.status === "not ok"){
                    document.getElementById("errorInput").innerHTML = "Wrong login or password";
                }
                if(result.status === "user"){
                    window.location.href = '/user/checkInfo'
                }
                else if(result.status === "admin"){
                    window.location.href = '/timeT/timetable'
                }

            }).catch(err => {
            console.log(err)
        })
    }
    else{
        document.getElementById("error").innerHTML = "Incorrect data entered";
    }
}

let loginbut = document.getElementById('submit');
loginbut.addEventListener("click", loginUser)