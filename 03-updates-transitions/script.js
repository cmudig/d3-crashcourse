import * as d3 from "d3";

let data = [2, 5, 3, 6, 5];

let dataDiv = document.querySelector("#number-div");
let selectedDiv = d3.select(dataDiv);
let button = document.querySelector("#update-data");
button.addEventListener("click", updateData);

function updateData() {
  data = [];
  // Choose between 3 and 5 numbers that are between 1 and 10
  let randomAmount = Math.floor(Math.random() * 3) - 3;
  for (let i = 0; i < 6 + randomAmount; i++) {
    data.push(Math.floor(Math.random() * 10));
  }

  dataDiv.innerHTML = "";
  selectedDiv
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "number")
    .text((d) => d);

  // Q3.1 Replace the .enter().append() call with a .join()

  // Q3.2 Use the enter, update, and exit parameters for .join() and color new items blue

  // Q3.3 Make exiting items transition out by fading away
}
