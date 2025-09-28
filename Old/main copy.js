console.log("Grad might be infinety")

let rendered;

function create_screen()//initializes the display
{
        const container = document.getElementById("container")
        for(let i=0; i<screen_width_pixels*screen_height_pixels; i++)
        {
            const newDiv = document.createElement("div");
            newDiv.classList = "s_p";
            newDiv.id = String(i%screen_width_pixels)+","+String(Math.floor(i/screen_width_pixels));//0-79
            container.appendChild(newDiv);
            //rendered[String(i%screen_width_pixels)+","+String(Math.floor(i/screen_width_pixels))] = false;
        
        }

        const rows = screen_height_pixels;
        const columns = screen_width_pixels;
        rendered = [];

        for (let i = 0; i < columns; i++) 
        {
            rendered[i] = []; // Initialize each row as an empty array
            for (let j = 0; j < rows; j++) {
                rendered[i][j] = false;
                //console.log(i+' '+j + rendered[i][j])
            }
        }

        document.addEventListener('keydown', move_user)
        //render("orange", points, origin, z_angle, xy_angle);
        //render("orange", lines, origin, z_angle, xy_angle);

        

        //doing face 1,0,-1, 0,0,-1, 0,0,0 has parent 0,-1,-1, 0,0,-1, 0,-1,0
        //doing face 1,0,-1, 0,0,-1, 0,0,0 has parent 0,-1,-1, 0,0,-1, 0,-1,0
        ///let fff =  [[0,-1,-1], [0,0,-1] ,[0,-1,0]]
        /*let fff = [[0,-1,-1], [0,0,-1], [0,-1,0]]

        console.log('out fff ' + fff)
        temp = list_neighbours(fff, sss1)
        console.log('solution ? ' + temp.length)
        for(let i=0; i<temp.length; i++)
        {
            //next.push([temp[i], face1])//needs the face, the center of the parent and parent face
            console.log(temp[i])
        }*/



        //console.log('ALL DONE');
        center_inside_outside = first_centre(sss1)
        console.log(center_inside_outside)
        //console.log(sss1)
        //console.log(center_inside_outside.get(sss1[0])[0])
        render2(center_inside_outside, 'green' ,sss1, origin, z_angle, xy_angle);


        //triangle_middle([3,0,0],[1,0,0],[0,2,1])
        //first_centre(sss1)
        /*let face = [[1,0,0],[1,-1,0],[1,-1,-1]]
        let list = list_neighbours(face, sss1)
        console.log('neighbours for ' + face + " " + list.length)
        for(let i=0; i<list.length;i++)
        {
            console.log(list[i]);
        }*/

        
}

