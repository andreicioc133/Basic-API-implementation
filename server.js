const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const db = require("./db");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

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

app.get("/api/v1/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM fake_users");
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/v1/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      `SELECT * FROM fake_users WHERE email = '${email}' and password = '${password}'`
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/v1/register", async (req, res) => {
  const { firstName, lastName, age, email, username, password } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      `INSERT INTO fake_users (first_name, last_name, age, email,password)  values ('${firstName}', '${lastName}', ${age}, '${email}','${password}')`
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
