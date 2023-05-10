const monitoring = (json, cont) => {
    let a = 0;
    let min = 71;
    let POIT = []
    for(let i=0; i<=40 ;i++){
        POIT[i] = 0
    }
    let ISIT = []
    for(let i=0; i<=40 ;i++){
        ISIT[i] = 0
    }
    let POIBMS = []
    for(let i=0; i<=40 ;i++){
        POIBMS[i] = 0
    }
    let DEIVI = []
    for(let i=0; i<=40 ;i++){
        DEIVI[i] = 0
    }
    json.forEach(chel => {
        chel.sum--
        a = Math.floor(chel.sum/10)
        if (chel.POIT ===1){
            POIT[a]++
        }
        if (chel.ISIT ===1){
            ISIT[a]++
        }
        if (chel.POIBMS ===1){
            POIBMS[a]++
        }
        if (chel.DEIVI ===1){
            DEIVI[a]++
        }
    })

    let type = ""
    if(cont === "budgetary"){
        type = "бюджета"
    }
    if(cont === "paid"){
        type = "платного"
    }

    let list = `<div id="belstu__monitoring__${cont}" class="text-for-table">Мониторинг ${type}:
                <table id="belstu__monitoring__table__${cont}"  class="table">
                <thead>
                    <tr>
                        <th class="specialization">Cпецуха</th>`
    for(let i=min; i<401 ;i = i + 10){
        list += `<th>${i} - ${i+9}</th>\n`
    }
    list += `</thead>`;
    list += `</tr>
            <tr>
                <td>ПОИТ</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<td>${POIT[i]}</td>\n`
    }
    list += `</tr>
            <tr>
                <td>ИСиТ</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<td>${ISIT[i]}</td>\n`
    }
    list += `</tr>
            <tr>
                <td>ПОИБМС</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<td>${POIBMS[i]}</td>\n`
    }
    list += `</tr>
            <tr>
                <td>ДЭиВИ</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<td>${DEIVI[i]}</td>\n`
    }
    list +=`</tr></table>`
    list +=`</div>`
    //console.log(list)
    return list
}

const GetRating = (cont) => {
    fetch("https://Eingeschriebener/belstu_fit/getrating", /*TODO link*/{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                contract : cont
            })
    })
        .then(response => {return response.json()})
        .then(result => {
            if(result.error){
                console.log("Dura")
                //window.location.href = '/belstu_fit/userinfo/add'
            }
            else {
                //console.log(result)
                //monitoring(result)
                if(cont === "budgetary"){
                    document.getElementById("monitoring_budgetary").innerHTML = monitoring(result, cont)
                }
                if(cont === "paid"){
                    document.getElementById("monitoring_paid").innerHTML = monitoring(result, cont)
                }

            }
        })
}

GetRating("budgetary")
GetRating("paid")

const checkUserFiling = () => {
    fetch("https://Eingeschriebener/belstu_fit/check_filing", /*TODO link*/{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(response => {return response.json()})
    .then(result => {
        console.log(result)
        switch (result.status) {
            case "Not authorized":
                document.getElementById("errorInput").innerHTML = "Для начала надо авторизоваться";
                break
            case "Not info about user":
                document.getElementById("errorInput").innerHTML = "Мы совсем про вас ничего не знаем, зайдите пожалуйста в личный кабинет";
                break
            case "Not all CT":
                document.getElementById("errorInput").innerHTML = "У вас не заполнены некоторые баллы за ЦТ, проверьте пожалуйста";
                break
            case "Has already":
                document.getElementById("errorInput").innerHTML = "Вы уже подали заявку, можете просмотреть её состояние в личном кабинете";
                break
            case "OK":
                window.location.href = '/belstu_fit/filing'
                break
            default:
                document.getElementById("errorInput").innerHTML = "Чёрт"/*"Я ваш рот ебал"*/;
                break
        }
    })
    .catch(err => {
        console.log(err.message)
    })
}

let checkbut = document.getElementById('submit_check_filing');
checkbut.addEventListener("click", checkUserFiling)
