document.addEventListener("submit", (event) => {
  event.preventDefault();

  let form = document.querySelector("#productForm");
  let data = new FormData(form);
  console.log("DATA", data);

  fetch("http://localhost:8080/api/products", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      console.log(json);
    });
});
