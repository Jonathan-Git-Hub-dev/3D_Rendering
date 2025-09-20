//import {screen_width_pixels, screen_height_pixels, width_growth_factor, height_growth_factor} from './variables.js'

function Cos(angle)
{
    return(Math.cos(angle*(Math.PI / 180)))
}
function Sin(angle)
{
    return(Math.sin(angle*(Math.PI / 180)))
}
function Tan(angle)
{
    return(Math.tan(angle*(Math.PI / 180)))
}
function Atan(opposite, adjacent)
{
    return Math.atan(opposite / adjacent) * (180 / Math.PI);
}

function quick_check(origin, point, z_angle, xy_angle)
{
    //true = reprocess for rendering
    //false = skip
    if(origin[0] == point[0] && origin[1] == point[1] && origin[2] == point[2])
    {
        return false;
    }

    //find angle that origin makes with point,
    //if similar our actual angle render point

    //z 
    let horizontal_distance = Math.sqrt((point[0] - origin[0])**2 + (point[1] - origin[1])**2)
    let vertival_distance = point[2] - origin[2];
    
    let new_z
    if(horizontal_distance == 0)
    {
        if(z>0)
        {
            z = 180
        }
        else
        {
            z = 0
        }
    }
    else
    {
        new_z = Atan(vertival_distance , horizontal_distance);
    }

    //check z first so there might not be a need to cehck xy
    //window expands ~27 degress out in the z direction of each side
    if(Math.abs(z_angle-new_z) > 27)
    {
        return false;
    }



    //new x,y
    let x_component = point[0] - origin[0]
    let y_component = point[1] - origin[1]
    let new_xy;
    /*
    -3 6 = 9
    6 -3 = -9
    */
    if(x == 0)
    {
        if(y < 0)
            new_xy = 0
        else
            new_xy = 180
    }
    else if(x > 0)
    {
        if(y == 0)
            new_xy = 90
        else if(y>0)
        {
            new_xy = Atan(y_component, x_component) +90;
        }
        else//negative y
        {
            new_xy = Atan(x_component, y_component);
        }
    }
    else//negative x
    {
        if(y == 0)
            new_xy = 270
        else if(y>0)
        {
            new_xy = Atan(x_component, y_component) +180;
        }
        else//negative y
        {
            new_xy = Atan(y_component, x_component) +270;
        }
    }

    //    window expands 45 degress out in the xy direction of each side
    // add to both so we can 
    if(xy_angle < 45)
    {
        //new_xy = 360 - new_xy
        if(new_xy < xy_angle)
        {
            return true
        }
        if(new_xy-45 <= xy_angle)
        {
            return true
        }
        if((360 - new_xy)+xy_angle < 45)
        {
            return true
        }
        return false
    }
    else
    {
        if(Math.abs(xy_angle-new_xy) > 45)
        {
            return false;
        }
    }

    return true;
}



function clear()//changes all pixelss back to aqua
{
    for(let i=0; i < (screen_width_pixels*screen_height_pixels) ; i++)
    {
        document.getElementById(String(i%screen_width_pixels)+","+String(Math.floor(i/screen_width_pixels))).style.backgroundColor = "aqua"
    }
}

function create_screen()//initializes the display
{
        const container = document.getElementById("container")
        for(let i=0; i<screen_width_pixels*screen_height_pixels; i++)
        {
            const newDiv = document.createElement("div");
            newDiv.classList = "s_p";
            newDiv.id = String(i%screen_width_pixels)+","+String(Math.floor(i/screen_width_pixels));//0-79
            container.appendChild(newDiv);
        }
        document.addEventListener('keydown', move_user)
        //render("orange", points, origin, z_angle, xy_angle);
        render("orange", lines, origin, z_angle, xy_angle);
}



