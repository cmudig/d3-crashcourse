import * as d3 from "d3";

d3.csv("../beer.csv").then((table) => {
  console.log(table);

  let barDiv = document.querySelector("#bar-div");

  // Q2.1 Ordinal Scale
  let xScale = d3
    .scaleBand()
    .domain(table.slice(0, 10).map((d) => d.name))
    .range([0, barDiv.clientWidth]);

  // Q2.2
  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(table, (d) => d.abv))
    .range([500, 0]);

  let svg = d3
    .select(barDiv)
    .append("svg")
    .attr("width", barDiv.clientWidth)
    .attr("height", 600);

  svg
    .selectAll("rect")
    .data(table.slice(0, 10))
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.name))
    .attr("y", (d) => 500 - yScale(d.abv))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d.abv));

  // Q2.3
  let xAxis = d3.axisBottom(xScale);
  svg.append("g").attr("transform", "translate(0, 500)").call(xAxis);

  // Q2.4
  let yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    // .attr("transform", "translate(0, 500)")
    .call(yAxis);
});
