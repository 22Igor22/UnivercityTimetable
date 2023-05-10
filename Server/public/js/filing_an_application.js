// const sendApplication = () =>{
//     let login = document.getElementsByName("priority_poit").value;
//     let password = document.getElementById("password").value;
//
//     if(loginCheck&&passwordCheck){
//         fetch("https://Eingeschriebener/auth/login", /*TODO link*/{
//             method : 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify(
//                 {
//
//                 })
//         }).then(response => {return response.json()})
//             .then(result => {
//                 if(result.status === "not ok"){
//                     //console.log("kok")
//                     //document.getElementById("errorInput")[0].style.borderColor = "red";
//                     document.getElementById("errorInput").innerHTML = "Что-то хреново";
//                 }
//                 if(result.status === "ok"){
//                     //console.log("lpl")
//                     window.location.href = '/belstu_fit/userinfo'
//                     //redirect('/belstu_fit');
//                 }
//
//             }).catch(err => {
//             console.log(err)
//         })
//     }
//     else{
//         document.getElementById("error").innerHTML = "Введены некорректные данные";
//     }
//
// }
//
// let sendbut = document.getElementById('submit_send_application');
// sendbut.addEventListener("click", sendApplication)