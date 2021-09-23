import * as d3 from "d3";

let selectElem = document.querySelector("#hover-value");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setHover(d) {
  if (!d) {
    selectElem.innerHTML = "";
    return;
  }
  selectElem.innerHTML = `${numberWithCommas(d.value)} ${d.sex}s, ${(
    d.ratio * 100
  ).toFixed(2)}%`;
}

d3.csv("../static/people.csv", d3.autoType).then((table) => {
  const elem = document.querySelector("#dataviz");

  const width = elem.clientWidth;
  const height = 250;
  const padding = 35;

  let xScale = d3
    .scaleBand()
    .domain(table.map((d) => d.age))
    .range([0 + padding + 70, width - padding]);

  let yScale = d3
    .scaleBand()
    .domain([1950, 2019])
    .range([0 + padding, height - padding]);

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

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
      let y = yScale(d.year);
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
    .on("mouseover", function (_, d) {
      d3.select(this).attr("stroke", "black").style("stroke-width", "2px");
      setHover({
        sex: "female",
        value: d.pie[0].value,
        ratio: d.pie[0].value / (d.pie[0].value + d.pie[1].value),
      });
    })
    .on("mouseout", function (_) {
      d3.select(this).attr("stroke", "none");
      setHover();
    });

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
    .on("mouseover", function (_, d) {
      d3.select(this).attr("stroke", "black").style("stroke-width", "2px");
      setHover({
        sex: "male",
        value: d.pie[1].value,
        ratio: d.pie[1].value / (d.pie[0].value + d.pie[1].value),
      });
    })
    .on("mouseout", function () {
      d3.select(this).attr("stroke", "none");
      setHover();
    });

  svg.insert("g").attr("transform", "translate(-42, 175)").call(xAxis);
  svg.insert("g").attr("transform", "translate(50, -45)").call(yAxis);

  svg
    .insert("g")
    .attr(
      "transform",
      `translate(${(width - 2 * padding) / 2 - 40}, ${height - padding})`
    )
    .append("text")
    .text("Age Group");
});
