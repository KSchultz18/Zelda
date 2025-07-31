import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/* style tips from chatGPT*/

export const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("opacity", 0)
  .style("pointer-events", "none")  // lets mouse events pass through
  .style("background", "rgba(0, 0, 0, 0.7)")
  .style("color", "#fff")
  .style("padding", "4px 8px")
  .style("font-size", "12px")
  .style("border-radius", "4px")
  .style("white-space", "nowrap")
  .style("z-index", 1000); 
