import * as d3 from "d3";

d3.csv("../people.csv", d3.autoType).then((table) => {
  const elem = document.getElementById("dataviz");

  const width = elem.clientWidth;
  const height = 250;
  const padding = 30;

  let xScale = d3
    .scaleBand()
    .domain(table.map((d) => d.age))
    .range([0 + padding, width - padding]);

  let xAxis = d3.axisBottom(xScale);

  let colorScale = d3.scaleOrdinal().domain([0, 1]).range(["pink", "blue"]);

  let sizeScale = d3
    .scaleLinear()
    .domain(d3.extent(table, (d) => d.female + d.male))
    .range([10, 30]);

  let pieValues = table.map((d) => {
    let pie = d3.pie()([d.female, d.male]);
    return { ...d, pie: pie };
  });

  let svg = d3
    .select(elem)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let enterSelect = svg
    .selectAll("g")
    .data(pieValues)
    .enter()
    .append("g")
    .attr("transform", (d) => {
      let x = xScale(d.age);
      let y = d.year === 1950 ? 40 : 130;
      return `translate(${x},${y})`;
    });

  enterSelect
    .append("path")
    .attr("d", (d) => {
      return d3
        .arc()
        .innerRadius(0)
        .outerRadius(sizeScale(d.female + d.male))
        .startAngle(d.pie[0].startAngle)
        .endAngle(d.pie[0].endAngle)();
    })
    .attr("fill", (d) => colorScale(d.pie[0].index))
    .attr("stroke", (d) => colorScale(d.pie[0].index))
    .style("stroke-width", "2px");

  enterSelect
    .insert("path")
    .attr("d", (d) => {
      return d3
        .arc()
        .innerRadius(0)
        .outerRadius(sizeScale(d.female + d.male))
        .startAngle(d.pie[1].startAngle)
        .endAngle(d.pie[1].endAngle)();
    })
    .attr("fill", (d) => colorScale(d.pie[1].index))
    .attr("stroke", (d) => colorScale(d.pie[1].index))
    .style("stroke-width", "2px");

  svg.insert("g").attr("transform", "translate(-45, 175)").call(xAxis);

  svg
    .insert("g")
    .attr(
      "transform",
      `translate(${(width - 2 * padding) / 2 - 40}, ${height - padding})`
    )
    .append("text")
    .text("Age Group");

  svg
    .insert("g")
    .attr("transform", `translate(${width - 100}, ${45})`)
    .append("text")
    .text("1950");

  svg
    .insert("g")
    .attr("transform", `translate(${width - 100}, ${135})`)
    .append("text")
    .text("2019");
});
