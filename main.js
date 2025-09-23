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
        //console.log("called")
        let p1 = lines[i][0]
        let p2 = lines[i][1]
        //i fully expect this check to be incorrect
        //if(quick_check(origin, p1, z_angle, xy_angle) || quick_check(origin, p2, z_angle, xy_angle))
        //{

        


           //find the center of the screen for this point
        let p11 = translate_2d(origin, p1, z_angle, xy_angle, vector)
        let p22 = translate_2d(origin, p2, z_angle, xy_angle, vector)
        //let x1,x2,y1,y2

        
        /*else//when direction is fully mixed math is donw in find center
        {
            //document.getElementById(Math.floor(newC[0])+','+Math.floor(newC[1])).style.backgroundColor = colour;
        }*/
        //if(atleast_one([x1,y1], [x2,y2]))
        //{
            //let [p11, p22] = truncate([x1,y1],[x2,y2])
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