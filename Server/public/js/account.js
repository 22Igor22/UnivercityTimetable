
let changeMarksList = `<form name="belstu_fit" action="/belstu_fit/userinfo/marks" method="POST">
    <label for="math">Математика:
        <input id="math" type="number" max="100" min="0" name="math" placeholder="0" value="0">
    </label><br/><br/>

    <label for="Physics"> Физика:
        <input id="physics" type="number" max="100" min="0" name="physics" placeholder="0" value="0">
    </label><br/><br/>

    <label for="Language"> Русский/белорусский:
        <input id="language" type="number" max="100" min="0" name="language" placeholder="0" value="0">
    </label><br/><br/>

    <label for="Certificate"> Балл за аттестат:
        <input id="certificate" type="number" max="100" min="0" name="certificate" placeholder="0" value="0">
    </label><br/><br/>

    <div>
        <input id="submit" type="submit" name="offer"  value="Сохранить">
    </div>
</form>
or<br/>
<button onclick="window.location.href = 'https://Eingeschriebener/belstu_fit/userinfo'">Назад</button>`

let changeApplicationList = `<form name="belstu_fit" action="/belstu_fit/userinfo/change_filing" method="POST">
    <div id="priority">Расставтье приоритеты, по принципу: на какую специальность больше хочу, та 1 и т.д.
        <div id="priority__POIT">ПОИТ:
            <span>
        <input id="poit1" type="radio" name="priority_poit" value="1" required checked>
        <label for="poit1">1</label>
    </span>
            <span>
        <input id="poit2" type="radio" name="priority_poit" value="2" required checked>
        <label for="poit2">2</label>
    </span>
            <span>
        <input id="poit3" type="radio" name="priority_poit" value="3" required checked>
        <label for="poit3">3</label>
    </span>
            <span>
        <input id="poit4" type="radio" name="priority_poit" value="4" required checked>
        <label for="poit4">4</label>
    </span>
            <span>
        <input id="poit0" type="radio" name="priority_poit" value="0" required checked>
        <label for="poit0">Не рассматриваю</label>
    </span>
        </div>

        <div id="priority__ISIT">ИСиТ:
            <span>
        <input id="isit1" type="radio" name="priority_isit" value="1" required checked>
        <label for="isit1">1</label>
    </span>
            <span>
        <input id="isit2" type="radio" name="priority_isit" value="2" required checked>
        <label for="isit2">2</label>
    </span>
            <span>
        <input id="isit3" type="radio" name="priority_isit" value="3" required checked>
        <label for="isit3">3</label>
    </span>
            <span>
        <input id="isit4" type="radio" name="priority_isit" value="4" required checked>
        <label for="isit4">4</label>
    </span>
            <span>
        <input id="isit0" type="radio" name="priority_isit" value="0" required checked>
        <label for="isit0">Не рассматриваю</label>
    </span>
        </div>

        <div id="priority__POIBMS">ПОИБМС:
            <span>
        <input id="poibms1" type="radio" name="priority_poibms" value="1" required checked>
        <label for="poibms1">1</label>
    </span>
            <span>
        <input id="poibms2" type="radio" name="priority_poibms" value="2" required checked>
        <label for="poibms2">2</label>
    </span>
            <span>
        <input id="poibms3" type="radio" name="priority_poibms" value="3" required checked>
        <label for="poibms3">3</label>
    </span>
            <span>
        <input id="poibms4" type="radio" name="priority_poibms" value="4" required checked>
        <label for="poibms4">4</label>
    </span>
            <span>
        <input id="poibms0" type="radio" name="priority_poibms" value="0" required checked>
        <label for="poibms0">Не рассматриваю</label>
    </span>
        </div>

        <div id="priority__DEIVI">ДЭиВИ:
            <span>
        <input id="deivi1" type="radio" name="priority_deivi" value="1" required checked>
        <label for="deivi1">1</label>
    </span>
            <span>
        <input id="deivi2" type="radio" name="priority_deivi" value="2" required checked>
        <label for="deivi2">2</label>
    </span>
            <span>
        <input id="deivi3" type="radio" name="priority_deivi" value="3" required checked>
        <label for="deivi3">3</label>
    </span>
            <span>
        <input id="deivi4" type="radio" name="priority_deivi" value="4" required checked>
        <label for="deivi4">4</label>
    </span>
            <span>
        <input id="deivi0" type="radio" name="priority_deivi" value="0" required checked>
        <label for="deivi0">Не рассматриваю</label>
    </span>
        </div>
    </div>

    <div id="serving">
        <p id="errorInput"></p>
        <p id="error"></p>
    </div>

    <input type="hidden" name="inputHide" />
    <div>
        <input id="change_info_submit" class="change_info_submit" type="submit" name="offer"  value="Change">
    </div>
</form>`

/*
const userpage = () => {
    fetch("https://Eingeschriebener/belstu_fit/userinfo/data", /!*TODO link*!/{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {return response.json()})
        .then(result => {
            if(result.error === "noinfo"){
                console.log("Dura")
                window.location.href = '/belstu_fit/userinfo/add'
            }
            else {
                //console.log(result)
                document.getElementsByClassName("useraccount")[0].innerHTML = userData(result)
            }
        })
}
*/

