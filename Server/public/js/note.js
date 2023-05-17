var today = new Date();
var month = String(today.getMonth() + 1).padStart(2, '0');
var year = today.getFullYear();
let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
let d = new Date(year, mon);
document.getElementById('monthName').innerHTML = d.toLocaleString('default', { month: 'long' });
var dayCheck

const createCalendar = () => {
    fetch("https://UniversityTimetable:5000/timeT/note", /*TODO link*/{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => { return response.json() })
        .then(result => {
        }).catch(err => {
        })
    let table = '<table class="table table-hover"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    var days = document.getElementsByName("date");
    var daysArray = Array.from(days);
    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';

    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == mon) {
        var flag = true;
        for (var day of daysArray) {
            if (d.getDate() == day.outerText.split('-')[2]) {
                table += '<td style="border-radius: 50%;background-color: aquamarine; align-items: stretch;"><button onclick="checkBtn(' + d.getDate() + ')" style="width: 100%;border: none;background-color: transparent;">' + d.getDate() + '</button></td>';
                flag = false;
            }
        }
        if (flag) {
            table += '<td style="border-radius: 50%;align-items: stretch;"><button onclick="checkBtn(' + d.getDate() + ')" style="width: 100%;border: none;background-color: transparent;">' + d.getDate() + '</button></td>';
        }
        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    // закрыть таблицу
    table += '</tr></table>';

    document.getElementById('calendar').innerHTML = table;
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

function checkBtn(checkDay) {
    var days = document.getElementsByName("date");
    var daysArray = Array.from(days);
    var cnt = 0
    dayCheck = checkDay
    for (var day of daysArray) {
        if (day.outerText.split('-')[2] == dayCheck) {
            break;
        }
        cnt++;
    }
    if (document.getElementsByName("note")[cnt]) {
        var note = document.getElementsByName("note")[cnt].outerText;
        document.getElementById('noteText').value = note
    }
    else {
        document.getElementById('noteText').value = ""
    }
    document.getElementById('noteDiv').style = "visibility:visible"
}

async function doNote() {
    var days = document.getElementsByName("date");
    var daysArray = Array.from(days);
    var cnt = 0
    for (var day of daysArray) {
        if (day.outerText.split('-')[2] == dayCheck) {
            break;
        }
        cnt++;
    }
    if (document.getElementsByName("noteID")[cnt]) {
        if (document.getElementById('noteText').value == "") {
            fetch("https://UniversityTimetable:5000/timeT/doNote", /*TODO link*/{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(
                    {
                        id: document.getElementsByName("noteID")[cnt].outerText
                    })
            }).then(response => { return response.json() })
                .then(result => {
                    if (result.status === "not ok") {
                    }
                    if (result.status === "ok") {
                    }

                }).catch(err => {
                })
        }
        else {
            fetch("https://UniversityTimetable:5000/timeT/doNote", /*TODO link*/{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(
                    {
                        id: document.getElementsByName("noteID")[cnt].outerText,
                        note: document.getElementById("noteText").value,
                        date_time: document.getElementsByName("date")[cnt].outerText
                    })
            }).then(response => { return response.json() })
                .then(result => {
                    if (result.status === "not ok") {
                    }
                    if (result.status === "ok") {
                    }

                }).catch(err => {
                })
        }
    }
    else {
        var date = year + '-' + month + '-' + dayCheck
        fetch("https://UniversityTimetable:5000/timeT/doNote", /*TODO link*/{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    note: document.getElementById("noteText").value,
                    date_time: date
                })
        }).then(response => { return response.json() })
            .then(result => {
                if (result.status === "not ok") {
                }
                if (result.status === "ok") {
                }

            }).catch(err => {
            })
    }
    document.getElementById('noteDiv').style = "visibility:hidden"
    createCalendar();
    location.replace(location.href);
}
createCalendar();