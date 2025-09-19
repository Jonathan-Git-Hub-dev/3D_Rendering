//depending on the anlge the user is looking at
//movements in each direction moves the point on the screen in different ways
//import {Sin, Cos} from './functions.js';

/*
    return in the form of
        - x contribution to horizontal
        - x contribution to vertical
        - y contribution to horizontal
        - y contribution to vertical
        - z contribution to horizontal
        - z contribution to vertical

*/
function ratios(z_angle, xy_angle)
{
    //rations for when the user is neither looking up or down
    if(z_angle == 90)
    {
        if(xy_angle == 0)
        {
            return [1,0,0,0,0,1]
        }
        if(xy_angle < 90)
        {
            return [Cos(xy_angle).toFixed(5) ,0, Sin(xy_angle).toFixed(5) ,0,0,1]
        }
        if(xy_angle < 180)
        {
            return [-1*Sin(xy_angle-90),0,Cos(xy_angle - 90),0,0,1]
        }
        if(xy_angle < 270)
        {
            return [-1*Cos(xy_angle - 180),0,-1*Sin(xy_angle - 180),0,0,1]
        }
        if(xy_angle < 360)
        {
            return [Sin(xy_angle - 270),0,-1*Cos(xy_angle - 270),0,0,1]
        }
    }
          
    if(z_angle < 90)//looking up
    {
        if(xy_angle == 0)
        {
            return [1,0,0,-1*Sin( 90 - z_angle),0, Sin(z_angle)]
        }
        
        if(xy_angle == 90)
        {
            return [0,Sin(90-z_angle),-1,0,0,Sin(z_angle)] 
        }
        
        if(xy_angle == 180)
        {
            console.log("changed here");
            return [1,0,0,-1*Sin(90 - z_angle),0,-1*Sin(z_angle)] 
        }
        
        if(xy_angle == 270)
        {
            return [0,-1*Sin(90 - z_angle),-1,0,0,Sin(z_angle)] 
        }
    }
    else//looking down
    { 
        if(xy_angle == 0)
        {
            return [1,0,0,Sin(z_angle - 90),0,Sin(z_angle)]
        }
        
        if(xy_angle == 90)
        { 
            return [0,-1*Sin(z_angle-90),1,0,0,Sin(z_angle)] 
        }
        
        if(xy_angle == 180)
        {
            return [1,0,0,-1*Sin(z_angle-90),0,Sin(z_angle)]
        }
        
        if(xy_angle == 270)
        { 
            return [0,Sin(z_angle-90),1,0,0,Sin(z_angle)] 
        }
    }

    //when user is looking in a truely mixed angle no need for a ratio as these agles are handled a different way
    return [];
}