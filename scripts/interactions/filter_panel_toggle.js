import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { toggle_type } from "../renders/markers.js";


export function start_filter_panel(types) {
    const filter_panel = d3.select("#filter-panel");

    filter_panel.selectAll("label")
        .data(types)
        .enter()
        .append("label")
        .html(d => `<input type="checkbox" checked data-type="${d}"> ${d}`)
        .select("input")
        .on("change", function(event, d) {
            toggle_type(d, this.checked);
        });


    const toggleButton = document.getElementById("filter-toggle");
    const filterPanelDiv = document.getElementById("filter-panel");

    if (toggleButton && filterPanelDiv) {
        toggleButton.addEventListener("click", () => {
        filterPanelDiv.classList.toggle("show");
        });
    }
}
