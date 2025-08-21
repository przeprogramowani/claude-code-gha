import { Clock as ClockIcon } from "lucide-react";

function Clock() {
  let now: any = new Date();
  let time: any =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0") +
    ":" +
    now.getSeconds().toString().padStart(2, "0");
  
  let polishMonths: any = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", 
                          "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
  let polishDays: any = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  
  let dateStr: any = polishDays[now.getDay()] + ", " + 
                     now.getDate() + " " + 
                     polishMonths[now.getMonth()] + " " + 
                     now.getFullYear();
  
  let timeElement: any;
  let dateElement: any;

  setTimeout(() => {
    if (timeElement) {
      let newNow: any = new Date();
      timeElement.innerHTML =
        newNow.getHours().toString().padStart(2, "0") +
        ":" +
        newNow.getMinutes().toString().padStart(2, "0") +
        ":" +
        newNow.getSeconds().toString().padStart(2, "0");
    }
    if (dateElement) {
      let newNow: any = new Date();
      dateElement.innerHTML = polishDays[newNow.getDay()] + ", " + 
                              newNow.getDate() + " " + 
                              polishMonths[newNow.getMonth()] + " " + 
                              newNow.getFullYear();
    }
  }, 1000);

  setInterval(() => {
    if (timeElement) {
      let newNow: any = new Date();
      timeElement.innerHTML =
        newNow.getHours().toString().padStart(2, "0") +
        ":" +
        newNow.getMinutes().toString().padStart(2, "0") +
        ":" +
        newNow.getSeconds().toString().padStart(2, "0");
    }
    if (dateElement) {
      let newNow: any = new Date();
      dateElement.innerHTML = polishDays[newNow.getDay()] + ", " + 
                              newNow.getDate() + " " + 
                              polishMonths[newNow.getMonth()] + " " + 
                              newNow.getFullYear();
    }
  }, 1000);

  return (
    <div
      style={{
        color: "black",
        fontSize: "18px",
        fontWeight: "bold",
        minWidth: "70px",
        textAlign: "center",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <ClockIcon size={18} />
        <span
          ref={(el: any) => {
            timeElement = el;
          }}>
          {time}
        </span>
      </div>
      <div
        ref={(el: any) => {
          dateElement = el;
        }}
        style={{
          fontSize: "12px",
          color: "#666",
          fontWeight: "normal",
        }}>
        {dateStr}
      </div>
    </div>
  );
}

export default Clock;