function move_user(event)
{
    event.preventDefault();
    const pressedKey = event.key;

    //movement
    console.log("need to change movement based on where user is looking")
    if (pressedKey === 'a')
    {
        //move in the direction user is facing
        origin = [origin[0]-0.25,origin[1],origin[2]]
    }
    else if (pressedKey === 'w')
    {
        origin = [origin[0],origin[1]-0.25,origin[2]]
    }
    else if (pressedKey === 's')
    {
        origin = [origin[0],origin[1]+0.25,origin[2]]
    }
    else if (pressedKey === 'd')
    { 
        origin = [origin[0]+0.25,origin[1],origin[2]]
    }
    else if(pressedKey === ' ')
    {
        origin = [origin[0],origin[1],origin[2]-0.25]
    }
    else if(event.shiftKey)
    {
        origin = [origin[0],origin[1],origin[2]+0.25]
    }
    else if(pressedKey === 'ArrowUp')//changing angle
    {
        if(z_angle > 10)//currently doesnt support looking completely up
            z_angle-=1
    }
    else if(pressedKey === 'ArrowDown')
    {
        if(z_angle < 170)//currently doesnt support looking completely down
            z_angle+=1
    }
    else if(pressedKey === 'ArrowLeft')
    {
        xy_angle-=1
        if(xy_angle < 0)//reseting to other side
            xy_angle = 359
    }
    else if(pressedKey === 'ArrowRight')
    {
        xy_angle+=1
        xy_angle = xy_angle % 360//reseting
    }
    else
    {
        return;
    }

    //display new stats    
    document.getElementById("z").innerHTML = z_angle;
    document.getElementById("xy").innerHTML = xy_angle;
    document.getElementById("origin").innerHTML = origin;

    //rerender
    clear();
    //render("orange", points, origin, z_angle, xy_angle);
    render("orange", lines, origin, z_angle, xy_angle);
    document.getElementById(100+','+50).style.backgroundColor = 'black';
}

function dl(x1,y1,x2,y2)
{//this algorithm was copied from google
    //const points = [];
    console.log("Inital: " + x1 + " " + x2 + " " + y1 + " " + y2)
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    let sx = (x2 < x1) ? 1 : -1;
    let sy = (y2 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        let elem = document.getElementById( String(Math.round(x2))+','+String(Math.round(y2)))
        //console.log("dd")
        elem.style.backgroundColor = 'yellow'
        //points.push({ x: x0, y: y0 });

        if (x2 === x1 && y2 === y1) break;

        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x2 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y2 += sy;
        }
    }
    //return points;
}

/*function dl(x1,y1,x2,y2)
{
        let grad = Math.floor(y2-y1/x2-x1);
        
        if(grad > 1)
        {
            console.log("rise dom: " + grad)
        }
        else
        {
            console.log("run dom: " + grad)
        }
        if(y1 > y2)
        {
            let temp = y1
            y1 = y2
            y2 = temp
            temp = x1
            x1=x2
            x2=temp
        }
        if(x1 > x2)
        {
            let temp = y1
            y1 = y2
            y2 = temp
            temp = x1
            x1=x2
            x2=temp
        }

       //console.log("Inital: " + x1 + " " + x2 + " " + y1 + " " + y2)

        //while ( Math.round(x1)!=x2 && Math.round(y1)!=y2)
        //if(Math.round(x1)!=x2 && Math.round(y1)!=y2)
        while ( Math.round(x1)!=x2 || Math.round(y1)!=y2)
        {
            //console.log(x1 + " " + x2 + " " + y1 + " " + y2)
            //console.log("bbb");
            //console.log(String(Math.round(x1))+','+String(Math.round(y1)));
            let elem = document.getElementById( String(Math.round(x1))+','+String(Math.round(y1)))
            //console.log(elem)
            elem.style.backgroundColor = 'yellow'
            //break;

            //move 1 closer to 2 using grad
            //add one and use grad to distribute
            let tot = Math.abs(y2-y1)+Math.abs(x2-x1)
            //console.log("total :" + tot)
            let xb = (Math.abs(x2-x1)/tot)//*1
            let yb = (Math.abs(y2-y1)/tot)//*1
            //console.log("x bit: " + xb + " yb: " + yb);
            x1+=xb
            y1+=yb
            //console.log('count');
        }
       // console.log("Done");    
}*/