/*const your_application = () => {
    fetch("https://Eingeschriebener/belstu_fit/userinfo/application", /!*TODO link*!/{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {return response.json()})
        .then(result => {
            if(result.error === "noinfo"){
                console.log("Dura")
                document.getElementById("your_application").innerHTML = `<div id="your_application_wow">
                    Вы ещё не подавали заявку(
                </div>`
                //window.location.href = '/belstu_fit/userinfo/marks'
            }
            else {
                //console.log(result)
                document.getElementById("your_application").innerHTML = userApp(result)
            }
        })
}*/
/*
const userData = (jsonArr) => {
    let json = jsonArr[0];
    let date = new Date(json.date_of_birth);
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let list = ""
    list += `<div class="userinfo__data">
            <div class="userinfo__data__fio" style="font-size: 30px">${json.surname} ${json.name} ${json.middle_name}</div>
            <div class="userinfo__data__birthday" style="font-size: 18px">День рождения: ${day}.${month+1}.${year}</div>
            <div class="userinfo__data__address" style="font-size: 18px">Адрес: ${json.address}</div>
            <div class="userinfo__data__mail" style="font-size: 18px">Почта: ${json.mail}</div>
            <div class="userinfo__data__number" style="font-size: 18px">Номер телефона: ${json.number}</div>
            </div>`
    list += `<div id="userinfo__marks">Баллы: `
    json.Users_marks.forEach(mark => {
        if(mark.math !== 0 || mark.phys !== 0 || mark.lang !== 0 || mark.att !== 0){
            if(mark.math !== 0){
                list += `<div class="userinfo__data__mail" style="font-size: 18px">Математика: ${mark.math}</div>`
            }
            if(mark.phys !== 0){
                list += `<div class="userinfo__data__mail" style="font-size: 18px">Физика: ${mark.phys}</div>`
            }
            if(mark.lang !== 0){
                list += `<div class="userinfo__data__mail" style="font-size: 18px">Русский/белорусский: ${mark.lang}</div>`
            }
            if(mark.att !== 0){
                list += `<div class="userinfo__data__mail" style="font-size: 18px">Аттестат: ${mark.att}</div>`
            }
            list += `<div class="upd_CT">
                        <button onclick="changeMarks()/!*window.location.href = 'https://Eingeschriebener/belstu_fit/userinfo/marks';*!/">Добавить/изменить</button>
                    </div>`
        }
        else{
            list +=` не заполнено `
            list += `<div class="upd_CT">
                        <button onclick= "changeMarks()"><!--"window.location.href = 'https://Eingeschriebener/belstu_fit/userinfo/marks';"-->Добавить</button>
                    </div>`
        }
        list += `</div>`
    })
    // if(json.Overall_ratings.length !=0){
    //     json.Overall_ratings.forEach(over => {
    //         console.log(over.id_user)
    //         list +=`<div id="your_application">
    //                 Ваша заявка:
    //                     Ваши баллы: ${over.sum}
    //                     Приоритеты:
    //                         ПОИТ: ${over.POIT}
    //                         ИСИТ: ${over.ISIT}
    //                         ПОИБмС: ${over.POIBMS}
    //                         ДЭиВИ: ${over.DEIVI}
    //             </div>`
    //     })
    // }
    // else {
    //     list +=`<div id="your_application">
    //                 Вы ещё не подавали заявку(
    //             </div>`
    //
    // }
    list += `<div id="your_application"></div>`
    your_application()
    return list
}*/

const changeMarks = () => {
    //require('fs').readFile("../../views/usersMarks.html", "utf8", text =>{
    //document.getElementById("userinfo__marks").innerHTML = text
    //})
    document.getElementById("userinfo__marks").innerHTML = changeMarksList

}
const changePriority = () => {
    //require('fs').readFile("../../views/usersMarks.html", "utf8", text =>{
    //document.getElementById("userinfo__marks").innerHTML = text
    //})
    document.getElementById("your_application").innerHTML = changeApplicationList

}
/*
const userApp = (jsonArr) => {
    let json = jsonArr[0];
    let list = ""
    ////console.log(json)
    if(json.Overall_ratings.length !== 0){
        json.Overall_ratings.forEach(over => {
            ////console.log(over.sum + over.POIT)
            let status = ""
            if(over.confirm){
                status = `Участвует в конкурсе<br/>
                            Номер дела:${over.file_number}`
            }
            else {
                status = "В обработке"
            }
            list +=`<div id="your_application_wow">
                    Ваша заявка:<br/>
                        Ваши баллы: ${over.sum}<br/>
                        Приоритеты:<br/>
                            ПОИТ: ${over.POIT}<br/>
                            ИСИТ: ${over.ISIT}<br/>
                            ПОИБмС: ${over.POIBMS}<br/>
                            ДЭиВИ: ${over.DEIVI}<br/>
                        Статус: ${status}<br/>
                </div>`
            list +=`<div class="upd_App">
                        <button onclick= "changePriority()"><!--"window.location.href = 'https://Eingeschriebener/belstu_fit/userinfo/marks';"-->Поменять приоритеты</button>
                    </div>`
        })
    }
    // else {
    //     list +=`<div id="your_application_wow">
    //                 Вы ещё не подавали заявку(
    //             </div>`
    //
    // }
    return list;
}
*/
/*

userpage()
*/

