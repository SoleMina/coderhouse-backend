//Instanciar Socket desde el lado del cliente
const socket = io();

//*************EVENTOS DE SOCKET****************+*/
socket.on("deliverProducts", (data) => {
  let products = data.payload;
  fetch("templates/productTable.handlebars").then((string) =>
    string.text().then((template) => {
      const processedTemplate = Handlebars.compile(template);
      const templateObject = {
        products: products
      };
      const html = processedTemplate(templateObject);
      let div = document.getElementById("productTable");
      div.innerHTML = html;
    })
  );
});

//*************END****************+*/

document.addEventListener("submit", (event) => {
  event.preventDefault();

  let form = document.querySelector("#productForm");
  let data = new FormData(form);

  fetch("http://localhost:8080/api/products", {
    method: "POST",
    body: data
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      if (json.message == "No autorizado") {
        Swal.fire({
          title: "Error",
          text: json.message,
          icon: "error",
          timer: 2000
        });
        console.log("JSON", json.message);
      } else {
        Swal.fire({
          title: "éxito",
          text: json.message,
          icon: "success",
          timer: 2000
        });
        console.log("JSON", json.message);
      }
    })
    .then((result) => {
      location.href = "http://localhost:8080/";
    });
});

//*************EVENTOS DE SOCKET PARA CENTRO DE MENSAJE****************+*/
let mensajeInput = document.querySelector("#message");
let username = document.querySelector("#username");
let btn = document.querySelector("#btn-send");

let user;
fetch("/currentUser")
  .then((result) => result.json())
  .then((json) => {
    user = json;
    console.log(user);
  });

let input = document.getElementById("message");

mensajeInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (event.target.value) {
      socket.emit("message", {
        message: event.target.value,
        username: user
      });
      event.target.value = "";
    }
  }
});
btn.addEventListener("click", (e) => {
  if (e.target.value) {
    socket.emit("message", {
      message: event.target.value,
      username: user
    });
    event.target.value = "";
  }
});
socket.on("messageLog", (data) => {
  let p = document.getElementById("log");
  let messages = data
    .map((message) => {
      return `<div><span><span style='color: red; font-weight: bold'>${message.username}</span> dice: <span style='color: blue'>${message.text} </span></span></div>`;
    })
    .join("");
  p.innerHTML = messages;
});
