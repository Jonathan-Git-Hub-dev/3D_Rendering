import './PagesCSS/screen.css'

import { useEffect, useRef } from 'react';



export default function Screen()
{
    const ref = useRef(null);
    useEffect(()=>{
        for(let i=0; i<width_pixels*height_pixels; i++)
        {
            const newDiv = document.createElement("div");
            newDiv.classList = "s_p";
            newDiv.id = String(i%width_pixels)+","+String(Math.floor(i/width_pixels));//0-79
            ref.current.appendChild(newDiv);
        }
    },[])

    function second_point_3d(origin, screen_origin, point)
    {
        if(origin[0]!=0 || origin[1]!=0 || origin[2])
        {
            console.log("only works ate 0,0,0 should be easy to fix")
        }
        if(screen_origin[0]-origin[0] != 0)//when facing x in some way
        {
            //finding a point in 3d space that has a distance of x and preserves the current angle relationship screen has to origin
            let distance = (point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2;
            let y_to_x_ratio = (screen_origin[1]-origin[1]) / (screen_origin[0]-origin[0])
            let z_to_x_ratio = (screen_origin[2]-origin[2]) / (screen_origin[0]-origin[0])

            let x = Math.sqrt(distance/(1+y_to_x_ratio**2+z_to_x_ratio**2))
            return [x,x*y_to_x_ratio,x*z_to_x_ratio]
        }
        else if(screen_origin[1]-origin[1] != 0)//need to be facing x so ratio works
        {
            let distance = (point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2;
            let x_to_y_ratio = (screen_origin[0]-origin[0]) / (screen_origin[1]-origin[1])
            let z_to_y_ratio = (screen_origin[2]-origin[2]) / (screen_origin[1]-origin[1])
            
            let y = Math.sqrt(distance/(1+x_to_y_ratio**2+z_to_y_ratio**2))
            
            return [x_to_y_ratio*y,y,y*z_to_y_ratio]
        }
        else
        {
            let distance = (point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2;
            let x_to_z_ratio = (screen_origin[0]-origin[0]) / (screen_origin[2]-origin[2])
            let y_to_z_ratio = (screen_origin[1]-origin[1]) / (screen_origin[2]-origin[2])
            
            let z = Math.sqrt(distance/(1+x_to_z_ratio**2+y_to_z_ratio**2))
            
            return [x_to_z_ratio*z,z*y_to_z_ratio,z]
        }
    }
    
    function dist(point, colour, origin, screen_origin)
    {
        let distance =  Math.sqrt((point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2); //console.log("o to p: " + o_to_p);
        let width = distance * screen_width_total;//console.log("width: " + width + " height: " + height)
        let height = distance * screen_height_total;
        let movement = second_point_3d(origin, screen_origin, point);

        


        let n_s = [origin[0]+ movement[0],origin[1]+ movement[1],origin[2]+ movement[2]];//new center
        n_s=[n_s[0].toFixed(5),n_s[1].toFixed(5),n_s[2].toFixed(5)];//rounding error can occur see 5 - 5.000000000000001 

        console.log("POINT: ( " + point + " ) new center: " + n_s)

        //gambling here but our method is 
        //figure out screen plane in reference to n_s
        //find out how a change in x,y,z would move the point on this 2d plane relative to n_s and boaders of plane
        



    
        //document.getElementById(w+','+h).style.backgroundColor = colour
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    return(
        <div>
        <button onClick={async ()=>{
                let distance =  Math.sqrt((point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2); //console.log("o to p: " + o_to_p);
                let width = distance * screen_width_total;//console.log("width: " + width + " height: " + height)
                let height = distance * screen_height_total;
                let movement = second_point_3d(origin, screen_origin, point);
                let screen_origin = [0.6,0.8,0]
                //let z_angle = 90;//0 = looking at ground, 90 looking at horizen, 180 = looking up
                //let xy_angle = 0;//0 = looking down -y, 90 looking down +x, 180 looking down +y, 270 looking down -x, 360 looking down -y
                let origin = [0,0,0];//xyz


                let x_unit_angle = Math.atan((screen_origin[1]-origin[1])/(screen_origin[0]-origin[0]));
                let x_unit = Math.sin(x_unit_angle);
                console.log("our new x unit: " + x_unit_angle);
                console.log("our new x unit: " + x_unit);
                
                /*for(let i=0; i<points1.length; i++)
                {
                    dist(points1[i],'red', origin, screen_origin)
                }
                for(let i=0; i<points2.length; i++)
                {
                    dist(points2[i],'orange', origin, screen_origin)
                }*/
        }}>on</button>
        <div ref={ref} className="s_frame">

        </div>
        </div>
    );
}