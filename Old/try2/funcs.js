/*new approach possibly already detailed in try1 notes?
find distance to the plane a point is on not the distance to the point
figure out bounderies of plane at this new point
use bounderies to find the relative position then put a dot to the screen*/

const width_pixels = 200
const height_pixels = 100



function clear()
{
    for(let i=0; i<width_pixels*height_pixels; i++)
    {
        document.getElementById(String(i%width_pixels)+","+String(Math.floor(i/width_pixels))).style.backgroundColor = "aqua"
    }
}

function create_screen()
{
        const container = document.getElementById("container")
        for(let i=0; i<width_pixels*height_pixels; i++)
        {
            const newDiv = document.createElement("div");
            newDiv.classList = "s_p";
            newDiv.id = String(i%width_pixels)+","+String(Math.floor(i/width_pixels));//0-79
            container.appendChild(newDiv);
        }
        document.addEventListener('keydown', step)
        print("orange", points, origin, z_angle, xy_angle);
}



function step(event)
{
    // Access the pressed key using event.key
                const pressedKey = event.key;
                // Prevent default browser behavior for certain keys (optional)
                // For example, to prevent the spacebar from scrolling the page:
                if (pressedKey === 'a') {
                    event.preventDefault();
                    origin = [origin[0]-0.25,origin[1],origin[2]]
                }
                else if (pressedKey === 'w') {
                    event.preventDefault();
                    origin = [origin[0],origin[1]-0.25,origin[2]]
                }
                else if (pressedKey === 's') {
                    event.preventDefault();
                    origin = [origin[0],origin[1]+0.25,origin[2]]
                }
                else if (pressedKey === 'd') {
                    event.preventDefault();
                    origin = [origin[0]+0.25,origin[1],origin[2]]
                }
                else if(pressedKey === ' ')
                {
                    event.preventDefault();
                    origin = [origin[0],origin[1],origin[2]-0.25]
                }
                else if(event.shiftKey)
                {
                    event.preventDefault();
                    origin = [origin[0],origin[1],origin[2]+0.25]
                }
                else if(pressedKey === 'ArrowUp')
                {
                    event.preventDefault();
                    if(z_angle >= 10)
                    {
                        z_angle-=1
                    }
                    //origin = [origin[0],origin[1],origin[2]-0.25]
                }
                else if(pressedKey === 'ArrowDown')
                {
                    event.preventDefault();
                    if(z_angle < 170)
                    {
                        z_angle+=1
                    }
                    //origin = [origin[0],origin[1],origin[2]+0.25]
                }
                else if(pressedKey === 'ArrowLeft')
                {
                    event.preventDefault();
                    //if(xy_angle > 0)
                    //{
                        xy_angle-=1
                    if(xy_angle < 0)
                    {
                        xy_angle = 359
                        //xy_angle = 0
                    }
                    //}
                    //origin = [origin[0],origin[1],origin[2]-0.25]
                }
                else if(pressedKey === 'ArrowRight')
                {
                    event.preventDefault();
                    //if(xy_angle < 85)
                    //{
                        xy_angle+=1
                    //}
                    xy_angle = xy_angle % 360
                    //if(xy_angle > 90)
                    //{
                        //xy_anlge = 90
                    //}
                    //origin = [origin[0],origin[1],origin[2]+0.25]
                }
                else
                {
                    return;
                }

               //re render
                clear();
                document.getElementById("z").innerHTML = z_angle;
                document.getElementById("xy").innerHTML = xy_angle;
                print("orange", points, origin, z_angle, xy_angle);
                document.getElementById(100+','+50).style.backgroundColor = 'black';
}

 function print(colour, ps, origin, z_angle, xy_angle)
{
    const screen_width_total = 2;
    const screen_height_total = 1;

    let [x_to_width, x_to_height, y_to_width, y_to_height, z_to_width, z_to_height] = ratios(z_angle, xy_angle)
    //console.log("ratios " + ratios(z_angle, xy_angle))

    for(let i=0; i<ps.length; i++)
    {
        let newC = find_center(origin, ps[i], z_angle, xy_angle)
        console.log(newC)
        if(newC.length == 3)
        {

        let w_index = (ps[i][0]-newC[0])*x_to_width + (ps[i][1]-newC[1])*y_to_width + (ps[i][2]-newC[2])*z_to_width
        let h_index = (ps[i][0]-newC[0])*x_to_height + (ps[i][1]-newC[1])*y_to_height + (ps[i][2]-newC[2])*z_to_height

        
        //console.log(z_to_width + " <> " + newC[2] +" <> " +ps[i][2])

        let distance = Math.sqrt((origin[0]-newC[0])**2 + (origin[1]-newC[1])**2 + (origin[2]-newC[2])**2)

        let screen_width = distance * screen_width_total
        let screen_height = distance * screen_height_total

        //console.log("screen range (" + (-1*screen_width/2) + " to " + (screen_width/2) + ")")
        //console.log("point: " + ps[i]+" center: " + newC)
       
        //console.log("distance " + distance)
        //console.log("screen size :" + screen_width + "," + screen_height)
        //console.log(w_index + " " + h_index)
        //console.log("at (" + ps[i] + ") ")
        
        //range is -half of screen size to half of screen size

        /*console.log("contributions")
        console.log("xw " +(ps[i][0]-newC[0]) + " "+((ps[i][0]-newC[0])*x_to_width))
        console.log("xh " +(ps[i][0]-newC[0]) + " "+ ((ps[i][0]-newC[0])*x_to_height))
        console.log("yw " +(ps[i][1]-newC[1]) + " "+ ((ps[i][1]-newC[1])*y_to_width))
        console.log("yh " +(ps[i][1]-newC[1])+ " "+ ((ps[i][1]-newC[1])*y_to_height))
        console.log("zw " +(ps[i][2]-newC[2]) + " "+ ((ps[i][2]-newC[2])*z_to_width))
        console.log("zh " +(ps[i][2]-newC[2]) + " "+ ((ps[i][2]-newC[2])*z_to_height))*/

        let wp = (w_index + screen_width/2)/screen_width
        let hp = (h_index + screen_height/2)/screen_height

        //console.log("crap maths");
        wp*=(width_pixels-1)
        hp*=(height_pixels-1)
        wp = Math.floor(wp)
        hp = Math.floor(hp)

        //console.log(wp + " " + hp)

        document.getElementById(wp+','+hp).style.backgroundColor = colour;
        }
        else
        {
            console.log("got more the 6 so using the new technique " + newC)
            document.getElementById(Math.floor(newC[0])+','+Math.floor(newC[1])).style.backgroundColor = colour;
        }
    }
}