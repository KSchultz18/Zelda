//map tile logic

//NOTE: please note that I did have chat help me with the logic of stiching my images together

export const map_col = ['Z','A','B','C','D','E','F','G','H','I','J','K'];
export const tile_size = 2000;
export const num_cols = 12;
export const num_rows = 10;
const loaded_tiles = new Set();

export function render_visible_tiles(container, transform) {
    console.log('render_visible_tiles called w/: ', transform);
    const { x, y, k } = transform;

    const view = {
        width: window.innerWidth / k,
        height: window.innerHeight / k,
        x: -x / k,
        y: -y / k,
    };

    const start_col =Math.floor(view.x / tile_size);
    const end_col = Math.ceil((view.x + view.width) /tile_size);
    const start_row =Math.floor(view.y / tile_size);
    const end_row = Math.ceil((view.y+ view.height) /tile_size);

    for (let col = start_col; col < end_col; col++) {
        for (let row = start_row; row < end_row; row++) {
            if (col < 0 || col >= num_cols || row < 0 || row >= num_rows) continue;

            const key = `${col}-${row}`;
            if (loaded_tiles.has(key)) continue;

            loaded_tiles.add(key);
            container.append("img")
                .attr("class", "tile")
                .attr("src", `/sources/images/map_tiles/MapTex_${map_col[col]}-${row}.png`)
                .style("position", "absolute")
                .style("width", `${tile_size}px`)
                .style("height", `${tile_size}px`)
                .style("left", `${col * tile_size}px`)
                .style("top", `${row * tile_size}px`);
        }
    }
}