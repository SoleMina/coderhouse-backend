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
let mensajeInput = document.querySelector("#text");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let edad = document.querySelector("#edad");
let alias = document.querySelector("#alias");
let avatar = document.querySelector("#avatar");
let btn = document.querySelector("#btn-send");

const tiempo = () => {
  let f = new Date();
  let h = f.getHours();
  let m = f.getMinutes();
  let s = f.getSeconds();
  let d = f.getDay();
  let month = f.getMonth();
  let y = f.getFullYear();

  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  if (d < 10) {
    d = "0" + d;
  }

  let hora = `${d}/${month}/${y} ${h}:${m}:${s}`;
  return hora;
};

let arroba = document.querySelector("#nombre").value;
let posicion = arroba.indexOf("@");

mensajeInput.addEventListener("keyup", (e) => {
  let hora = tiempo();

  if (e.target.value) {
    if (e.key === "Enter") {
      socket.emit("message", {
        nombre: nombre.value,
        apellido: apellido.value,
        edad: edad.value,
        alias: alias.value,
        avatar: avatar.value,
        text: e.target.value
      });
      mensajeInput.value = "";
    }
  }
});
btn.addEventListener("click", (e) => {
  let hora = tiempo();
  if (mensajeInput.value) {
    socket.emit("message", {
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      alias: alias.value,
      avatar: avatar.value,
      text: mensajeInput.value,
      hora: hora
    });
    mensajeInput.value = "";
  }
});

//On recibe
socket.on("messagelog", (data) => {
  let p = document.querySelector("#log");
  console.log(data, "DATAAAAA");
  let mensajes = data
    .map((message) => {
      return `<div><span> <span class="blue">${message.nombre}</span> <span class="red">[ ${message.created_at} ]</span> dice: <span class="green">${message.text}</span> </span></div>`;
    })
    .join("");
  p.innerHTML = mensajes;
});
//*************FIN****************+*/
