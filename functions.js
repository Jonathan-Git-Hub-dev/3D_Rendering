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

function line_of_sight_vector(z_angle, xy_angle)
{
    let z_movement = Sin(z_angle);
    
    let remainder =  Math.sqrt(1 - (z_movement ** 2));

    let x_movement;
    let y_movement;

    if(xy_angle < 90)
    {
        x_movement = Sin(xy_angle) * remainder
        y_movement = -1*Cos(xy_angle) * remainder
    }   
    else if(xy_angle < 180)
    {
        x_movement = Cos(xy_angle-90) * remainder
        y_movement = Sin(xy_angle-90) * remainder
    }
    else if(xy_angle < 270)
    {
        x_movement = -1*Sin(xy_angle-180) * remainder
        y_movement = Cos(xy_angle-180) * remainder
    }
    else// < 360 
    {
        x_movement = -1*Cos(xy_angle-270) * remainder
        y_movement = -1*Sin(xy_angle-270) * remainder
    }

    return [x_movement, y_movement, z_movement];
}

function line_of_sight_vector_xy(xy_angle)
{
    let x_movement;
    let y_movement;

    if(xy_angle < 90)
    {
        x_movement = Sin(xy_angle)
        y_movement = -1*Cos(xy_angle)
    }   
    else if(xy_angle < 180)
    {
        x_movement = Cos(xy_angle-90)
        y_movement = Sin(xy_angle-90)
    }
    else if(xy_angle < 270)
    {
        x_movement = -1*Sin(xy_angle-180)
        y_movement = Cos(xy_angle-180)
    }
    else// < 360 
    {
        x_movement = -1*Cos(xy_angle-270)
        y_movement = -1*Sin(xy_angle-270)
    }

    return [x_movement, y_movement];
}

function clear()//changes all pixelss back to aqua
{
    for(let i=0; i < (screen_width_pixels*screen_height_pixels) ; i++)
    {
        document.getElementById(String(i%screen_width_pixels)+","+String(Math.floor(i/screen_width_pixels))).style.backgroundColor = "aqua"
        rendered[Number(String(i%screen_width_pixels))][Number(String(Math.floor(i/screen_width_pixels)))] = false;
    }
}

function roughly_equal(arr1, arr2)
{
    for(let i=0; i< arr1.length; i++)
    {
        if(arr1[i].toFixed(5) != arr2[i].toFixed(5))
        {
            return false;
        }
    }
    return true
}

function through_origin(origin, p1, p2)
{
    //if points pass through origin
    //to some level of presison

    let between_line_vector = [p1[0]-p2[0],p1[1]-p2[1],p1[2]-p2[2]]

    /*parametric form 
        x = p1[0] + t * between_line_vector[0]
        y = p1[1] + t * between_line_vector[1]
          z = p1[2] + t * between_line_vector[2]
    */

    /*
        p[0,0,0]
        v[1,0,0]
    */

    //if component of vector is 0 avoid it
    if(between_line_vector[0] != 0)
    {
        //find t for origin x
        let t = origin[0]-p1[0]/between_line_vector[0];
        let y = p1[1] + t * between_line_vector[1]
        let z = p1[2] + t * between_line_vector[2]

        return roughly_equal(origin, [origin[0],y,z])
    }
    else if(between_line_vector[1] != 0)
    {
        let t = origin[1]-p1[1]/between_line_vector[1];
        let x = p1[0] + t * between_line_vector[0]
        let z = p1[2] + t * between_line_vector[2]

        return roughly_equal(origin, [x,origin[1],z])
    }
    else
    {//z 
        let t = origin[2]-p1[2]/between_line_vector[2];
        let x = p1[0] + t * between_line_vector[0]
        let y = p1[1] + t * between_line_vector[1]

        return roughly_equal(origin, [x,y,origin[2]])
    }
}

function arbitray_line_endpoint(p1, p2)
{
    console.log('this kind of sucks')
    //p1 is our start point

    //with gradient from p1 to p2 find where the line exits screen and make this point p2 
    let rise = p1[1]-p2[1];
    let run = p1[0]-p2[0];

    if(rise == 0)
    {
        if(p1[0] - p2[0] < 0)
        {//going right
            p2[0] = screen_width_pixels-1
        }
        else
        {//goinf left
            p2[0] = 0
        }

        return [p1,p2]
    }


    if(run == 0)
    {
        if(p1[1] - p2[1] < 0)
        {//going right
            p2[1] = screen_height_pixels-1
        }
        else
        {//goinf left
            p2[1] = 0
        }

        return [p1,p2]
    }

    let gradient = rise/run;
    let intercept = p2[1] - gradient*p2[0];

    //which way is x moving p2[0] - p1[0]
    let x_mov = p2[0] - p1[0]
    let y_mov = p2[1] - p1[1]

    if(x_mov > y_mov)
    {
        if(x_mov < 0)
        {
            p2[0] = -100000000
            p2[1] = gradient*p2[0]+intercept
        }
        else
        {
            p2[0] = 100000000
            p2[1] = gradient*p2[0]+intercept
        }
    }
    else//y or both the same
    {
        if(y_mov < 0)
        {
            p2[1] = -100000000
            p2[0] = Math.floor((p2[1]-intercept)/gradient)
        }
        else
        {
            p2[1] = 100000000
        p2[0] = Math.floor((p2[1]-intercept)/gradient)
        }
    }




    return [p1,p2]
}


