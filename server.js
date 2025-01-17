const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

app.get("/", async () => {
  fetch("https://anime-facts-rest-api.herokuapp.com/api/v1/fma_brotherhood", {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  //   const data = res.json();
  //   console.log(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
