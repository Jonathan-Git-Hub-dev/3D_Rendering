//import {screen_width_pixels, screen_height_pixels, width_growth_factor, height_growth_factor} from './variables.js'

//what if point one beyond left of screen and point two passed the right boundery



/*
    missions

    find plane at orgin and use that to figure out infront or behind
    to draw on screen atleast one point must be on screen
    infront of screen but both points of to the side
    one point in front of screen one point behind(not exactly sure how to tackle this)
*/

//is it posible to have a point off of the screen to the left per say and a point behind the user that produces stuff of the screen
console.log("not sure if the above question is true or not, currently acting as if it is defacto false")

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

function line(x1,y1,x2,y2)
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

function infront_or_behind(point, origin, z_angle, xy_angle)
{

    //find 'movement' vector
    let temp_z_angle = (z_angle < 90 ? -1*(90-z_angle): z_angle-90);
    //let temp_xy_angle = xy_angle
    let zgrad = Sin(temp_z_angle);
    //console.log("zan " + temp_z_angle +" zg " + zgrad);
    let remainder =  Math.sqrt(1-zgrad**2);

    let xgrad;
    let ygrad;
    if(xy_angle < 90)
    {
        ygrad = -1*Cos(xy_angle) * remainder
        xgrad = Sin(xy_angle) * remainder
    }   
    else if(xy_angle < 180)
    {
        ygrad = Sin(xy_angle-90) * remainder
        xgrad = Cos(xy_angle-90) * remainder
    }
    else if(xy_angle < 270)
    {
        ygrad = Cos(xy_angle-180) * remainder
        xgrad = -1*Sin(xy_angle-180) * remainder
    }
    else//< 360 
    {
        ygrad = -1*Sin(xy_angle-270) * remainder
        xgrad = -1*Cos(xy_angle-270) * remainder
    }

    //opistie 'movement' vector
    let opposite_zgrad = -1*zgrad
    let opposite_xgrad = -1*xgrad
    let opposite_ygrad = -1*ygrad

    let front_point = [origin[0] + xgrad, origin[1] + ygrad, origin[2] + zgrad]
    let behind_point = [origin[0] + opposite_xgrad, origin[1] + opposite_ygrad, origin[2]+opposite_zgrad]

    //find which of these 'dot' our point is closest to

    //note no need to square root
    let front_dist = (front_point[0]-p1[0])**2 + (front_point[1]-p1[1])**2 + (front_point[2]-p1[2])**2
    let back_dist = (behind_point[0]-p1[0])**2 + (behind_point[1]-p1[1])**2 + (behind_point[2]-p1[2])**2

    if(front_dist < back_dist)
    {
        return true
    }

    return false;//behind or on the plane of origin

}


function behind_and_infront(p1, p2, origin, z_angle, xy_angle)
{
    console.log("i think this may have be solved byut what is point is on the plane of origin");

    //figure out how to render point running from infront of user to behind user

    //old aglo
        //from now on p1 is the point on the screen
        //find the difference between the points p1-p2
        //add this difference to p1 to create p3
        //p3 is garentted to be infront of origin
        //find p3s cowardinates on screen
        //find the gradient between p1 and p3
        //to plot the line between p1 and p2 use -1*gradient from p1 until edge of the screen is reached

    //find the point infront and the point behind
    //may be both in which case this point does not need to be redered
    //this functionality will probably be moved out at one point
    let front_point;
    let behind_point;
    
    if(!infront_or_behind(p1, origin, z_angle, xy_angle) && !infront_or_behind(p2, origin, z_angle, xy_angle))
    {
        return;
    }
    if(infront_or_behind(p1, origin, z_angle, xy_angle) && infront_or_behind(p2, origin, z_angle, xy_angle))
    {
        return;
    }
    if(infront_or_behind(p1, origin, z_angle, xy_angle))
    {
        front_point = p1
        behind_point = p2
    }
    else
    {
        front_point = p2
        behind_point = p1
    }

    //p3 is a point half way between p1 and p2
    //if this point is still behind origin p3 becomes halfway between p1 and p3
    let p3;
    do
    {
        //p-1 //p-8 half way =-4.5
        let xdif = (behind_point[0] - front_point[0])/2
        let ydif = (behind_point[1] - front_point[1])/2
        let zdif = (behind_point[2] - front_point[2])/2

        p3 = [behind_point[0] - xdif,behind_point[1] - ydif,behind_point[2] - zdif]
        behind_point = p3;

    }while(!infront_or_behind(p3))

    //plot both points to find gradient
    //save p1 plot
    //find where gradient intersects border and use that as the second point for the line 

}

