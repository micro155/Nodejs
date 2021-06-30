const calendar = document.querySelector("#calendar");

const isWeekend = day => {
    if(day == 6 || day == 0) {
        dayType = 'weekend';
    } else {
        dayType = 'weekday';
    }
    return dayType;
}

const today = new Date();

today.setMonth(today.getMonth() + 1);


const setCalendarData = (year, month) => {
    // 빈 문자열을 만들어줍니다.
    let calHtml = "";
    // getMonth(): Get the month as a number (0-11)
    // month 인자는 getMonth로 구한 결과 값에 1을 더한 상태이므로 다시 1을 뺀 값을 Date 객체의 인자로 넘겨줍니다. 그러면 오늘 날짜의 Date 객체가 반환됩니다.
    const setDate = new Date(year, month - 1, 1);
    
    // getDate(): Get the day as a number (1-31)
    // 이번 달의 첫째 날을 구합니다.
    const firstDay = setDate.getDate();
    
    // getDay(): Get the weekday as a number (0-6)
    // 이번 달의 처음 요일을 구합니다.
    const firstDayName = setDate.getDay();
    
    // new Date(today.getFullYear(), today.getMonth(), 0);
    // Date객체의 day 인자에 0을 넘기면 지난달의 마지막 날이 반환됩니다.
    // new Date(today.getFullYear(), today.getMonth(), 1);
    // Date객체의 day 인자에 1을 넘기면 이번달 첫째 날이 반환됩니다.
    // 이번 달의 마지막 날을 구합니다.
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();  
    
    
    // 매월 일수가 달라지므로 이번 달 날짜 개수를 세기 위한 변수를 만들고 초기화합니다.
    let startDayCount = 1;
    let lastDayCount = 1;
    
    calendar.insertAdjacentHTML("beforeend", `<div class='month'><b>${today.getMonth() + 1}월</b></div>`)
    
    // 1~6주차를 위해 6번 반복
    for (let i = 0; i < 6; i++) {
        // 일요일~토요일을 위해 7번 반복
        for (let j = 0; j < 7; j++) {            
            if (i == 0 && j < firstDayName) {                
                dayHtml = `<div class='day not_this_month'><span id='not_this_month'></span></div>`                
                calendar.insertAdjacentHTML("beforeend", dayHtml);
                
            }
            else if (i >= 0 && startDayCount <= lastDay) {
                const dayType = isWeekend(j);
                // 캘린더 div 태그에 내용 붙임
                dayHtml = `<div class='day ${dayType}'><span id='${dayType}-${year}${month}${setFixDayCount(startDayCount)}'>${startDayCount}</span></div>`
                startDayCount++;
                calendar.insertAdjacentHTML("beforeend", dayHtml);
                
            }
        }
    }
};

const setFixDayCount = number => {
  let fixNum = "";
  if (number < 10) {
    fixNum = "0" + number;
  } else {
    fixNum = number;
  }
  return fixNum;
};

if (today.getMonth() + 1 < 10) {
  setCalendarData(today.getFullYear(), "0" + (today.getMonth() + 1));
} else {
  setCalendarData(today.getFullYear(), "" + (today.getMonth() + 1));
}



var selected_dates = [];

document.querySelectorAll("#calendar .day").forEach(day => {
    day.addEventListener("click", event => {
        tmp_selected = event.currentTarget.innerHTML;
        tmp_id = tmp_selected.split('"')[1];
        day_type = tmp_id.split('-')[0];
        selected_date = tmp_id.split('-')[1];
        
        selected_date = selected_date.substring(0,4) + '-' + selected_date.substring(4,6) + '-' + selected_date.substring(6,8);

        
        if (day_type == 'weekday') {
            event.currentTarget.classList.toggle("selected");

            const index = selected_dates.indexOf(selected_date);
            if (index > -1) {
              selected_dates.splice(index, 1);
            } else {
                selected_dates.push(selected_date);           
            }
            
        }
    });
});


function showSelected() { 
    
    var dates = [];
    
    for (var i=0; i<5; i++) {
       dates[i] = selected_dates[i];
    }
    
    alert('날짜 선택이 완료 되었습니다.');
    
    document.frm.date1.value = dates[0];
    document.frm.date2.value = dates[1];
    document.frm.date3.value = dates[2];
    document.frm.date4.value = dates[3];
    document.frm.date5.value = dates[4];
    

}


function getSelectedDates() {

    return selected_dates;
}
function apply(selected_dates) {
    
}

