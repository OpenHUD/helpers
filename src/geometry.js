/*****
 * Geometry related functions
 */

/***
 *
 * @param box1
 * @param box2
 * @returns {boolean|iff box2 is inside box1}
 */
const is_in = (box1, box2) => {
    // Axis aligned boxex
    let box1_minx = Math.min(...box1.map(d => d['x']));
    let box2_minx = Math.min(...box2.map(d => d['x']));
    let box1_maxx = Math.max(...box1.map(d => d['x']));
    let box2_maxx = Math.max(...box2.map(d => d['x']));
    let box1_miny = Math.min(...box1.map(d => d['y']));
    let box2_miny = Math.min(...box2.map(d => d['y']));
    let box1_maxy = Math.max(...box1.map(d => d['y']));
    let box2_maxy = Math.max(...box2.map(d => d['y']));
    return box1_minx < box2_minx && box1_maxx > box2_maxx && box1_miny < box2_miny && box1_maxy > box2_maxy;
};

/***
 * returns the union between 2 boxes
 * @param box1
 * @param box2
 */
const union = (box1, box2) => {
    let minx = Math.min(...box1.map(d => d['x']), ...box2.map(d => d['x']));
    let maxx = Math.max(...box1.map(d => d['x']), ...box2.map(d => d['x']));
    let miny = Math.min(...box1.map(d => d['y']), ...box2.map(d => d['y']));
    let maxy = Math.max(...box1.map(d => d['y']), ...box2.map(d => d['y']));
    return [
        {'x': minx, 'y': miny},
        {'x': maxx, 'y': maxy}
    ]
};

/***
 * @param point
 * @param box
 * @returns {boolean|iff the top of "box" is under "point"}
 */
const is_under = (point, box) => {
    let minx = Math.min(...box.map(d => d['x']));
    let maxx = Math.max(...box.map(d => d['x']));
    let miny = Math.min(...box.map(d => d['y']));
    return miny > point['y'] && minx <= point['x'] && maxx >= point['x'];
};

const get_center = (box) => {
    let minx = Math.min(...box.map(d => d['x']));
    let maxx = Math.max(...box.map(d => d['x']));
    let miny = Math.min(...box.map(d => d['y']));
    let maxy = Math.max(...box.map(d => d['y']));
    return {
        'x': minx + ((maxx - minx) / 2),
        'y': miny + ((maxy - miny) / 2)
    }
};

const width = (box) => {
    let minx = Math.min(...box.map(d => d['x']));
    let maxx = Math.max(...box.map(d => d['x']));
    return maxx - minx;
};

const height = (box) => {
    let miny = Math.min(...box.map(d => d['y']));
    let maxy = Math.max(...box.map(d => d['y']));
    return maxy - miny;
};

/***
 * Calculate the minimum distance between two boxes, or return 0 if the boxes intersect or adjacent.
 */
const min_distance = (box1, box2) => {
    let union_box = union(box1, box2);
    let inner_width = Math.max(0, width(union_box) - width(box1) - width(box2));
    let inner_height = Math.max(0, height(union_box) - height(box1) - height(box2));
    return Math.sqrt(inner_width**2 + inner_height**2);
};

/***
 * Calculate distance between two boxes, based on their centers
 * @param box1
 * @param box2
 */
const center_distance = (box1, box2) => {
    const b1_center = get_center(box1);
    const b2_center = get_center(box2);
    return Math.sqrt((b1_center.x - b2_center.x)**2 + (b1_center.y - b2_center.y)**2);
};

/***
 * sorting function for seats
 * returns -1 if seat 1 is "closer" to hero going clockwise around the table, else 1
 * input is seat centers.
 * @param hero
 */
const is_closer_to_hero = (hero, seat1, seat2) => {
    if (seat1['x'] <= hero['x']) {
        if (seat2['x'] > hero['x']) {
            return -1;
        } else {
            return seat1['y'] > seat2['y'] ? -1 : 1;
        }
    } else {
        if (seat2['x'] <= hero['x']) {
            return 1;
        } else {
            return seat1['y'] < seat2['y'] ? -1 : 1;
        }
    }
}

/**
 * Return IoU between two axis aligned bounding boxes
 */
const iou = (box1, box2) => {
    // calculate intersection points
    const b1_minx = Math.min(...box1.map(d => d['x']));
    const b2_minx = Math.min(...box2.map(d => d['x']));
    const x_left = Math.max(b1_minx, b2_minx);

    const b1_miny = Math.min(...box1.map(d => d['y']));
    const b2_miny = Math.min(...box2.map(d => d['y']));
    const y_top = Math.max(b1_miny, b2_miny);

    const b1_maxx = Math.max(...box1.map(d => d['x']));
    const b2_maxx = Math.max(...box2.map(d => d['x']));
    const x_right = Math.min(b1_maxx, b2_maxx);

    const b1_maxy = Math.max(...box1.map(d => d['y']));
    const b2_maxy = Math.max(...box2.map(d => d['y']));
    const y_bottom = Math.min(b1_maxy, b2_maxy);

    if (x_right < x_left || y_bottom < y_top) {
        return 0.0;
    } else {
        // The intersection of two axis-aligned bounding boxes is always an axis-aligned bounding box
        let intersection_area = (x_right - x_left) * (y_bottom - y_top);
        let b1_area = (b1_maxx - b1_minx) * (b1_maxy - b1_miny);
        let b2_area = (b2_maxx - b2_minx) * (b2_maxy - b2_miny);

        // compute the intersection over union by taking the intersection area and dividing it by the union area - intersection area
        let result = (intersection_area / (b1_area + b2_area - intersection_area));
        // console.log(result);
        return result;
    }
};

/***
 * divide box[x] in width and box[y] in height
 * @param box
 * @param width
 * @param height
 */
const normalize_vertices = (box, width, height) => {
    return box.map(v => ({
        x: v['x'] / width,
        y: v['y'] / height
    }));
};

export default { normalize_vertices, iou, is_closer_to_hero, center_distance, get_center, min_distance, union, is_in, is_under, width, height };