function triangle_middle(p1,p2,p3)
{
    //take two of the points (arbitrary)
    //for p1 draw a line to the middle point between p2 and p3
    //for p2 second point draw aline to the middle between p1 and p3
    //where these 3d lines intersect is the center of our triangle 
}



function atleast_one(p1, p2)
{
    if((p1[0] < 0 || p1[0] >= screen_width_pixels || p1[1] < 0 || p1[1] >= screen_height_pixels) 
        && (p2[0] < 0 || p2[0] >= screen_width_pixels || p2[1] < 0 || p2[1] >= screen_height_pixels))
    {
        return false;
    }
    return true;
}

function both(p1,p2)
{
    if(p1[0] >= 0 && p1[0] < screen_width_pixels && p1[1] >= 0 && p1[1] < screen_height_pixels 
        && p2[0] >= 0 && p2[0] < screen_width_pixels && p2[1] >= 0 && p2[1] < screen_height_pixels)
    {
        return true;
    }
    return false;
}

function truncate(p1,p2)
{
    //take two points at least one on screen
    if(both(p1,p2))
    {
        return [p1,p2]
    }//now we know exactly one point is of the screen

    //make p2 the off screen point
    if(p1[0] < 0 || p1[0] >= screen_width_pixels || p1[1] < 0 || p1[1] >= screen_height_pixels)
    {//p1 off
        let temp = p2;
        p2 = p1;
        p1 = temp;
    }

    let rise = p2[1]-p1[1]
    let run = p2[0]-p1[0]
    let gradient = rise/run
    let intercept = p2[1] - gradient*p2[0];
    //console.log("int:" + intercept)
    //p[1] = g*p[0] + b
    //b=p[1] - g*p[0]

    //x = (y-b)/g
    //console.log("evil points " + p1 + " " + p2);

    if(p2[0] < 0)
    {
        //what is y when x = 0
        p2[0] = 0
        p2[1] = Math.floor(intercept)
    }
    if(p2[1] < 0)
    {
        //what is x when y = 0
        p2[1] = 0
        p2[0] = Math.floor((-intercept)/gradient)
    }
    if(p2[0] >= screen_width_pixels)
    {
        //what is y when x is screen_width_pixels
        p2[0] = screen_width_pixels-1
        p2[1] = Math.floor(gradient*p2[0]+intercept)
    }
    if(p2[1] >= screen_height_pixels)
    {
        //what is x when y = screen_height_pixels
    
        p2[1] = screen_height_pixels-1
        p2[0] = Math.floor((p2[1]-intercept)/gradient)
    }

    return [p1,p2]
}


function render(colour, lines, origin, z_angle, xy_angle)
{
    let [x_to_width, x_to_height, y_to_width, y_to_height, z_to_width, z_to_height] = ratios(z_angle, xy_angle)

    for(let i=0; i<lines.length; i++)
    {
        //console.log("called")
        let p1 = lines[i][0]
        let p2 = lines[i][1]
        //i fully expect this check to be incorrect
        //if(quick_check(origin, p1, z_angle, xy_angle) || quick_check(origin, p2, z_angle, xy_angle))
        //{

        


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
        //if(atleast_one([x1,y1], [x2,y2]))
        //{
            let [p11, p22] = truncate([x1,y1],[x2,y2])
            line(p11[0],p11[1], p22[0], p22[1]);
        //}
             
    }
    //}
}

/*
types of lines to render

both points on screen
one point on screen one point (left right up down)
one point on screen one point behind user
both points (left right up down)

ignore (left,right,up,down to behind screen)




*/