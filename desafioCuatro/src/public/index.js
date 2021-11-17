document.addEventListener("submit", (event) => {
  event.preventDefault();

  let form = document.querySelector("#productForm");
  let data = new FormData(form);
  console.log(data);

  fetch("http://localhost:8080/api/products", {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      console.log(json);
    });
});
