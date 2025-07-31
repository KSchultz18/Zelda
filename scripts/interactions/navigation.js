
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { set_zoom } from "../renders/markers.js";
import { render_visible_tiles, tile_size, num_cols, num_rows } from "../map/tiles.js";

export function starting_zoom(container_id = "#tile-container", map_id = "#map") {
	const container = d3.select(container_id);
	const map = d3.select(map_id);
	const svg = document.getElementById("svgmap");

	const zoom = d3.zoom()
		.scaleExtent([0.08, 5])
		.on("zoom", (event) => handle_zoom(event, container));
	map.call(zoom).on("dblclick.zoom", null); //so it stops zooming in when clicking the filters

	const map_w = tile_size * num_cols;
	const map_h = tile_size * num_rows;

	const starting_scale = Math.min(
		window.innerWidth / map_w,
		window.innerHeight / map_h
	);
	const start_x= -(map_w * starting_scale - window.innerWidth)/ 2;
	const start_y = -(map_h * starting_scale - window.innerHeight)/ 2;

	map.call(
		zoom.transform,
		d3.zoomIdentity.translate(start_x, start_y).scale(starting_scale)
	);

	if (svg) {
		svg.style.transform = `translate(${start_x}px, ${start_y}px) scale(${starting_scale})`;
	}
	render_visible_tiles(container, { x: start_x, y: start_y, k: starting_scale});
	set_zoom(starting_scale); 
}


function handle_zoom(event, container) {
    const { x, y, k } = event.transform;

    set_zoom(k);

    container.style("transform", `translate(${x}px, ${y}px) scale(${k})`);
    const svg = document.getElementById("svgmap");
    if (svg) {
        svg.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
    }

  render_visible_tiles(container, event.transform);
}