function move_user(event)
{
    event.preventDefault();
    const pressedKey = event.key;


    let step_size = 0.25;
    let vector = line_of_sight_vector_xy(xy_angle);
    //console.log("vect " + vector)

    //movement
    if (pressedKey === 'a')
    {
        //if user move ax by move
        let x_movement = step_size * vector[1]
        let y_movement = step_size * vector[0]
        origin = [origin[0] + x_movement ,origin[1] - y_movement ,origin[2]]
    }
    else if (pressedKey === 'w')
    {
        let x_movement = step_size * vector[0]
        let y_movement = step_size * vector[1]
        origin = [origin[0] + x_movement ,origin[1] + y_movement ,origin[2]]
    }
    else if (pressedKey === 's')
    {
        let x_movement = step_size * vector[0]
        let y_movement = step_size * vector[1]
        origin = [origin[0] - x_movement ,origin[1] - y_movement ,origin[2]]
    }
    else if (pressedKey === 'd')
    { 
        let x_movement = step_size * vector[1]
        let y_movement = step_size * vector[0]
        origin = [origin[0] - x_movement ,origin[1] + y_movement ,origin[2]]
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
        if(z_angle > -80)//currently doesnt support looking completely up
            z_angle-=1
    }
    else if(pressedKey === 'ArrowDown')
    {
        if(z_angle < 80)//currently doesnt support looking completely down
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
    //render("orange", lines, origin, z_angle, xy_angle);

    render2(center_inside_outside,"orange", sss1, origin, z_angle, xy_angle);
    document.getElementById(100+','+50).style.backgroundColor = 'black';
}

function render(colour, lines, origin, z_angle, xy_angle)
{
    let vector = line_of_sight_vector(z_angle, xy_angle);

    for(let i=0; i<lines.length; i++)
    {
        //console.log("df")
        let p1 = lines[i][0]
        let p2 = lines[i][1]
       
        //if both lines behind screen
        let p1_check = infront_or_behind(p1, origin, vector)
        let p2_check = infront_or_behind(p2, origin, vector)

        //console.log(p1_check + " " + p2_check)
        if(p1_check && p2_check)//both lines infront of origin
        {
            //console.log('first')
            let p11 = translate_2d(origin, p1, z_angle, xy_angle, vector)
            if(p11 == false){continue;}
            let p22 = translate_2d(origin, p2, z_angle, xy_angle, vector)
            if(p22 == false){continue;}
            //console.log("before checks" + p11 + " " + p22)
            //console.log("pass truough ?: " + pass_through_screen(p11,p22))

            //just because point are infront of user doesnt mean they have a pressence on the screen
            if(on_screen(p11) || on_screen(p22) || pass_through_screen(p11,p22))
            {
                //console.log("df new");
                [p11,p22] = truncate(p11,p22);
                line(colour, p11[0],p11[1], p22[0], p22[1]);
            }

            //line(colour, p11[0],p11[1], p22[0], p22[1]);
        //}
        }
        else if(p1_check || p2_check)
        {
            //all points behind user draw lines that end of screen unless point passes though origin in which cas no line is drawn at all

             let new_p1, new_p2;
            console.log('second')
            //one point infront one point behind
            if(through_origin(origin, p1, p2))
            {
                if(p1_check)
                {
                    //line(colour, p1[0],p1[1], p1[0], p1[1]);
                    new_p1 = p1
                    new_p2=[p1[0], p1[1]]
                }
                else
                {
                    new_p2 = p2
                    new_p1=[p2[0], p2[1]]
                    //line(colour, p2[0],p2[1], p2[0], p2[1]);
                } 

            }
            else
            {
                [new_p1, new_p2] = behind_and_infront(p1, p2, origin, vector)
            }
            //console.log("done new editions");
            //console.log("new points " + new_p1 + " " + new_p2)
            let p11 = translate_2d(origin, new_p1, z_angle, xy_angle, vector)
            if(p11 == false){continue;}
            let p22 = translate_2d(origin, new_p2, z_angle, xy_angle, vector)
            if(p22 == false){continue;}

            //console.log("new points " + p11 + " " + p22)
            
            if(on_screen(p11) || on_screen(p22) || pass_through_screen(p11,p22))
            {
                //console.log('now 2d ' + p11+"  "+ p22);

                let [p111, p222] = arbitray_line_endpoint(p11, p22)

                //console.log('after arb ' + p111 + " " + p222)

                let [p1111,p2222] = truncate(p111,p222);
                line(colour, p1111[0],p1111[1], p2222[0], p2222[1]);
            }

            //find the first p3 that is on screen if any
            //simple check for any (maybe im too stupid)







            //at distanve of 1 unit
            //find 4 corners of this screen 
            //lines from origin to this points
            //4 planes defines by these 4 lines
            //find if lines intersects any of these planes
            //check if this intercetion is infrom of screen not behind
            //find the closest of these intersections
            //this is wrong
            

            
        }
        
        //else both point behind user impossible render this line on screen

    }//console.log('done round')
}

/*
types of lines to render

both points on screen
one point on screen one point (left right up down)
one point on screen one point behind user
both points (left right up down)

ignore (left,right,up,down to behind screen)




*/

/*
let p1 = lines[i][0]
        let p2 = lines[i][1]
        //i fully expect this check to be incorrect
        //if(quick_check(origin, p1, z_angle, xy_angle) || quick_check(origin, p2, z_angle, xy_angle))
        //{

        


           //find the center of the screen for this point
        let p11 = translate_2d(origin, p1, z_angle, xy_angle, vector)
        let p22 = translate_2d(origin, p2, z_angle, xy_angle, vector)
        //let x1,x2,y1,y2

        
        
        //if(atleast_one([x1,y1], [x2,y2]))
        //{
            //let [p11, p22] = truncate([x1,y1],[x2,y2])
            line(colour, p11[0],p11[1], p22[0], p22[1]);
        //}

*/


function tri(v0, v1, v2, colour_arr)
{
    
    //console.log('tri called ' + v0 + " " +v1 + " " +v2)
    //https://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
    let maxX = Math.max(v0[0], v1[0], v2[0])
    let maxY = Math.max(v0[1], v1[1], v2[1])
    let minX = Math.min(v0[0], v1[0], v2[0])
    let minY = Math.min(v0[1], v1[1], v2[1])

    for(let y=minY; y<=maxY;y++)
    {
        //console.log('ops')
        for(let x=minX; x<=maxX;x++)
        {
            let p = {x: x, y: y} // Current pixel

            let edge0_val = (p.x - v0[0]) * (v1[1] - v0[1]) - (p.y - v0[1]) * (v1[0] - v0[0])
            // For edge v1-v2:
            let edge1_val = (p.x - v1[0]) * (v2[1] - v1[1]) - (p.y - v1[1]) * (v2[0] - v1[0])
            // For edge v2-v0:
            let edge2_val = (p.x - v2[0]) * (v0[1] - v2[1]) - (p.y - v2[1]) * (v0[0] - v2[0])

            console.log(Number(String(Math.round(p.x)))+" "+Number(String(Math.round(p.y))))
            if(rendered[Number(String(Math.round(p.x)))][Number(String(Math.round(p.y)))] == true)//square not already rendered in
            {

            }
            else if (edge0_val >= 0 && edge1_val >= 0 && edge2_val >= 0)
            {
                //console.log('before crash ' + p.x + " " +p.y);
                let temp = document.getElementById( String(Math.round(p.x))+','+String(Math.round(p.y)))
                rendered[String(Math.round(p.x))+','+String(Math.round(p.y))] = true;
                temp.style.backgroundColor = 'rgb('+ colour_arr[0] +','+ colour_arr[1] +','+ colour_arr[2] +')';
            }


        }
    }
     //console.log('done')

}

console.log('colour_calc is broken but i dont really mind')
function calc_colour(r,g,b, face, inside_point)
{
    let darkness = 0;
    //darkens colour (add black) depending on light anlge

    //light comes from the top so 50% if brightness is decided here
    //light also comes from the -y direction the other %50 for brightness

    //find angle with z
    //kinda have no idea what i am doing
    //find center of face
    //find highest point
    let mid =  triangle_middle(face[0],face[1],face[2])
    let highest;
    if(face[0][2] >= face[1][2] && face[0][2] >= face[2][2])
    {
        highest = face[0]
    }
    if(face[1][2] >= face[0][2] && face[1][2] >= face[2][2])
    {
        highest = face[1]
    }
    if(face[2][2] >= face[0][2] && face[2][2] >= face[1][2])
    {
        highest = face[2]
    }

    let z_comp = highest[2]-mid[2]

    if(z_comp == 0)
    {
        //flat
        //now check if inside point above or bellow
        if(inside_point[2] > mid[2])
        {
            darkness+=50
        }
    }
    else
    {
        //let xy_comp = Math.sqrt((highest[0]-mid[0])**2 + (highest[1]-mid[1])**2)
        let tempv = vector_by_points(mid, highest);

        let angle = Math.abs(Atan(tempv[2],(tempv[0]+tempv[1])))
        if(inside_point[2] > mid[2])
        {
            darkness+= Sin(angle) * 25
        }
        else//under
        {
            darkness+=25
            darkness+= Sin(angle) * 25
        }

    }


    //apply when balck is 100% value should be 0
    let percen = (100-darkness)/100

    return [r*percen,g*percen,b*percen];


}

function render2(hm, colour, shape, origin, z_angle, xy_angle)
{
    //console.log(shape)
    //console.log('shpe 0' + shape[0])
    //console.log(hm.get(shape[0]))
    //first and basic atemp to render faces
    //console.log('render called')

    let vector = line_of_sight_vector(z_angle, xy_angle);
    for(let i=0; i<shape.length; i++)
    {
        //if closer to inside point then outside dont render this face
        //console.log('i '+i)
        //console.log(hm.get(shape[i]))
        //console.log(distance_total(origin,hm.get(shape[i])[0]) +" "+ distance_total(origin,hm.get(shape[i])[1]))
        if(distance_total(origin,hm.get(shape[i])[0]) < distance_total(origin,hm.get(shape[i])[1]))
        {
            console.log('face skipped 1');
            continue
        }
        else if(distance_total(origin,hm.get(shape[i])[0]) == distance_total(origin,hm.get(shape[i])[1]))
        {
            console.log('face skipped 2');
            continue
        }
        /*//for points in each face
        for(let j=0; j<lines[i].length; j++)
        {
    
        }*/
        let p1 = shape[i][0]
        let p2 = shape[i][1]
        let p3 = shape[i][2]

        let p11 = translate_2d(origin, p1, z_angle, xy_angle, vector)
        let p22 = translate_2d(origin, p2, z_angle, xy_angle, vector)
        let p33 = translate_2d(origin, p3, z_angle, xy_angle, vector)

        let colour_array = calc_colour(255,0,0, shape[i], hm.get(shape[i])[0])

        tri(p11, p22, p33, colour_array)
        tri(p11, p33, p22, colour_array)
        tri(p22, p11, p33, colour_array)
        tri(p22, p33, p11, colour_array)
        tri(p33, p22, p11, colour_array)
        tri(p33, p11, p22, colour_array)

        //tri(colour, p11, p22, p33);
        //line(colour, p11[0],p11[1], p22[0], p22[1]);
        //line(colour, p11[0],p11[1], p33[0], p33[1]);
        //line(colour, p33[0],p33[1], p22[0], p22[1]);


    }


    /*for(let i=0; i<lines.length; i++)
    {
        //console.log("df")
        let p1 = lines[i][0]
        let p2 = lines[i][1]
       
        //if both lines behind screen
        let p1_check = infront_or_behind(p1, origin, vector)
        let p2_check = infront_or_behind(p2, origin, vector)

        //console.log(p1_check + " " + p2_check)
        if(p1_check && p2_check)//both lines infront of origin
        {
            //console.log('first')
            let p11 = translate_2d(origin, p1, z_angle, xy_angle, vector)
            if(p11 == false){continue;}
            let p22 = translate_2d(origin, p2, z_angle, xy_angle, vector)
            if(p22 == false){continue;}
            //console.log("before checks" + p11 + " " + p22)
            //console.log("pass truough ?: " + pass_through_screen(p11,p22))

            //just because point are infront of user doesnt mean they have a pressence on the screen
            if(on_screen(p11) || on_screen(p22) || pass_through_screen(p11,p22))
            {
                //console.log("df new");
                [p11,p22] = truncate(p11,p22);
                line(colour, p11[0],p11[1], p22[0], p22[1]);
            }

            //line(colour, p11[0],p11[1], p22[0], p22[1]);
        //}
        }
        else if(p1_check || p2_check)
        {
            //all points behind user draw lines that end of screen unless point passes though origin in which cas no line is drawn at all

             let new_p1, new_p2;
            console.log('second')
            //one point infront one point behind
            if(through_origin(origin, p1, p2))
            {
                if(p1_check)
                {
                    //line(colour, p1[0],p1[1], p1[0], p1[1]);
                    new_p1 = p1
                    new_p2=[p1[0], p1[1]]
                }
                else
                {
                    new_p2 = p2
                    new_p1=[p2[0], p2[1]]
                    //line(colour, p2[0],p2[1], p2[0], p2[1]);
                } 

            }
            else
            {
                [new_p1, new_p2] = behind_and_infront(p1, p2, origin, vector)
            }
            //console.log("done new editions");
            //console.log("new points " + new_p1 + " " + new_p2)
            let p11 = translate_2d(origin, new_p1, z_angle, xy_angle, vector)
            if(p11 == false){continue;}
            let p22 = translate_2d(origin, new_p2, z_angle, xy_angle, vector)
            if(p22 == false){continue;}

            //console.log("new points " + p11 + " " + p22)
            
            if(on_screen(p11) || on_screen(p22) || pass_through_screen(p11,p22))
            {
                //console.log('now 2d ' + p11+"  "+ p22);

                let [p111, p222] = arbitray_line_endpoint(p11, p22)

                //console.log('after arb ' + p111 + " " + p222)

                let [p1111,p2222] = truncate(p111,p222);
                line(colour, p1111[0],p1111[1], p2222[0], p2222[1]);
            }            
        }
        
        //else both point behind user impossible render this line on screen

    }//console.log('done round')*/
}