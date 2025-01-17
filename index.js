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

async function getRandomDuckImg() {
  let URI = "http://localhost:3000";
  //   let proxiedURL = "http://localhost:8010/proxy";

  fetch(URI, {
    // method: "GET",
    // mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  //   const data = res.json();
  //   console.log(data);
}

$(document).ready(function () {
  $("#dog-facts-btn").click(function () {
    getDogFacts();
  });
  $("#random-duck-btn").click(function () {
    getRandomDuckImg();
  });
});
