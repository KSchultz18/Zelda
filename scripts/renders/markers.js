import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


let current_zoom = 1;
let visible_types = new Set();

export function render_markers(grouped_markers, svg) {
    const markers = Object.values(grouped_markers).flat();
    console.log("total markers = "+ markers.length);

    const selection = svg
        .selectAll("image.marker")
        .data(markers, d => d.id);

    selection.exit().remove();

    const enter = selection.enter().append("image")
        .attr("class", "marker")
        .attr("pointer-events", "all")
        .on("click", d => d.link && window.open(d.link, "_blank"));

    enter.merge(selection)
        // removed leading slash from path and add "xlink:href" to display on github pages
        .attr("href", d => `sources/images/markers/${d.icon}`)
        .attr("xlink:href", d => `sources/images/markers/${d.icon}`);

    set_zoom(current_zoom); 
}

export function set_zoom(zoom_scale) {
  current_zoom = zoom_scale;
  update_markers();
}

export function set_filters(types) {
  visible_types = new Set(types);
  update_markers();
}

export function toggle_type(type, is_on) {
    if (is_on) {
        visible_types.add(type);
    } else {
        visible_types.delete(type);
    }
    update_markers();
}

function update_markers() {
   d3.selectAll("image.marker")
    .attr("width", d => d.icon_w/ current_zoom)
    .attr("height", d => d.icon_h / current_zoom)
    .attr("x",d =>d.coords[0] -(d.icon_w /(2 * current_zoom)))
    .attr("y",d => d.coords[1] - (d.icon_h /(2 * current_zoom)))
    .style("visibility", d => {
        if (visible_types.has(d.marker_type)) {
            return "visible";
        } else {
            return "hidden";
        }
    });
}
