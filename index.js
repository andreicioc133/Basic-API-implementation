const dogFactsContainer = document.querySelector(".facts-container");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const handleLoginValidation = (data) => {
  const loginEmailInput = document.querySelector("#loginEmail");
  const loginPasswordInput = document.querySelector("#loginPassword");
  const validationTextContainer = document.querySelector(
    ".validation-text-container"
  );

  if (data.length === 0) {
    const errorText = document.createElement("p");
    errorText.classList.add("text");
    errorText.style.color = "red";
    errorText.style.fontSize = "16px";
    errorText.style.textAlign = "left";
    errorText.innerHTML = "Email or Password are incorrect!";
    loginEmailInput.style.borderColor = "red";
    loginPasswordInput.style.borderColor = "red";
    validationTextContainer.appendChild(errorText);
    validationTextContainer.style.padding = "8px 0px 8px 0px;";
    validationTextContainer.style.width = "90%";
    return;
  }

  console.log("success");
};

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

const login = async () => {
  let URI = "http://localhost:3000/api/v1/login";
  //   let proxiedURL = "http://localhost:8010/proxy";
  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  console.log(email);

  const res = await fetch(URI, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await res.json();
  handleLoginValidation(data);
  console.log("data: ", data);
};

$(document).ready(function () {
  $("#dog-facts-btn").click(function () {
    getDogFacts();
  });
  $("#get-all-users-btn").click(function () {
    getAllUsers();
  });
  $("#form-submit-btn").click(function () {
    login();
  });
});
