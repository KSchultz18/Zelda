const regions = [
  { name: "Lanayru", coords: [-1353, 6438] },
  { name: "Necluda", coords: [-3425, 4513] },
  { name: "Central Hyrule", coords: [50, -532] },
  { name: "Faron", coords: [-5648, 1856] },
  { name: "Gerudo", coords: [-6762, -8270] },
  { name: "Hebra", coords: [5357, -6695] },
  { name: "Eldin", coords: [3336, 4061] },
  { name: "Akkala", coords: [5814, 7509] }
];


export function render_region_labels(svg) {
    svg.selectAll("text.region-label")
    .data(regions)
    .enter()
    .append("text") // <- append first
    .attr("class", "region-label")
    .attr("text-anchor", "middle")
    .attr("x", d => d.coords[0])
    .attr("y", d => d.coords[1])
    .text(d => d.name);
}