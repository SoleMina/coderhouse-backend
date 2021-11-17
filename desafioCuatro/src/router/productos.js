const express = require("express");
const router = express.Router();

const Container = require("../classes/container");
const container = new Container();

//GETS
router.get("/", (req, res) => {
  console.log(req.query);
  const status = req.query;

  container.getAll().then((result) => {
    if (result.status === "success") {
      res.status(200).send(result.payload);
    } else {
      res.status(500).send(result.message);
    }
  });
});

router.get("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  container.getById(id).then((result) => {
    console.log(result);
    res.send(result);
  });
});

router.get("/productRandom", (req, res) => {
  try {
    if (id == "productRandom") {
      container.getRandomProduct().then((result) => {
        let products = result.payload;
        console.log(products);
        if (result.status === "success") {
          console.log("RESULT", result);
          res.send(result.payload);
        } else {
          res.send(res.message);
        }
      });
    }
  } catch (error) {
    res.send(res.message);
  }
});

//POSTS
router.post("/", (req, res) => {
  let body = req.body;
  console.log(body);
  container.save(body).then((result) => {
    res.send(result);
  });
});

//PUTS
router.put("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  let body = req.body;
  container.updateProduct(id, body).then((result) => {
    res.send(result);
  });
});

//DELETES
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  container.deleteById(id).then((result) => {
    res.send(result);
  });
});

module.exports = router;