/*function line_endpoint(p1, p2)
{
    //p1 is our start point

    //with gradient from p1 to p2 find where the line exits screen and make this point p2
    let gradient = p1[1]-p2[1]/p1[0]-p2[0];
    let intercept = p2[1] - gradient*p2[0];

    //


    return [p1,p2]
}*/

function line(colour, x1,y1,x2,y2)
{//this algorithm was copied from google
    //const points = [];
    //console.log("Inital: " + x1 + " " + x2 + " " + y1 + " " + y2)
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    let sx = (x2 < x1) ? 1 : -1;
    let sy = (y2 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        let temp = document.getElementById( String(Math.round(x2))+','+String(Math.round(y2)))
        temp.style.backgroundColor = colour;
        
        //console.log(temp)
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

function infront_or_behind(point, origin, vector)
{
    //opistie 'movement' vector
    let opposite_vector = [-1 * vector[0], -1 * vector[1], -1 * vector[2]]

    let front_point = [origin[0] + vector[0], origin[1] + vector[1], origin[2] + vector[2]]
    let behind_point = [origin[0] + opposite_vector[0], origin[1] + opposite_vector[1], origin[2]+opposite_vector[2]]

    //find which of these 'dots' our point is closest to

    //note no need to square root
    let front_dist = (front_point[0]-point[0])**2 + (front_point[1]-point[1])**2 + (front_point[2]-point[2])**2
    let back_dist = (behind_point[0]-point[0])**2 + (behind_point[1]-point[1])**2 + (behind_point[2]-point[2])**2

    if(front_dist < back_dist)
    {
        return true
    }

    return false;//behind or on the plane of origin
}


function behind_and_infront(p1, p2, origin, vector)
{
    //figure out how to render point running from infront of user to behind user


    //find the point infront and the point behind
    //may be both in which case this point does not need to be redered
    //this functionality will probably be moved out at one point
    let front_point;
    let behind_point;
    
    //function only called when one point behind and one point infront
    //find that point
    if(infront_or_behind(p1, origin, vector))
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

    }while(!infront_or_behind(p3, origin, vector))

    //plot both points to find gradient
    //save p1 plot
    //find where gradient intersects border and use that as the second point for the line 

    return [front_point, p3];
    

}

function on_screen(point)
{
    if(point[0] < 0 || point[0] >= screen_width_pixels || point[1] < 0 || point[1] >= screen_height_pixels)
    {
        return false;
    }

    return true;
}

function pass_through_screen(p1, p2)
{
    console.log("pts " + p1 + " " +  p2)

    let rise = p1[1] - p2[1];
    let run = p1[0] - p2[0];
    
    //dont want gradinet to be infinety
    if(rise == 0)
    {
        //flat line
        //if points on the correct y level
        if(p1[1] >=0 && p1[1] < screen_height_pixels)
        {
            //if they cros the left or right side
            let small_x = Math.min(p1[0], p2[0])
            let big_x = Math.max(p1[0], p2[0])
            if(small_x < screen_width_pixels && big_x >= 0)
            {
                return true;
            }
        }
        return false;
    }
    if(run == 0)
    {
        //vertical line
        //if points on the correct x level
        if(p1[0] >=0 && p1[0] < screen_width_pixels)
        {
            //if they cros the left or right side
            let small_y = Math.min(p1[1], p2[1])
            let big_y = Math.max(p1[1], p2[1])
            if(small_y < screen_height_pixels && big_y >= 0)
            {
                return true;
            }
        }
        return false;
       
    }
    //console.log(p1+" "+p2)
    let gradient = rise/run
    let intercept = p2[1] - gradient*p2[0];
    console.log("grad here should be checked " + gradient +" "+ intercept);

    let left_point = gradient*0+intercept;
    if(left_point >= 0 && left_point <screen_height_pixels)
    {
        //console.log('111111');
        if((left_point <= p1[1] && left_point >= p2[1]) || (left_point <= p2[1] && left_point >= p1[1]))
        {
            return true
        }
    }
    let right_point = gradient*(screen_width_pixels-1)+intercept;
    if(right_point >= 0 && right_point < screen_height_pixels)
    {
        //console.log('222222');
        if((right_point <= p1[1] && right_point >= p2[1]) || (right_point <= p2[1] && right_point >= p1[1]))
        {
            return true
        }
    }
    let top_point = -1*intercept/gradient
    console.log('top_point ' + top_point)
    if(top_point >=0 && top_point < screen_width_pixels)
    {
        //console.log('33333');
        //console.log(top_point + "  tp")
        //return true
        console.log('>>> ' + p1[1] + " " + top_point + " " + p2[1])
        console.log((top_point <= p1[1]))
        console.log((top_point >= p2[1]))
        console.log((top_point <= p2[1]))
        console.log((top_point >= p1[1]) + " " + p1[1] + " " + top_point)

        if((top_point <= p1[0] && top_point >= p2[0]) || (top_point <= p2[0] && top_point >= p1[0]))
        {
            console.log('very very food')
            return true
        }
    }
    let bottom_point = ((screen_height_pixels-1)-intercept)/gradient;
    if(bottom_point >=0 && bottom_point < screen_width_pixels)
    {
        //console.log('44444');
        //return true
        if((bottom_point <= p1[0] && bottom_point >= p2[0]) || (bottom_point <= p2[0] && bottom_point >= p1[0]))
        {
            return true
        }
    }
    //check for y = min or max if x in correct range

    //console.log('does not pass through')
    return false;
}

/*function pass_through_screen(p1, p2)
{
    let gradient = p1[1]-p2[1]/p1[0]-p2[0];
    let intercept = p2[1] - gradient*p2[0];

    let left_point = gradient*0+intercept;
    if(left_point >= 0 && left_point <screen_height_pixels)
    {
        return true
    }
    let right_point = gradient*(screen_width_pixels-1)+intercept;
    if(right_point >= 0 && right_point <screen_height_pixels)
    {
        return true
    }
    let top_point = -1*intercept/gradient
    if(top_point >=0 && top_point < screen_width_pixels)
    {
        return true
    }
    let bottom_point = ((screen_height_pixels-1)-intercept)/gradient;
    if(bottom_point >=0 && bottom_point < screen_width_pixels)
    {
        return true
    }
    //check for y = min or max if x in correct range


    return false;
}*/



/*function atleast_one(p1, p2)
{
    if((p1[0] < 0 || p1[0] >= screen_width_pixels || p1[1] < 0 || p1[1] >= screen_height_pixels) 
        && (p2[0] < 0 || p2[0] >= screen_width_pixels || p2[1] < 0 || p2[1] >= screen_height_pixels))
    {
        return false;
    }
    return true;
}*/

function bothto(p1,p2)
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
    //console.log(p1+" "+p2)
    let rise = p2[1]-p1[1]
    let run = p2[0]-p1[0]

    if(rise == 0)
    {
        p1[0] = Math.min(screen_width_pixels-1, p1[0])
        p2[0] = Math.min(screen_width_pixels-1, p2[0])
        p1[0] = Math.max(0, p1[0])
        p2[0] = Math.max(0, p2[0])

        return [p1,p2]
    }
    if(run == 0)
    {
        p1[1] = Math.min(screen_height_pixels-1, p1[1])
        p2[1] = Math.min(screen_height_pixels-1, p2[1])
        p1[1] = Math.max(0, p1[1])
        p2[1] = Math.max(0, p2[1])
        return [p1,p2]
    }
    


    
    let gradient = rise/run
    let intercept = p2[1] - gradient*p2[0];
    //console.log("int:" + intercept)
    //p[1] = g*p[0] + b
    //b=p[1] - g*p[0]

    //x = (y-b)/g
    //console.log("evil points " + p1 + " " + p2);

    if(p1[0] < 0)
    {
        //what is y when x = 0
        p1[0] = 0
        p1[1] = Math.floor(intercept)
    }
    if(p1[1] < 0)
    {
        //what is x when y = 0
        p1[1] = 0
        p1[0] = Math.floor((-intercept)/gradient)
    }
    if(p1[0] >= screen_width_pixels)
    {
        //what is y when x is screen_width_pixels
        p1[0] = screen_width_pixels-1
        p1[1] = Math.floor(gradient*p1[0]+intercept)
    }
    if(p1[1] >= screen_height_pixels)
    {
        //what is x when y = screen_height_pixels
    
        p1[1] = screen_height_pixels-1
        p1[0] = Math.floor((p1[1]-intercept)/gradient)
    }


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
        //console.log('here')
        p2[1] = screen_height_pixels-1
        p2[0] = Math.floor((p2[1]-intercept)/gradient)
        console.log(p2[0] + " " + intercept+ " " + gradient)
    }

    //console.log(p1+" "+p2)

    return [p1,p2]
}

/*function truncate(p1,p2)
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
}*/

