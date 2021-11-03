//CHALLENGE

/*Desarrollar una funcion mostrarletras que reciba un string como parámetro y permita mostrar una vez por segundo
cada uno de sus carácteres. Al finalizar, se debe invocar la siguiente función que se le pasa también como
parámetro */

const mostrarLetras = (name, callback) => {
  let nameLetter = "";
  for (let i = 1; i <= name.length; i++) {
    nameLetter = name.slice(0, i);
    console.log(nameLetter);
  }
  callback();
};

const fin = () => {
  console.log("Terminé");
};

setTimeout(() => {
  mostrarLetras("Karina", fin);
}, 0);
setTimeout(() => {
  mostrarLetras("Karina", fin);
}, 250);
setTimeout(() => {
  mostrarLetras("Karina", fin);
}, 500);

//Solution

const mostrarLetras2 = (palabra, termine) => {
  let i = 0;

  const timer = setInterval(() => {
    if (i < palabra.length) {
      console.log(palabra[i]);
      i++;
    } else {
      clearInterval(timer);
      termine();
    }
  }, 1000);
};

const fin2 = () => {
  console.log("Terminé");
};

setTimeout(() => {
  mostrarLetras2("hola", fin2);
}, 0);

setTimeout(() => {
  mostrarLetras2("hola", fin2);
}, 250);
setTimeout(() => {
  mostrarLetras2("hola", fin2);
}, 500);
