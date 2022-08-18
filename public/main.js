let loaderDiv;
let calDiv;
let timeDiv;
let selectedDate;
let selectedDateObj = {};
let bookNowBtn;

function loaderStyle(){
    setTimeout(()=>{
        loaderDiv = document.getElementById("loader");
        calDiv = document.getElementById("calWrapper");
        timeDiv = document.getElementById("timeDiv");
        bookNowBtn = document.getElementById("bookNowBtn")
        calDiv.style.display = 'flex';
        loaderDiv.style.display = 'none';    
    }, 800);
}
function resetStyle(){
    calDiv.style.display = 'none';
    loaderDiv.style.display = 'flex';  
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

setTimeout(() => {
    let navArrows = document.getElementsByClassName('react-calendar__navigation__arrow');
    navArrows = [...navArrows]
    console.log(navArrows)
    navArrows.forEach(arrow => arrow.addEventListener('click', () => {
        timeDiv.innerHTML = ""
        resetStyle();
        loaderStyle();
        styleCalendar();
    }))
}, 100)


function styleCalendar(){
    setTimeout(()=> {
        let days = document.getElementsByClassName('react-calendar__month-view__days__day')
        days = [...days];
        let sessionEl = document.getElementById('sessions')
        //get unique days from sessions
        let sessionDateandTime = JSON.parse(sessionEl.value);
        
        sessionDays = sessionDateandTime.map(elem => elem.date)
        let availableDays = sessionDays.filter(onlyUnique);
        console.log("available days before map", availableDays)
        availableDays.forEach(elem => {
            selectedDateObj[elem.substring(0,10)] = []
        })
        sessionDateandTime.map(elem => selectedDateObj[elem.date.substring(0,10)].push(elem.time))
        for (let key in selectedDateObj) {
            selectedDateObj[key] = selectedDateObj[key].sort()
        }
        // console.log(selectedDateObj)
        // if (selectedDate) {

        //     console.log("selectedDate", selectedDate, new Date(selectedDate).toString().substring(0,10), new Date(selectedDate).toISOString())
        // }
        // timeDiv.innerHTML = selectedDateObj[selectedDate]
        availableDays = availableDays.map(elem => elem.substring(0,10));
        console.log(availableDays, "available days after map")
        days.forEach(elem => {
            elem.style.color = "black"
            elem.addEventListener('click', (e) => {
                selectedDate = e.target.ariaLabel;
                selectedDate = new Date(selectedDate).toISOString().substring(0,10);
                let selectedTime;
                let availableTimes = selectedDateObj[selectedDate]
                // console.log('selectedDateObj', selectedDateObj)
                // console.log("available times", availableTimes)
                console.log(!availableTimes)
                if (!availableTimes) { 
                    timeDiv.innerHTML = "No Available Times :(" 
                } else {
                    if (timeDiv.innerHTML) timeDiv.innerHTML = ""
                    availableTimes.forEach(time => {
                        let childDiv = document.createElement('div')
                        childDiv.onclick = (e) => {
                            timeDiv.childNodes.forEach(node => {
                                node.style.backgroundColor = "white"
                                node.style.color = 'magenta'
                            })
                            e.target.style.backgroundColor = 'pink'
                            e.target.style.color = 'white'
                            selectedTime = e.target.innerHTML
                            bookNowBtn.value = JSON.stringify([selectedDate, selectedTime])
                        }
                        childDiv.innerHTML = time
                        childDiv.className="availableTimes"
                        timeDiv.appendChild(childDiv)
                    })
                }
                // timeDiv.innerHTML = availableTimes
                // console.log("selected Date in click", selectedDate);
            })
        })
        days.forEach(day => {
            // console.log(new Date([...day.children][0].ariaLabel))
            // new Date([...day.children][0].ariaLabel).toString().substring(0,15),availableDays[0])
            // console.log(availableDays.includes(new Date([...day.children][0].ariaLabel)))
            // console.log("allDays", new Date([...day.children][0].ariaLabel).toString().substring(4,15))
            // console.log(availableDays, "availableDays")
            if (availableDays.includes(new Date([...day.children][0].ariaLabel).toISOString().substring(0,10))) {
                day.style.color = 'magenta';
                day.style.fontWeight = 'bold';
            }
        })
    }, 600);
}
loaderStyle();
styleCalendar();

//change all bgs to white
//get selected date element and change element background to light pink
//get selected date element and retrieve date then find all items in the sessions array that match that date
//display all times from the matched sessions in the sessiontimes div