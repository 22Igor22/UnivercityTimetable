let nameCheck = false
let surnameCheck = false
let middle_nameCheck = false
let birthdayCheck = false
let mailCheck = false
let phoneCheck = false

function checkName(str) {
    if (/^[А-Яа-я]+(((\'|\-|\.)?([А-Яа-я])+))?$/gm.test(str))
    {   document.getElementById("errorInputName").innerHTML = "";
        document.getElementsByName("name")[0].style.borderColor = "green";
        nameCheck = true;
    }
    else
    {
        document.getElementById("errorInputName").innerHTML = "Введено некорректное имя";
        document.getElementsByName("name")[0].style.borderColor = "red";
        nameCheck = false;
    }
}

function checkSurname(str) {
    if (/^[А-Яа-я]+(((\'|\-|\.)?([А-Яа-я])+))?$/gm.test(str))
    {   document.getElementById("errorInputSurname").innerHTML = "";
        document.getElementsByName("surname")[0].style.borderColor = "green";
        surnameCheck = true;
    }
    else
    {
        document.getElementById("errorInputSurname").innerHTML = "Введена некорректная фамилия";
        document.getElementsByName("surname")[0].style.borderColor = "red";
        surnameCheck = false;
    }
}

function checkMiddle_name(str) {
    if (/^[А-Яа-я]+(((\'|\-|\.)?([А-Яа-я])+))?$/gm.test(str))
    {   document.getElementById("errorInputMiddle_name").innerHTML = "";
        document.getElementsByName("middle_name")[0].style.borderColor = "green";
        middle_nameCheck = true;
    }
    else
    {
        document.getElementById("errorInputMiddle_name").innerHTML = "Введено некорректное отчество";
        document.getElementsByName("middle_name")[0].style.borderColor = "red";
        middle_nameCheck = false;
    }
}

function checkBirthday(date) {
    if (date < "2007-01-01" && date > "1922-01-01")
    {   document.getElementById("errorInputBirthday").innerHTML = "";
        document.getElementsByName("birthday")[0].style.borderColor = "green";
        birthdayCheck = true;
    }
    else
    {
        document.getElementById("errorInputBirthday").innerHTML = "Введён некорректный день рождения";
        document.getElementsByName("birthday")[0].style.borderColor = "red";
        birthdayCheck = false;
    }
}

function checkEmail(str) {
    if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/gm.test(str))
    {   document.getElementById("errorInputMail").innerHTML = "";
        document.getElementsByName("mail")[0].style.borderColor = "green";
        mailCheck = true;
    }
    else
    {
        document.getElementById("errorInputMail").innerHTML = "Введенна некорректная почта";
        document.getElementsByName("mail")[0].style.borderColor = "red";
        mailCheck = false;
    }
}

function checkPhone(str) {
    if (/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}/gm.test(str))
    {   document.getElementById("errorInputPhone").innerHTML = "";
        document.getElementsByName("phonenumber")[0].style.borderColor = "green";
        phoneCheck = true;
    }
    else
    {
        document.getElementById("errorInputPhone").innerHTML = "Введён некорректный номер телефона";
        document.getElementsByName("phonenumber")[0].style.borderColor = "red";
        phoneCheck = false;
    }
}

const addinfoUser = () =>{
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let middle_name = document.getElementById("middle_name").value;
    let address = document.getElementById("address").value;
    let birthday = document.getElementById("birthday").value;
    let mail = document.getElementById("mail").value;
    let phonenumber = document.getElementById("phonenumber").value;

    console.log(birthdayCheck)
    if(nameCheck&&surnameCheck&&middle_nameCheck&&birthdayCheck&&mailCheck&&phoneCheck){
        fetch("https://Eingeschriebener/belstu_fit/userinfo/add", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    name:name,
                    surname:surname,
                    middle_name:middle_name,
                    address:address,
                    birthday:birthday,
                    mail:mail,
                    phonenumber:phonenumber
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
                    window.location.href = '/belstu_fit/userinfo'
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

let addinfobut = document.getElementById('submit_addinfo');
addinfobut.addEventListener("click", addinfoUser)