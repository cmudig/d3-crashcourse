import * as d3 from "d3";

// Q1.1 Select the "text-div" div and set the text to "Hello World".
let textDiv = document.querySelector("#text-div");
textDiv.innerHTML = "Hello World";

// Q1.2 Load "beer.csv" and log it to the console.
d3.csv("../beer.csv").then((table) => {
  console.log(table);

  // Q1.3 List the first 5 beers in the table.
  let dataDiv = document.querySelector("#data-div");
  d3.select(dataDiv)
    .selectAll("p")
    .data(table.slice(0, 5))
    .enter()
    .append("p")
    .text((d) => d.name);

  // Q1.4 Create simple bars representing the ABV of the first 5 beers.
  let svgDiv = document.querySelector("#svg-div");
  d3.select(svgDiv)
    .append("svg")
    .selectAll("rect")
    .data(table.slice(0, 5))
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 45)
    .attr("y", 0)
    .attr("width", 50)
    .attr("height", (d) => d.abv * 1000);
});
