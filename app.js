let dayNames = [];

const calendarTBody = document.getElementById('calendarTBody');
const todayDateDiv = document.getElementById('todayDate');
const currentMonthSpan = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const prevYearBtn = document.getElementById('prevYear');
const nextYearBtn = document.getElementById('nextYear');

const languageSelect = document.getElementById('comboBoxLanguage');

let cellDayNoElements;




let language = languageSelect.value || navigator.language;

// !! Her şey buna bağlı
let currentDate = new Date();

let today = new Date();

initCalendar();

function initCalendar() {
    addDayNamesToArray(language);
    //console.log(dayNames);
    updateCalendar(language);

    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));

    prevYearBtn.addEventListener('click', () => changeYear(-1));
    nextYearBtn.addEventListener('click', () => changeYear(1));

    languageSelect.addEventListener('change', updateLanguage);

    addClickEventToDayNo(language);

   
}

function updateLanguage() {
    language = languageSelect.value;
    dayNames = [];
    addDayNamesToArray(language);
    updateCalendar(language);

    addClickEventToDayNo(language);
}

function updateCalendar(selectedLanguage) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    console.log(year, month);

    currentMonthSpan.textContent = currentDate.toLocaleString(selectedLanguage, {day:'2-digit', month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(year, month, 1).getDay(); //? Ayın ilk günü haftanın hangi günü ?
    //console.log(`firstdayofmonth ${firstDayOfMonth}`);
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //? Ay içindeki toplam gün sayısı
    const daysInPrevMonth = new Date(year, month, 0).getDate(); //? Bir önceki ayın toplam gün sayısı


    let html = '';
    let dayCount = 1;
    let nextMonthDayCount = 1;

    for (let i = 0; i < 6; i++) {
        let rowHtml = '<tr>';

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                //ilk satırda önceki ayın günlerini şeffaf yap
            
                rowHtml += `<td class="solid-day dayNo previous">${daysInPrevMonth - firstDayOfMonth + j + 1}</td>`;
                 console.log(`j: ${j} | daysInPrevMonth: ${daysInPrevMonth} firstDayOfMonth: ${firstDayOfMonth} | daysInPrevMonth - firstDayOfMonth = ${daysInPrevMonth - firstDayOfMonth} -> + ${j} (j) + 1 =${daysInPrevMonth - firstDayOfMonth + j + 1}`);

            } else if (dayCount > daysInMonth) { // +31 ya da +30
               
                //console.log(`Day count: ${dayCount} nextMonthDayCount: ${nextMonthDayCount}`);
                rowHtml += `<td class="solid-day dayNo next">${nextMonthDayCount++}</td>`;
                
            } else { // [1-31] bas

                const isToday = (year === today.getFullYear() && month === today.getMonth() && dayCount === today.getDate());
                rowHtml += `<td class="${isToday ? 'today ' : ''}dayNo">${dayCount++}</td>`;
                
            }

        }

        rowHtml += '</tr>';
        html += rowHtml;
       
    }
    
    calendarTBody.innerHTML = '<tr id="dayNames"></tr>';
    addDayNamesToHtml(dayNames);
    calendarTBody.innerHTML += html;
    //addTodayDateToHtml(selectedLanguage);
    cellDayNoElements = document.querySelectorAll('.dayNo');
    
}

function addTodayDateToHtml(selectedLanguage) {
    const time = new Date();
    const dayNumber = time.toLocaleString(selectedLanguage, { 'day': "2-digit" });
    const month = time.toLocaleString(selectedLanguage, { month: 'long' });
    const year = time.getFullYear();
    const dayName = time.toLocaleString(selectedLanguage, { 'weekday': "long" });

    todayDateDiv.innerHTML = `${dayNumber} ${month} ${year} ${dayName}`;
}

function addDayNamesToArray(selectedLanguage) {
    for (let i = 0; i < 7; i++) {
        const anyDate = new Date(2024, 0, i);
        const dayName = anyDate.toLocaleString(selectedLanguage, { 'weekday': "long" });
        dayNames.push(dayName);
    }
}

function addDayNamesToHtml(dayNames) {
    const trTagForDayNames = document.getElementById('dayNames');
    trTagForDayNames.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        trTagForDayNames.innerHTML += `<th>${dayNames[i]}</th>`;
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);

    updateCalendar(language);

    addClickEventToDayNo(language);
}

function changeYear(direction) {
    currentDate.setFullYear(currentDate.getFullYear() + direction);

    updateCalendar(language);

    addClickEventToDayNo(language);
}


function addClickEventToDayNo(selectedLanguage){
let language = selectedLanguage;
   

    cellDayNoElements.forEach(element =>{
        element.addEventListener('click', (event,selectedLanguage) =>  {

           if (element.className.match('previous') ) {
            console.log("eşleşiyor p");
            changeMonth(-1,selectedLanguage);
            currentMonthSpan.textContent = event.target.innerText + " "+ currentDate.toLocaleString(language, {month: 'long', year: 'numeric' });

           }  
           else if(element.className.match('next')){
            console.log("eşleşiyor n");
            changeMonth(1,selectedLanguage);
            currentMonthSpan.textContent = event.target.innerText + " "+ currentDate.toLocaleString(language, {month: 'long', year: 'numeric' });
           }else{
            currentMonthSpan.textContent = event.target.innerText + " "+ currentDate.toLocaleString(language, {month: 'long', year: 'numeric' });

           }
        });
    });
}