function render(colour, lines, origin, z_angle, xy_angle)
{
    let [x_to_width, x_to_height, y_to_width, y_to_height, z_to_width, z_to_height] = ratios(z_angle, xy_angle)

    for(let i=0; i<lines.length; i++)
    {
        let p1 = lines[i][0]
        let p2 = lines[i][1]


           //find the center of the screen for this point
        let newCp1 = find_center(origin, p1, z_angle, xy_angle)
        let newCp2 = find_center(origin, p2, z_angle, xy_angle)
        let x1,x2,y1,y2

        //console.log('new center '+ newC)
        if(newCp1.length == 3)//for not completely mixed direction
        {
            //let w_index = (ps[i][0]-newC[0])*x_to_width + (ps[i][1]-newC[1])*y_to_width + (ps[i][2]-newC[2])*z_to_width
            //let h_index = (ps[i][0]-newC[0])*x_to_height + (ps[i][1]-newC[1])*y_to_height + (ps[i][2]-newC[2])*z_to_height

            let w_index = (p1[0]-newCp1[0])*x_to_width + (p1[1]-newCp1[1])*y_to_width + (p1[2]-newCp1[2])*z_to_width
            let h_index = (p1[0]-newCp1[0])*x_to_height + (p1[1]-newCp1[1])*y_to_height + (p1[2]-newCp1[2])*z_to_height

            //let distance = Math.sqrt((origin[0]-newC[0])**2 + (origin[1]-newC[1])**2 + (origin[2]-newC[2])**2)
            let distance = Math.sqrt((origin[0]-newCp1[0])**2 + (origin[1]-newCp1[1])**2 + (origin[2]-newCp1[2])**2)

            let screen_width = distance * width_growth_factor
            let screen_height = distance * height_growth_factor

            /*let wp = (w_index + screen_width/2)/screen_width
            let hp = (h_index + screen_height/2)/screen_height

            wp*=(screen_width_pixels-1)
            hp*=(screen_height_pixels-1)
            wp = Math.floor(wp)
            hp = Math.floor(hp)*/
            x1 = (w_index + screen_width/2)/screen_width
            y1 = (h_index + screen_height/2)/screen_height

            x1*=(screen_width_pixels-1)
            y1*=(screen_height_pixels-1)
            x1 = Math.floor(x1)
            y1 = Math.floor(y1)

            //document.getElementById(wp+','+hp).style.backgroundColor = colour;
        }
        else
        {
            x1=Math.floor(newCp1[0])
            y1=Math.floor(newCp1[1])
        }
        if(newCp2.length == 3)//for not completely mixed direction
        {
            let w_index = (p2[0]-newCp2[0])*x_to_width + (p2[1]-newCp2[1])*y_to_width + (p2[2]-newCp2[2])*z_to_width
            let h_index = (p2[0]-newCp2[0])*x_to_height + (p2[1]-newCp2[1])*y_to_height + (p2[2]-newCp2[2])*z_to_height

            let distance = Math.sqrt((origin[0]-newCp2[0])**2 + (origin[1]-newCp2[1])**2 + (origin[2]-newCp2[2])**2)

            let screen_width = distance * width_growth_factor
            let screen_height = distance * height_growth_factor

            x2 = (w_index + screen_width/2)/screen_width
            y2 = (h_index + screen_height/2)/screen_height

            x2*=(screen_width_pixels-1)
            y2*=(screen_height_pixels-1)
            x2 = Math.floor(x2)
            y2 = Math.floor(y2)

            //document.getElementById(wp+','+hp).style.backgroundColor = colour;
        }
        else
        {
            x2=Math.floor(newCp2[0])
            y2=Math.floor(newCp2[1])
        }
        /*else//when direction is fully mixed math is donw in find center
        {
            //document.getElementById(Math.floor(newC[0])+','+Math.floor(newC[1])).style.backgroundColor = colour;
        }*/
       dl(x1,y1,x2,y2);

    }
}