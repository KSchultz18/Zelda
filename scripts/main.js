import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { starting_zoom } from "./interactions/navigation.js";
import { load_markers } from "./data/load_data.js";
import {render_markers, set_filters, set_zoom } from "./renders/markers.js";
// import {render_region_labels} from "./renders/regions.js";
import { start_filter_panel } from "./interactions/filter_panel_toggle.js";

window.onload = async () => {

    
    starting_zoom();

    const svg = d3.select("#svgmap");
    const types = ["Shrine", "Sheikah Tower", "Stable", "Village"];
    const grouped = await load_markers(types, "./sources/json_files/pins.json");
    render_markers(grouped, svg);
    // render_region_labels(svg)
    set_filters(types);
    start_filter_panel(types);

    // use for ref for scaling, but also a fun game of how close can you get
    // d3.select("#svgmap")
    //     .append("circle")
    //     .attr("cx", 8660)
    //     .attr("cy", 2480)
    //     .attr("r", 5)
    //     .attr("fill", "magenta")
    //     .attr("stroke", "lime") 
    //     .attr("stroke-width", 100);
};