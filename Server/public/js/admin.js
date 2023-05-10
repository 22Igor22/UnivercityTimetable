/*Кнопка админа на все одобренные заявки*/
let badApp = 0
const formationGoodApplications = (json, cont) => {
    let list = ""
    let contract
    if (cont === "budgetary"){
        contract = "бюджет"
    }
    else {
        contract = "платку"
    }

    if (json.length === 0){
        return `Пока никто не подал заявку на ${contract}`
    }
    list +=`<div id="admin_good_filing_${cont}">
                На ${contract}:
                <table id="admin_good_filing_${cont}_table" class="table">
                <thead>
                    <tr>
                        <th>№ дела</th>
                        <th>ФИО</th>
                        <th>М</th>
                        <th>Ф</th>
                        <th>Р</th>
                        <th>Атт</th>
                        <th>Сумма</th>
                        <th>ПОИТ</th>
                        <th>ИСиТ</th>
                        <th>ПОИБМС</th>
                        <th>ДЭиВИ</th>
                    </tr>
                </thead>`

    json.forEach(elem =>{
        console.log(elem)
        list += `<tbody>`
        elem.Overall_ratings.forEach(fil => {
            list += `<tr>
                    <td>${fil.file_number}</td>
                    <td>${elem.surname} ${elem.name} ${elem.middle_name}</td>
                    <td>${fil.math}</td>
                    <td>${fil.phys}</td>
                    <td>${fil.lang}</td>
                    <td>${fil.att}</td>
                    <td>${fil.sum}</td>
                    <td>${fil.POIT}</td>
                    <td>${fil.ISIT}</td>
                    <td>${fil.POIBMS}</td>
                    <td>${fil.DEIVI}</td>
        </tr>`
            list += `</tbody>`
        })

    })

    list += `</table></div>`
    //console.log(list)
    return list
}

const getGoogApplications = (cont) => {
    fetch("https://Eingeschriebener/belstu_fit/admin/all_good_application", /*TODO link*/{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                contract : cont
            })
    }).then(response => {return response.json()})
        .then(r => {
            if(r.error){
                console.log("Jopa")
                document.getElementById(`view__table__${cont}`).innerHTML = "Jopa"
            }
            else {
                //console.log(r)
                document.getElementById(`view__table__${cont}`).innerHTML = formationGoodApplications(r,cont)
            }

        })
        .catch(err => {
            console.log(err.message)
        })
}

const getAllGoodApplications = () => {
    getGoogApplications("budgetary")
    getGoogApplications("paid")
}

/*Кнопка админа на все Необработанные заявки*/
const formationBadApplications = (json, cont) => {
    let list = ""
    let contract
    if (cont === "budgetary"){
        contract = "бюджет"
    }
    else {
        contract = "платку"
    }

    if (json.length === 0){
        return `На ${contract} нет заявок для обработки`
    }
    list +=`<div id="admin_bad_application_${cont}">
                На ${contract}:
                <table id="admin_bad_application_${cont}_table" class="table">
                <thead>
                    <tr id="header_bad_table_${cont}">
                        <th>ФИО</th>
                        <th>М</th>
                        <th>Ф</th>
                        <th>Р</th>
                        <th>Атт</th>
                        <th>Сумма</th>
                        <th>ПОИТ</th>
                        <th>ИСиТ</th>
                        <th>ПОИБМС</th>
                        <th>ДЭиВИ</th>
                        <th>Действие</th>
                    </tr>
                </thead>`

    json.forEach(elem =>{
        console.log(elem)

        elem.Overall_ratings.forEach(fil => {
            badApp++

            let status = ""
            if(fil.file_number === "no number"){
                status = "Дать номер"
            }
            else {
                status = "Изменить номер"
            }
            list += `<tbody style="font-size: 14px">`;
            list += `<tr id="id_${fil.id}">
                <td>${elem.surname} ${elem.name} ${elem.middle_name}</td>
                <td>${fil.math}</td>
                <td>${fil.phys}</td>
                <td>${fil.lang}</td>
                <td>${fil.att}</td>
                <td>${fil.sum}</td>
                <td>${fil.POIT}</td>
                <td>${fil.ISIT}</td>
                <td>${fil.POIBMS}</td>
                <td>${fil.DEIVI}</td>
                <td class="td-button-table">                
                <button class="button-table-green button-table" onclick="approve_app(${fil.id})">${status}</button>
                <button class="button-table-red button-table" onclick="delete_app(${fil.id},'${cont}')">Удалить</button>
                </td>
        </tr>
<div id="form_approve${fil.id}"></div>`
            //console.log(fil.sum)
        })
    })
    list += `</tbody>`;
    list += `</table></div>`
    //console.log(list)
    return list
}

const getBadApplications = (cont) => {
    fetch("https://Eingeschriebener/belstu_fit/admin/all_bad_application", /*TODO link*/{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                contract : cont
            })
    }).then(response => {return response.json()})
        .then(r => {
            if(r.error){
                console.log("Jopa")
                document.getElementById(`view__table__${cont}`).innerHTML = "Jopa"
            }
            else {
                //console.log(r)
                document.getElementById(`view__table__${cont}`).innerHTML = formationBadApplications(r,cont)
            }

        })
        .catch(err => {
            console.log(err.message)
        })
}

const getAllBadApplications = () => {
    getBadApplications("budgetary")
    getBadApplications("paid")
}

const approve_app = (id) => {
    document.getElementById(`form_approve${id}`).innerHTML = `<form name="belstu_fit" action="/belstu_fit/admin/all_bad_application/approve" method="POST">
    <label for="id_app">Номер заявки:
        <input id="id_app" type="text" name="id_app" value="${id}" readonly>
    </label><br/><br/>
    <label for="file_number">Номер дела:
        <input id="file_number" type="text" name="file_number" placeholder="SS-NNN">
    </label><br/><br/>
    <div id="serving">
        <p id="errorInput"></p>
        <p id="error"></p>
    </div>
    <div>
        <input id="submit"  type="submit" name="offer"  value="Одобрить" style="background: #0B7FAB">
<!--        <button type="button" name="sign" value="SIGN UP" onclick="{document.auth.inputHide.value=this.value;document.auth.submit();}">Одобрить</button>-->
    </div>
</form>`
}

const delete_app = (id,cont) => {
    fetch("https://Eingeschriebener/belstu_fit/admin/all_bad_application/delete", /*TODO link*/{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                id : id
            })
    }).then(response => {return response.json()})
        .then(result => {
            //console.log(result)
            if(result.status === "not ok"){
                console.log("jopa")
            }
            if(result.status === "ok"){
                badApp--
                //console.log(badApp)
                if(badApp === 0 ){
                    document.getElementById(`id_${id}`).remove()
                    document.getElementById(`header_bad_table_${cont}`).remove()
                    let contract = ""
                    if (cont === "budgetary"){
                        contract = "бюджет"
                    }
                    else {
                        contract = "платку"
                    }
                    document.getElementById(`view__table__${cont}`).innerHTML = `На ${contract} нет заявок для обработки(((`
                }
                else{
                    document.getElementById(`id_${id}`).remove()
                }
            }
        })
        .catch(err => {
            console.log(err.message)
        })
}

