//varibale used in multiple file

//number of pixels on the screen
const screen_width_pixels = 200
const screen_height_pixels = 100

//how large the feild of view is at 1 unit away
const width_growth_factor = 2;
const height_growth_factor = 1;

//where user is standing
let origin = [0,0,0];

//if user is looking up or down
// 90 degrees means the user is looking flat with 0-90 meaning looking up and 90-180 looking down
let z_angle = 90//0-180 90 in neteral
let xy_angle = 180;//0-359

//let points = [[0,-4,0]];
let points = [[-0.5,-4,-0.5],[-0.5,-4,0.5],[0.5,-4,-0.5],[0.5,-4,0.5],[-0.5,-5,-0.5],[-0.5,-5,0.5],[0.5,-5,-0.5],[0.5,-5,0.5]]