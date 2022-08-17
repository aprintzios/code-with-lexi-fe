
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

setTimeout(() => {
    let navArrows = document.getElementsByClassName('react-calendar__navigation__arrow');
    navArrows = [...navArrows]
    console.log(navArrows)
    navArrows.forEach(arrow => arrow.addEventListener('click', () => styleCalendar()))
}, 100)


function styleCalendar(){
    setTimeout(()=> {
        let days = document.getElementsByClassName('react-calendar__month-view__days__day')
        days = [...days];
        days.forEach(elem => {
            elem.style.color = "black"
        })
        let sessionEl = document.getElementById('sessions')
        //get unique days from sessions
        let sessionDays = JSON.parse(sessionEl.value);
        sessionDays = sessionDays.map(elem => elem.date)
        let availableDays = sessionDays.filter(onlyUnique);
        availableDays = availableDays.map(elem => (new Date(elem)).toString().substring(0,15));
        days.forEach(day => {
            // console.log(new Date([...day.children][0].ariaLabel))
            // new Date([...day.children][0].ariaLabel).toString().substring(0,15),availableDays[0])
            // console.log(availableDays.includes(new Date([...day.children][0].ariaLabel)))
            if (availableDays.includes(new Date([...day.children][0].ariaLabel).toString().substring(0,15))) {
                day.style.color = 'magenta';
                day.style.fontWeight = 'bold';
            }
        })
    }, 250);
}

styleCalendar()

//change all bgs to white
//get selected date element and change element background to light pink
//get selected date element and retrieve date then find all items in the sessions array that match that date
//display all times from the matched sessions in the sessiontimes div