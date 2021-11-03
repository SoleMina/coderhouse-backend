const tiempoReloj = () => {
  let hoy = new Date();
  let hr = hoy.getHours();
  let min = hoy.getMinutes();
  let sec = hoy.getSeconds();

  let ap;

  ap = hr < 12 ? "am" : "pm";
  hr = hr == 0 ? 12 : hr;
  hr = hr > 12 ? hr - 12 : hr;

  hr = validarTiempo(hr);
  min = validarTiempo(min);
  sec = validarTiempo(sec);

  console.log(`${hr}:${min}:${sec}:${ap}`);

  /*
  setTimeout(() => {
    tiempoReloj();
  }, 1000);
  */

  let intervalo = setInterval(() => {
    tiempoReloj();
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalo);
  }, 1000);
};

const validarTiempo = (date) => {
  if (date < 10) {
    //date = "0" + 1;
    date += "0";
  }
  return date;
};

tiempoReloj();
