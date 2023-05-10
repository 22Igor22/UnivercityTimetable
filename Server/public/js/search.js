let mathCheck = false
let physCheck = false
let langCheck = false
let attCheck = false

function checkMath(num) {
    if(num < 0 || num > 100)
    {
        document.getElementById("errorMath").innerHTML = "Таких баллов по математике не может быть";
        document.getElementsByName("math")[0].style.borderColor = "red";
        mathCheck = false;
    }
    else
    {
        document.getElementById("errorMath").innerHTML = "";
        document.getElementsByName("math")[0].style.borderColor = "green";
        mathCheck = true;
    }
}

function checkPhys(num) {
    if(num < 0 || num > 100)
    {
        document.getElementById("errorPhys").innerHTML = "Таких баллов по физике не может быть";
        document.getElementsByName("physics")[0].style.borderColor = "red";
        physCheck = false;
    }
    else
    {
        document.getElementById("errorPhys").innerHTML = "";
        document.getElementsByName("physics")[0].style.borderColor = "green";
        physCheck = true;
    }
}

function checkLang(num) {
    if(num < 0 || num > 100)
    {
        document.getElementById("errorLang").innerHTML = "Таких баллов по языку не может быть";
        document.getElementsByName("language")[0].style.borderColor = "red";
        langCheck = false;
    }
    else
    {
        document.getElementById("errorLang").innerHTML = "";
        document.getElementsByName("language")[0].style.borderColor = "green";
        langCheck = true;
    }
}

function checkAtt(num) {
    if(num < 0 || num > 100)
    {
        document.getElementById("errorAtt").innerHTML = "Таких баллов за аттестат не может быть";
        document.getElementsByName("certificate")[0].style.borderColor = "red";
        attCheck = false;
    }
    else
    {
        document.getElementById("errorAtt").innerHTML = "";
        document.getElementsByName("certificate")[0].style.borderColor = "green";
        attCheck = true;
    }
}

const send = () =>{
    const math = document.getElementById("math").value;
    const physics = document.getElementById("physics").value;
    const language = document.getElementById("language").value;
    const certificate = document.getElementById("certificate").value;
    let contact;

    document.getElementsByName("contact").forEach(elem => {
        if(elem.checked){
            contact = elem.value;
        }
    });

    console.log("M" + mathCheck)
    console.log("F" + physCheck)
    console.log("L" + langCheck)
    console.log("A" + attCheck)
    if(mathCheck&&physCheck&&langCheck&&attCheck){
        //fetch("https://localhost:443/univers/offer", /*TODO https*/{
        fetch("https://Eingeschriebener/univers/offer", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    math : math,
                    physics: physics,
                    language: language,
                    certificate: certificate,
                    contact: contact
                })
        }).then(response => {return response.json()})
            .then(result => {
                if(result.error){
                    //console.log(result.error)
                    document.getElementById("container__list").innerText = result.error;
                }else {
                    document.getElementById("container__list").innerHTML = builderList(result)
                }
            }).catch(err => {
            console.log(err)
        })
    }
    else{
        document.getElementById("error").innerHTML = /*"Данные введены некорректно"*/"Ты глупенький??? Проверь, что ты ввёл";
    }

}
const getAll = () =>{
    //fetch("https://localhost:443/univers/offer", /*TODO https*/{
    fetch("https://Eingeschriebener/univers/offer", /*TODO link*/{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {return response.json()})
        .then(result => {
            if(result.error){
                console.log(result.error)
            }else {
                //console.log(result)
                document.getElementById("container__list").innerHTML = builderList(result)
            }
        }).catch(err => {
        console.log(err)
    })
}

const getUniver = (id) => {
    console.log(`${id} univer`)
    fetch(`https://Eingeschriebener/univers/offer/${id}`, /*TODO link*/{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {return response.json()})
        .then(result => {
            if(result.error){
                console.log(result.error)
                document.getElementsByClassName("search")[0].innerHTML = `<div class="info__univer">К сожалению про этот универ мы ещё не всё узнали</div>`
            }else {
                //console.log(result)
                document.getElementsByClassName("search")[0].innerHTML = builderUniverPage(result)
            }
        }).catch(err => {
        console.log(err)
    })
}

const builderList = (json) => {
    let list = "";
    json.forEach(univer => {
        list += `<div class="container__list__univer">
            <div class="container__list__univer__a" onclick="getUniver(${univer.id})">${univer.full_name}</div>`
        univer.Faculty_data.forEach(fac => {
            list += `<div class="container__list__univer">${fac.name}</div>`
        })
        list += `</div>`
    })
    console.log(list)
    return list
}

const builderUniverPage = (json) => {
    let list = ""
    json.forEach(univer => {
        list += `<div class="info__univer">
                    <div class="info__univer__name"><h1>${univer.full_name}</h1></div>
                    <div class="info__univer__link"><a href="${univer.link}" >${univer.link}</a></div>`

        univer.Faculty_data.forEach(faculty => {
            console.log(faculty)
            list += `<div class="info__univer__faculty"><h2>${faculty.name}</h2></div>`

            faculty.Speciality_data.forEach(speciality => {
                console.log(speciality.Entry_thresholds)
                list += `<div class="info__univer__faculty__speciality"><h3>Специальность: ${speciality.full_name}</h3></div>
                         <div class="info__univer__faculty__qualification"><h3>Квалификация: ${speciality.specification}</h3></div>
                         <div class="info__univer__faculty__qualification"><h3>Проходные баллы: </h3></div>`

                speciality.Entry_thresholds.forEach(marks => {
                    console.log(marks)
                    list += `<div>
                             <table class="info__univer__faculty__speciality_table">
                                <tr>
                                    <th>Тип договора</th>
                                    <th>2021</th>
                                    <th>2020</th>
                                </tr>
                                <tr>
                                    <td>Бюджет</td>
                                    <td>${marks.budgetary2021}</td>
                                    <td>${marks.budgetary2020}</td>
                                </tr>
                                <tr>
                                    <td>Платное</td>
                                    <td>${marks.paid2021}</td>
                                    <td>${marks.paid2020}</td>
                                </tr>
                             </table>
                    </div>`
                })
            })
        })
        list +=`</div>`
    })
    console.log(json)
    return list;
}


const pizdec = () => {
  document.getElementsByClassName("search")[0].innerHTML = `When pizdec was be here`
}