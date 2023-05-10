let loginCheck = false;
let passwordCheck = false;

function checkLogin(str) {
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Login must be more than 4 characters";
        document.getElementsByName("login")[0].style.borderColor = "red";
        loginCheck = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("login")[0].style.borderColor = "green";
        loginCheck = true;
    }
}

function checkPassword(str) {
    if(str.length < 8)
    {
        document.getElementById("errorInput").innerHTML = "Password must be more than 8 characters";
        document.getElementsByName("password")[0].style.borderColor = "red";
        passwordCheck = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        passwordCheck = true;
    }
}

const loginUser = () =>{
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    if(loginCheck&&passwordCheck){
        fetch("https://Eingeschriebener/auth/login", /*TODO link*/{
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
                    //console.log("kok")
                    //document.getElementById("errorInput")[0].style.borderColor = "red";
                    document.getElementById("errorInput").innerHTML = "Неверный логин или пароль";
                }
                if(result.status === "ok"){
                    //console.log("lpl")
                    window.location.href = '/belstu_fit/userinfo'
                    //redirect('/belstu_fit');
                }

            }).catch(err => {
            console.log(err)
        })
    }
    else{
        document.getElementById("error").innerHTML = "Введены некорректные данные";
    }
}

let loginbut = document.getElementById('submit_login');
loginbut.addEventListener("click", loginUser)
