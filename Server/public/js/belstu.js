// window.onload = function (){ }
// const infoUser = () => {
//     fetch("https://Eingeschriebener/belstu_fit/userinfo", /*TODO link*/{
//         method : 'GET',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         }
//     }).then(response => {
//         console.log(response);return response.json()})
//         .then(result => {
//             if(result.error){
//                 //если гость
//                 if (result.error === 1){
//                     console.log("Надо авторизоваться")
//                     fetch("https://Eingeschriebener/auth/login", /*TODO link*/{
//                         method : 'GET',
//                         headers: {
//                             'Content-Type': 'text/plain'
//                         }
//                     }).then(response => {return response.text()})
//                         .then(result => {
//                             document.getElementsByClassName("useraccount")[0].innerHTML = result
//                         })
//                 }
//                 //если админ
//                 if (result.error === 2){
//                     //console.log("You are admin")
//                     document.getElementsByClassName("useraccount")[0].innerHTML = "You are admin"
//                 }
//             }
//         }).catch(err => {
//         console.log(err.message)
//     })
// }
//infoUser()
// json.forEach(univer => {
//     list += `<div class="container__list__univer">
//             <div class="container__list__univer__a" onclick="getUniver(${univer.id})">${univer.full_name}</div>`
//     univer.Faculty_data.forEach(fac => {
//         list += `<div class="container__list__univer">${fac.name}</div>`
//     })
//     list += `</div>`
// })



