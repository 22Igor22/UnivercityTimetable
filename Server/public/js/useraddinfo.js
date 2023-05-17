let loginCheck = false
let groupIDCheck = false

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

function checkGroupID(str) {
    if (0<parseInt(str, 10)<10) {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        document.getElementsByName("repeat")[0].style.borderColor = "green";
        groupIDCheck = true
    } else {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("groupID")[0].style.borderColor = "red";
        document.getElementsByName("groupID")[0].style.borderColor = "red";
        groupIDCheck = false
    }
}

const updInfoUser = () =>{
    let login = document.getElementById("login").value;
    let groupID = document.getElementById("groupID").value;

    if(loginCheck&&groupIDCheck){
        fetch("https://UniversityTimetable:5000/user/userInfo/upd", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    login:login,
                    groupID:groupID,
                })
        }).then(response => {return response.json()})
            .then(result => {
                if(result.status === "not ok"){
                    //console.log("kok")
                    //document.getElementById("errorInput")[0].style.borderColor = "red";
                    document.getElementById("error").innerHTML = "Что-то не так, попоробуй заново";
                }
                if(result.status === "ok"){
                    //console.log("lpl")
                    window.location.href = '/user/userInfo'
                    //redirect('/belstu_fit');
                }

            }).catch(err => {
                console.log(err)
        })
    }
    else {
        document.getElementById("error").innerHTML = "Введены некорректные данные";
    }

}

let updInfo = document.getElementById('submit_upd');
updInfo.addEventListener("click", updInfoUser)