
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let shrineJSON;
let regionJSON;
let shrines;
let regions;
let allShrineMarkers;
let allRegionMarkers;

window.onload = async () => {
    //grab the JSON files and parse 
    shrineJSON = await d3.json("pins.json")
    regionJSON = await d3.json("locations.json")

    console.log(shrineJSON)
    console.log(regionJSON)

    shrines = shrineJSON[1]
    console.log(shrines)

    regions = regionJSON[0]
    console.log(regions)

    // Map to arrays, but flatten to keep all markers with each layer
    allShrineMarkers = shrines.layers.map(layer => layer.markers).flat()
    allRegionMarkers = regions.layers[0].markers

    updateUI()
}

function updateUI(){


// Euclidean distance function for calculating which region shrine belongs to (just an estimate based on how close to region center coordinates)
function getDistance([x1, y1], [x2, y2]) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find nearest region for each shrine
const shrinesWithRegions = allShrineMarkers.map(shrine => {
  let closestRegion = null;
  let shortestDist = Infinity;

  for (const region of allRegionMarkers) {
    const dist = getDistance(shrine.coords, region.coords);
    if (dist < shortestDist) {
      shortestDist = dist;
      closestRegion = region.name;
    }
  }

  // ...shrine takes existing shrine object with all the fields
  // then it adds a new field (region: closestRegion)
  return {
    ...shrine,
    region: closestRegion
  };
});

console.log(shrinesWithRegions);

// set up Zelda map
const svg = d3.select("#svgmap");

svg.append("image")
  .attr("href", "ZeldaMap.png")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 9209)
  .attr("height", 7492);


let mapSize = svg.node().getBoundingClientRect();


// Extract arrays of just x and y values
// const xVals = shrinesWithRegions.map(d => d.coords[0]);
// const yVals = shrinesWithRegions.map(d => d.coords[1]);

// use all coordinates for min/max?
const allCoords = [...shrinesWithRegions, ...allRegionMarkers].map(d => d.coords);
const xVals = allCoords.map(c => c[0]);
const yVals = allCoords.map(c => c[1]);

// Find min/max of both x and Y
const minX = Math.min(...xVals);
const maxX = Math.max(...xVals);
const minY = Math.min(...yVals);
const maxY = Math.max(...yVals);


// transform region coordinates to pixel coordinates (NEED TO DO)
// transform shrine coordinates to pixel coordinates on svg map


// this defines the scale for both X and Y coordinates
const xScale = d3.scaleLinear()
  .domain([minX, maxX])     // world/game coordinate bounds
  .range([0, mapSize.width]);    // actual pixel width of your map

const yScale = d3.scaleLinear()
  .domain([minY, maxY])
  .range([mapSize.height, 0]);



// Define the render function (will render all, none or specific region)
// Need to add buttons or droptime to link specific region to display data
function renderShrines(shrinesToShow) {
  svg.selectAll("circle")
    .data(shrinesToShow, d => d.id)
    .join(
      enter => enter.append("circle")
        .attr("cx", d => xScale(d.coords[0]))
        .attr("cy", d => yScale(d.coords[1]))
        .attr("r", 10)
        .attr("fill", "orange")
        .append("title"),
        //.text(d => `${d.id} (${d.region})`),
      update => update,
      exit => exit.remove()
    );
}

// render all shrines to start
renderShrines(shrinesWithRegions)

}