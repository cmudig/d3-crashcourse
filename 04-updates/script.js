import * as d3 from "d3";

let table = await d3.csv("../beer.csv");
console.log("script", table);

let div = document.querySelector("#app");
