function find_centre(origin, point, vector)
{
    //find the plane purpendicular to our line of sight that contains out point
    //maths explanation will do later
    let t = 
    (
        (
            point[0] * vector[0] + 
            point[1] * vector[1] + 
            point[2] * vector[2]
        ) 
        - 
        (
            vector[0] * origin[0] + 
            vector[1] * origin[1] + 
            vector[2] * origin[2]
        )
    )
    /
    ( 
        vector[0] ** 2 + 
        vector[1] ** 2 + 
        vector[2] ** 2
    )


    return [origin[0]+vector[0]*t,origin[1]+vector[1]*t,origin[2]+vector[2]*t];
}


function translate_2d(origin, point, z_angle, xy_angle, vector)
{
    newc = find_centre(origin, point, vector)

    //console.log("point and new center " +point+" "+ newc);


    //vector for horizontal movement in the plane
    hl = [Cos(xy_angle),Sin(xy_angle),0]

    //vector for vertical movement in the plane
    vl = [ vector[1]*hl[2]-vector[2]*hl[1],-1*(vector[0]*hl[2]-vector[2]*hl[0]),vector[0]*hl[1]-vector[1]*hl[0]]

    
    
    //find point horizontal to the center of the plane whilst also be directly under our point
    let j = (newc[2]-point[2])/vl[2]
    let x =(point[0]+j*vl[0])
    let y = (point[1]+j*vl[1])



    // find how far this new point is vertically
    let dv = Math.sqrt((point[0]-x)**2 + (point[1]-y)**2 + (point[2]-newc[2])**2);
    //distance horiz 
    let dh =Math.sqrt((x-newc[0])**2+(y-newc[1])**2);



    //this is messy but do for each octant

    //figuring out if to the left or the right using x and y
    //-y moves right +y moves left, +z moves right, -x moves left
    //find factor which is linked to xy angle and factor to see if poitive or negative

    
            
            let xstep = -1*Cos(xy_angle)
            let ystep = -1*Sin(xy_angle)
            let total = (point[0] - newc[0]) * xstep + (point[1] - newc[1]) * ystep
            if(total > 0)
            {
            dh*=-1 
            }

            if(point[2] < newc[2])
            {
                dv*=-1
            }

     //distances
    let distance = Math.sqrt((newc[0]-origin[0])**2 + (newc[1]-origin[1])**2 + (newc[2]-origin[2])**2);
    
    if(distance == 0)
    {
        console.log("this makes stuff go really wrong")
        return false;
    }

    let max_w = distance * width_growth_factor
    let max_h = distance * height_growth_factor

    //console.log("dv " + dv + " as % " + dv/(max_w/2))
    //console.log("dh " + dh + " as % Matha floor FLOTOR FLOOR FLOOR" + dh/(max_w/2) )
            //console.log('td')

    /*console.log("in translate 2d " + (Math.floor(100 + (dh/(max_w/2))*100)) +" "+ (Math.floor(50 + (dv/(max_h/2))*50)))
    console.log(dh)
    console.log(dv)
    console.log(max_w)
    console.log(max_h)
    console.log(origin)
    console.log(point)*/
    return [Math.floor(100 + (dh/(max_w/2))*100), Math.floor(50 + (dv/(max_h/2))*50)]

}