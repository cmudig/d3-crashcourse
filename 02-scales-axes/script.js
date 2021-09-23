import * as d3 from "d3";

d3.csv("../static/beer.csv").then((table) => {
  console.log(table);

  let barDiv = document.querySelector("#bar-div");
  let padding = 30;

  // Q2.1 Create a band (ordinal) scale for the x axis of a bar chart showing ABV of the first 5 beers
  let xScale = d3
    .scaleBand()
    .domain(table.slice(0, 5).map((d) => d.name))
    .range([0 + padding, barDiv.clientWidth - padding])
    .paddingInner(0.1);

  // Q2.2 Create a linear (quantitative) scale for the y axis of a bar chart showing ABV of the first 5 beers
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(table, (d) => d.abv)])
    .range([500, 0]);

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
    .attr("fill", "pink")
    .attr("x", (d) => xScale(d.name))
    .attr("y", (d) => 500 - yScale(d.abv))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d.abv));

  // Q2.3 Create and display an x axis
  let xAxis = d3.axisBottom(xScale);
  svg.append("g").attr("transform", "translate(0, 500)").call(xAxis);

  // Q2.4 Create and display a y axis
  let yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0%"));
  svg.append("g").attr("transform", `translate(${padding}, 0)`).call(yAxis);
});
