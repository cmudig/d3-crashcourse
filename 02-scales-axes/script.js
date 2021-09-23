import * as d3 from "d3";

d3.csv("../static/beer.csv").then((table) => {
  let barDiv = document.querySelector("#bar-div");
  let padding = 30;

  // Q2.1 Create a band (ordinal) scale for the x axis of a bar chart showing ABV of the first 5 beers

  // Q2.2 Create a linear (quantitative) scale for the y axis of a bar chart showing ABV of the first 5 beers

  let svg = d3
    .select(barDiv)
    .append("svg")
    .attr("width", barDiv.clientWidth)
    .attr("height", 600);

  svg
    .selectAll("rect")
    .data(table.slice(0, 5))
    .enter()
    .append("rect")
    .attr("fill", "pink");

  // Q2.3 Create and display an x axis

  // Q2.4 Create and display a y axis
});
