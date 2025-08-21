function Clock() {
  let now: any = new Date();
  let time: any =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0") +
    ":" +
    now.getSeconds().toString().padStart(2, "0");
  let element: any;

  setTimeout(() => {
    if (element) {
      let newNow: any = new Date();
      element.innerHTML =
        newNow.getHours().toString().padStart(2, "0") +
        ":" +
        newNow.getMinutes().toString().padStart(2, "0") +
        ":" +
        newNow.getSeconds().toString().padStart(2, "0");
    }
  }, 1000);

  setInterval(() => {
    if (element) {
      let newNow: any = new Date();
      element.innerHTML =
        newNow.getHours().toString().padStart(2, "0") +
        ":" +
        newNow.getMinutes().toString().padStart(2, "0") +
        ":" +
        newNow.getSeconds().toString().padStart(2, "0");
    }
  }, 1000);

  return (
    <div
      ref={(el: any) => {
        element = el;
      }}
      style={{
        color: "black",
        fontSize: "18px",
        fontWeight: "bold",
        minWidth: "70px",
        textAlign: "center",
        fontFamily: "monospace",
      }}>
      {time}
    </div>
  );
}

export default Clock;
