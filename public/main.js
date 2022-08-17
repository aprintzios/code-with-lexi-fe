
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

setTimeout(()=> {
    let days = document.getElementsByClassName('react-calendar__month-view__days__day')
    days = [...days];
    days.forEach(elem => elem.style.color = "black")
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
}, 800);
// console.log(document.getElementById("root"))