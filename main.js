import * as d3 from "d3";

console.log(d3);
let table = await d3.csv("beer.csv");
console.log(table);

let div = document.querySelector("#app");
