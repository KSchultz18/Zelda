import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
/*
used this to calc scale diff using least squares :)
    shrine 1 
    json coord: -5634,-7629
    my map: 4370, 15640

    shrine 2 
    json coord: -3428, 2034
    my map: 14030, 13440

    shrine 3 
    json coord: 1031, 6644
    my map: 18640, 8970

    shrine 4 
    json coord: 7521, -3340
    my map: 8660, 2480
*/

function remap_coords(orig_x, orig_y) {

    const shifted_x = orig_x + 10000;
    const shifted_y = orig_y + 8000;
    const x = 0.0002 * shifted_x + 0.9997 * shifted_y + 3998.13;
    const y = -1.0006 * shifted_x + 0.0000 * shifted_y + 20011.01;

    return [x, y];
}

export async function load_markers(marker_types = [], source_path) {
  const json_data = await d3.json(source_path);
  const grouped = {};

    for (const data of json_data) {
        const type = data.name;
        if (!marker_types.includes(type)) {
            continue;
        }
        
        grouped[type] = [];

        for (const layer of data.layers) {
            const icon_name = type + ".png";
            const min_zoom = layer.minZoom ?? 0;

            for (const marker of layer.markers) {
                const [x, y] = remap_coords(marker.coords[0], marker.coords[1]);
                const new_marker = {
                    id: marker.id,
                    name: marker.name,
                    link: marker.link,
                    coords: [x, y],
                    marker_type: type,
                    icon: icon_name,
                    icon_w: layer.icon.width,
                    icon_h: layer.icon.height,
                    min_zoom: min_zoom
                };
                grouped[type].push(new_marker);
            }
        }
    }
    console.log("grouped result:", grouped);
    return grouped;
}
