let loginCheck = true;
let groupIDCheck = true;

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

function checkGroupID(str) {
    document.getElementById("error").innerHTML = "";
    if (0 < parseInt(str, 10) && parseInt(str, 10) < 10) {
        document.getElementById("errorInput").innerHTML = "";
        groupIDCheck = true
    } else {
        document.getElementById("errorInput").innerHTML = "Non-existent group";
        groupIDCheck = false
    }
}

const updUser = () =>{
    let login = document.getElementById("login").value;
    let groupID = document.getElementById("groupID").value;
    if(loginCheck&&groupIDCheck){
        fetch("https://UniversityTimetable:5000/user/updInfo", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    login : login,
                    groupID: groupID
                })
        }).then(response => {return response.json()})
            .then(result => {
                if(result.status === "not ok"){
                    document.getElementById("error").innerHTML = "Wrong data";
                }
                if(result.status === "ok"){
                    window.location.href = '/user/checkInfo'
                }

            }).catch(err => {
            console.log(err)
        })
    }
    else {
        document.getElementById("error").innerHTML = "Incorrect data entered";
    }

}

document.getElementById('submit_upd').addEventListener("click", updUser)