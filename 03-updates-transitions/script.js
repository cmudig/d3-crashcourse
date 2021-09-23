import * as d3 from "d3";

let data = [2, 5, 3, 6, 5];

let button = document.querySelector("#update-data");
button.addEventListener("click", updateData);

let dataDiv = document.querySelector("#number-div");

let selectedDiv = d3.select(dataDiv);

function updateData() {
  data = [];
  let randomAmount = Math.floor(Math.random() * 3) - 3;
  for (let i = 0; i < 6 + randomAmount; i++) {
    data.push(Math.floor(Math.random() * 10));
  }
  console.log(data);

  dataDiv.innerHTML = "";
  selectedDiv
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "number")
    .text((d) => d);

  // Q3.1 Replace the .enter().append() call with a .join()
  // selectedDiv
  //   .selectAll("div")
  //   .data(data)
  //   .join("div")
  //   .attr("class", "number")
  //   .text((d) => d);

  // Q3.2 Use the enter, update, and exit parameters for .join() and color new items blue
  // selectedDiv
  //   .selectAll("div")
  //   .data(data, (d) => d)
  //   .join(
  //     (enter) =>
  //       enter
  //         .append("div")
  //         .attr("class", "number")
  //         .text((d) => d),
  //     (update) => update.style("color", "blue"),
  //     (exit) => exit.remove()
  //   );

  // Q3.3 Make exiting items transition out by fading away
  // selectedDiv
  //   .selectAll("div")
  //   .data(data, (d) => d)
  //   .join(
  //     (enter) =>
  //       enter
  //         .append("div")
  //         .attr("class", "number")
  //         .text((d) => d),
  //     (update) => update.style("color", "blue"),
  //     (exit) =>
  //       exit
  //         .style("color", "red")
  //         .transition()
  //         .duration(1000)
  //         .style("color", "#00f0")
  //         .remove()
  //   );
}
