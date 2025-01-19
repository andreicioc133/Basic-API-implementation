const dogFactsContainer = document.querySelector(".facts-container");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function getDogFacts() {
  const number = document.querySelector("#dog-facts-number").value;
  let URI = `https://dog-api.kinduff.com/api/facts?number=${number}`;
  let data;
  console.log("number: ", number);

  if (number > 3) {
    const text = document.createElement("p");
    text.classList.add("text");
    text.style.fontSize = "16px";
    text.style.color = "red";
    text.innerHTML = `The number of facts cannot be higher than 3.`;
    dogFactsContainer.appendChild(text);
    return;
  }

  if (dogFactsContainer.hasChildNodes()) {
    removeAllChildNodes(dogFactsContainer);
  }

  const res = await fetch(URI, {
    method: "GET",
    mode: "cors",
  });

  data = await res.json();

  const facts = data.facts;

  facts.map((fact) => {
    const text = document.createElement("p");
    text.classList.add("text");
    text.style.fontSize = "16px";
    text.innerHTML = `${fact}`;
    dogFactsContainer.appendChild(text);
  });
}

async function getAllUsers() {
  let URI = "http://localhost:3000/api/v1/users";
  //   let proxiedURL = "http://localhost:8010/proxy";

  const res = await fetch(URI);
  const data = await res.json();
  console.log("data: ", data);

  data.map((user) => {
    const row = document.createElement("div");
    const tableUsersContainer = document.querySelector(
      ".get-all-users-table-container"
    );
    row.classList.add("users-table-row");
    tableUsersContainer.appendChild(row);

    const fields = [
      {
        name: "first_name",
        value: user.first_name,
      },
      {
        name: "last_name",
        value: user.last_name,
      },
      {
        name: "age",
        value: user.age,
      },
      {
        name: "email",
        value: user.email,
      },
    ];

    fields.map((field) => {
      const element = document.createElement("p");
      element.classList.add("text");
      element.innerHTML = field?.value;
      row.appendChild(element);
    });
  });
}

$(document).ready(function () {
  $("#dog-facts-btn").click(function () {
    getDogFacts();
  });
  $("#get-all-users-btn").click(function () {
    getAllUsers();
  });
});
