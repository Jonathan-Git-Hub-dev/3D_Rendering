//import {Sin, Cos, Tan} from './functions.js'; 


function find_center(origin, point, z_angle, xy_angle)
        {
            //making it more boiler plate but easier to read
            //six cardianl directions
            if(z_angle == 0 || z_angle == 180)//cannot currently achive this angle
            {//looking straight up and down
                return [origin[0],origin[1],point[2]]
            }
            if(z_angle == 90)
            {
                switch (xy_angle)
                {
                    case 0:
                        return [origin[0],point[1],origin[2]];//break;
                    case 90:
                        return [point[0],origin[1],origin[2]];//break;
                    case 180:
                        return [origin[0],point[1],origin[2]];//break;
                    case 270:
                        return [point[0],origin[1],origin[2]];//break;
                }//defualt means not a cardinal direction
            }


            //now doing all (12) secondary directions
            //these may be compressable into the following 8 mixed directions
            if(xy_angle % 90 == 0)
            {
                if(z_angle < 90)//looking up
                {
                    let gradient = -1/ Tan(90 - z_angle);
                    let congruent_gradient = 1/gradient; 
                    let intercept;
                    let congruent_intercept;

                    let intercection;

                    switch (xy_angle)
                    {
                        case 0:
                            //console.log("this is fing it");
                            gradient*=-1;
                            intercept = origin[1] - (gradient * origin[2]);
                            congruent_intercept = point[1] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                            intercection_b = intercection * gradient + intercept
                            //console.log("g " + gradient + " g2 " + congruent_gradient)
                            //console.log("i " + intercept + " i2 " + congruent_intercept)
                            return [origin[0], intercection_b, intercection];//break;
                        case 90:
                            congruent_gradient*=-1;
                            //console.log("g " + gradient + " g2 " + congruent_gradient)
                            //console.log("i " + intercept + " i2 " + congruent_intercept)
                            intercept = origin[0] - (gradient * origin[2]);
                            congruent_intercept = point[0] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                            intercection_b = intercection * gradient + intercept
                            return [intercection_b, origin[1], intercection];//break;
                        case 180:
                            congruent_gradient*=-1;
                            intercept = origin[1] - (gradient * origin[2]);
                            congruent_intercept = point[1] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                            intercection_b = intercection * gradient + intercept
                            //console.log("g " + gradient + " g2 " + congruent_gradient)
                            //console.log("i " + intercept + " i2 " + congruent_intercept)
                            return [origin[0], intercection_b, intercection];//break;
                        case 270:
                            gradient*=-1;
                            intercept = origin[0] - (gradient * origin[2]);
                            congruent_intercept = point[0] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                            intercection_b = intercection * gradient + intercept
                            //console.log("g " + gradient + " g2 " + congruent_gradient)
                            //console.log("i " + intercept + " i2 " + congruent_intercept)
                            return [intercection_b, origin[1], intercection];//break;
                    }
                }
                else//looking down
                {
                    let gradient = 1 / Tan(z_angle - 90);
                    let congruent_gradient = -1/gradient; 
                    let intercept;
                    let congruent_intercept;

                    let intercection;

                    switch (xy_angle)
                    {
                        case 0:
                            gradient*=-1
                            congruent_gradient*=-1
                            intercept = origin[1] - (gradient * origin[2]);
                            congruent_intercept = point[1] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point in
                            intercection_b = intercection * gradient + intercept
                            return [origin[0], intercection_b, intercection];//break;
                        case 90:
                            intercept = origin[0] - (gradient * origin[2]);
                            congruent_intercept = point[0] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                             intercection_b = intercection * gradient + intercept
                            return [intercection_b, origin[1], intercection];//break;
                        case 180:
                            intercept = origin[1] - (gradient * origin[2]);
                            congruent_intercept = point[1] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                             intercection_b = intercection * gradient + intercept
                            return [origin[0], intercection_b, intercection];//break;
                        case 270:
                            gradient*=-1
                            congruent_gradient*=-1
                            intercept = origin[0] - (gradient * origin[2]);
                            congruent_intercept = point[0] - (congruent_gradient * point[2])
                            intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                            intercection_b = intercection * gradient + intercept
                             console.log("g " + gradient + " g2 " + congruent_gradient)
                            console.log("i " + intercept + " i2 " + congruent_intercept)
                            return [intercection_b, origin[1], intercection];//break;
                    }
                }
            }

            if(z_angle == 90)
            {
                let gradient =  -1/Tan(xy_angle % 90);
                let congruent_gradient = 1/gradient; 
                let intercept;
                let congruent_intercept;

                
                if(xy_angle < 90)
                {
                    //gradient *= -1;
                    congruent_gradient *=-1;
 
                    //console.log("grad " + gradient + " " + congruent_gradient)
                    intercept = origin[0] - (gradient * origin[1]);
                    congruent_intercept = point[1] - (congruent_gradient * point[0])
                    //console.log("i " + intercept + " ci " + congruent_intercept)
                    intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point in
                    intercection_b = intercection * gradient + intercept
                    //console.log("case A " + intercection + " " + intercection_b);
                    return [intercection, intercection_b, origin[2]];//break;
                }
                if(xy_angle < 180)
                {
                    gradient *= -1;
                    //console.log("grad " + gradient + " " + congruent_gradient)
                    intercept = origin[0] - (gradient * origin[1]);
                        congruent_intercept = point[0] - (congruent_gradient * point[1])
                        intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                        intercection_b = intercection * gradient + intercept
                        return [intercection_b, intercection, origin[2]];//break;
                }
                if(xy_angle < 270)
                {
                    
                    intercept = origin[1] - (gradient * origin[0]);
                    congruent_gradient*=-1;
                    congruent_intercept = point[1] - (congruent_gradient * point[0])
                    console.log("grad " + gradient + " " + congruent_gradient)
                    console.log("i " + intercept + " ci " + congruent_intercept)
                    intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                        intercection_b = intercection * gradient + intercept
                        return [intercection, intercection_b, origin[2]];//break;
                }
                if(xy_angle < 360)
                {
                    gradient = Tan(xy_angle % 90);
                    congruent_gradient = -1/gradient; 
                    //console.log("grad " + gradient + " " + congruent_gradient)
                    //console.log("d??")
                    intercept = origin[1] - (gradient * origin[0]);
                    congruent_intercept = point[1] - (congruent_gradient * point[0])
                    intercection = (intercept - congruent_intercept) / (congruent_gradient - gradient);//z is our crossing point
                    intercection_b = intercection * gradient + intercept
                    //console.log("i " + intercept + " ci " + congruent_intercept)
                    return [intercection, intercection_b, origin[2]];//break;
                }
            }

            //begining of mixed anlges

            
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
                //console.log("yg " + ygrad)
                //console.log("xg " + xgrad)
            }   
            else if(xy_angle < 180)
            {
                ygrad = Sin(xy_angle-90) * remainder
                xgrad = Cos(xy_angle-90) * remainder
            }
            else if(xy_angle < 270)
            {
                ygrad = Cos(xy_angle-180) * remainder
                //console.log(ygrad)
                xgrad = -1*Sin(xy_angle-180) * remainder
            }
            else//< 360 
            {
                //console.log("massive here")
                ygrad = -1*Sin(xy_angle-270) * remainder
                xgrad = -1*Cos(xy_angle-270) * remainder
                //console.log("xg " + xgrad + "  yg " + ygrad)
            }
            



            let t = ((point[0]*xgrad + point[1]*ygrad + point[2]*zgrad) - (xgrad*origin[0] + ygrad*origin[1] + zgrad*origin[2]))/(xgrad**2+ygrad**2+zgrad**2)

            let newc = [origin[0]+xgrad*t,origin[1]+ygrad*t,origin[2]+zgrad*t];
            console.log("point and new center " +point+" "+ newc);

            //console.log("only works for a single octant hard coded neative -1 bad");
            hl = [Cos(xy_angle),Sin(xy_angle),0]

            //find cross product
            //xgrad,ygrad,zgrad
            vl = [ ygrad*hl[2]-zgrad*hl[1],-1*(xgrad*hl[2]-zgrad*hl[0]),xgrad*hl[1]-ygrad*hl[0]]
            //console.log("vl " + vl)
            //console.log("hl " + hl)

            
            //for out oringinal point moving up or down using vl until the same z as the new center point
            let j = (newc[2]-point[2])/vl[2]
           // console.log("j " + j)
            let x =(point[0]+j*vl[0])
            let y = (point[1]+j*vl[1])

            
            //distances
            let distance = Math.sqrt((newc[0]-origin[0])**2 + (newc[1]-origin[1])**2 + (newc[2]-origin[2])**2);
            let max_w = distance * width_growth_factor
            let max_h = distance * height_growth_factor


            //distance vert
            let dv = Math.sqrt((point[0]-x)**2 + (point[1]-y)**2 + (point[2]-newc[2])**2);
            //distance horiz 
            let dh =Math.sqrt((x-newc[0])**2+(y-newc[1])**2);
        


            //this is messy but do for each octant

            //figuring out if to the left or the right using x and y
            //-y moves right +y moves left, +z moves right, -x moves left
            //find factor which is linked to xy angle and factor to see if poitive or negative
            if(z_angle < 90)//looking up
            {
                if(xy_angle < 90)
                {
                    
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
                }
                else if(xy_angle < 180)
                {
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
                }
                else if(xy_angle < 270)
                {
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
                }
                else
                {
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
                }
            }
            else//looking down
            {
                if(xy_angle < 90)
                {
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
                }
                else if(xy_angle < 180)
                {   
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

                }
                else if(xy_angle < 270)
                {
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
                }
                else
                {
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
                }
            }

            

            console.log("dv " + dv + " as % " + dv/(max_w/2))
            console.log("dh " + dh + " as % " + dh/(max_w/2) )

            return [100 + (dh/(max_w/2))*100, 50 + (dv/(max_h/2))*50]

        }