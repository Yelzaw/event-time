//Calendar for Main Page
document.addEventListener("DOMContentLoaded", function () {
  var eventsData = [];
  dbEvents()
  .then((data)=>{
    console.log(data); 
    for(let i=0; i < data.length; i++){
      eventsData.push({id:data[i].id,title:data[i].title,start:data[i].date,url:window.location+'event/'+data[i].id})
    }
    
  var calendarEl = document.getElementById("calendar");  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    timeZone: 'UTC',
    events: eventsData,

    eventClick: function (info) {
      info.jsEvent.preventDefault();

      if (info.event.url) {
        window.open(info.event.url);
      }
    }
    
  });
  console.log(eventsData)
  calendar.render();
  // console.log(info.event.url)  
  });
});

const dbEvents = async ()=>{
  const result = await fetch('/events', {
    method: 'GET',
  });
  const json = await result.json();
  return json;
}