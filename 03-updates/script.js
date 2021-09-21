import * as d3 from "d3";

d3.csv("beer.csv").then((table) => {
  console.log(table);
  let div = document.querySelector("#app");
});
