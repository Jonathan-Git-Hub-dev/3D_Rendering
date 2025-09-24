console.log("Grad might be infinety")

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
    render("orange", lines, origin, z_angle, xy_angle);
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