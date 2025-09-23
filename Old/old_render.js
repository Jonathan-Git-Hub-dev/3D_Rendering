function render(colour, ps, origin, z_angle, xy_angle)
{
    let [x_to_width, x_to_height, y_to_width, y_to_height, z_to_width, z_to_height] = ratios(z_angle, xy_angle)

    for(let i=0; i<ps.length; i++)
    {
        //find the center of the screen for this point
        let newC = find_center(origin, ps[i], z_angle, xy_angle)

        console.log('new center '+ newC)
        if(newC.length == 3)//for not completely mixed direction
        {
            let w_index = (ps[i][0]-newC[0])*x_to_width + (ps[i][1]-newC[1])*y_to_width + (ps[i][2]-newC[2])*z_to_width
            let h_index = (ps[i][0]-newC[0])*x_to_height + (ps[i][1]-newC[1])*y_to_height + (ps[i][2]-newC[2])*z_to_height

            let distance = Math.sqrt((origin[0]-newC[0])**2 + (origin[1]-newC[1])**2 + (origin[2]-newC[2])**2)

            let screen_width = distance * width_growth_factor
            let screen_height = distance * height_growth_factor

            let wp = (w_index + screen_width/2)/screen_width
            let hp = (h_index + screen_height/2)/screen_height

            wp*=(screen_width_pixels-1)
            hp*=(screen_height_pixels-1)
            wp = Math.floor(wp)
            hp = Math.floor(hp)

            document.getElementById(wp+','+hp).style.backgroundColor = colour;
        }
        else//when direction is fully mixed math is donw in find center
        {
            document.getElementById(Math.floor(newC[0])+','+Math.floor(newC[1])).style.backgroundColor = colour;
        }
    }
}