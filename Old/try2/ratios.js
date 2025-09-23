
        function ratios(z_angle, xy_angle)
        {
            //return how at our current viewing angle momement in 3d space affect rentering on the screen
            //[x_contribution_to_width x_contribution_to_height y_contribution_to_width
            //y_contribution_to_height z_contribution_to_width z_contribution_to_height]

            //if one of the 6 cardianl direction
            //fully up (z = 0) and full down (z = 180) are not allowed for now 
            /*if(z_angle == 90 && xy_angle == 0)//360 not allowed always brought back to zero
            {
                return [1,0,0,0,0,1] 
            }
            if(z_angle == 90 && xy_angle == 90)
            {

            }
            if(z_angle == 90 && xy_angle == 180)
            {

            }
            if(z_angle == 90 && xy_angle == 270)
            {

            }*/
            //else one of the 8 octants



            

           if(z_angle == 90)
           {
                if(xy_angle == 0 || xy_angle == 360)
                {
                    //looking down y so y does nothing
                    //console.log("abc");
                    return [1,0,0,0,0,1]
                }
                if(xy_angle < 90)//()()
                {
                    //looking flattly at both x adn y
                    //console.log("bbbb");
                    return [Math.cos((xy_angle)* (Math.PI / 180)).toFixed(5) ,0, Math.sin((xy_angle) * (Math.PI / 180)).toFixed(5) ,0,0,1]
                }
                if(xy_angle < 180)
                {
                    //console.log("doing 180:" + (xy_angle-90))
                    return [-1*Math.sin((xy_angle-90) * (Math.PI / 180)),0,Math.cos((xy_angle -90) * (Math.PI / 180)),0,0,1]
                }
                if(xy_angle < 270)
                {
                    return [-1*Math.cos((xy_angle - 180) * (Math.PI / 180)),0,-1*Math.sin((xy_angle-180) * (Math.PI / 180)),0,0,1]
                }
                if(xy_angle < 360)//()()
                {
                    return [Math.sin((xy_angle - 270) * (Math.PI / 180)),0,-1*Math.cos((xy_angle - 270) * (Math.PI / 180)),0,0,1]
                }
           }
          
           if(z_angle < 90)//looking up
           {
                if(xy_angle == 0)
                {
                    return [1,0,0,-1*Math.sin((90-z_angle)* (Math.PI / 180)),0,Math.sin(z_angle* (Math.PI / 180))]
                }
                if(xy_angle < 90)
                {
                    console.log("complete redo")
                    //this is a bit of a guess

                    //rodoing all
                    let down_bit = Math.sin((90-z_angle)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle)))

                    //let xh =  down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    //let yh =  down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    let xh =  down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    let yh =  down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    let xw = Math.cos((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.sin((xy_angle) * (Math.PI / 180))// * (1-down_bit);


                    return [xw, xh, yw, -1*yh,0,Math.sin(z_angle * (Math.PI / 180))]

                }
                else if(xy_angle == 90)
                {
                    //console.log("dsfsdfsdfsdf")
                    return [0,Math.sin((90-z_angle)* (Math.PI / 180)),-1,0,0,Math.sin((z_angle)* (Math.PI / 180))] 
                }
                else if(xy_angle < 180)
                {
                    let down_bit = Math.sin((90-z_angle)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle)))

                    let xh =  down_bit * Math.sin((xy_angle - 90) * (Math.PI / 180));
                    let yh =  down_bit * Math.cos((xy_angle- 90) * (Math.PI / 180));
                    let xw = Math.sin((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.cos((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, xh, yw,yh,0,Math.sin(z_angle * (Math.PI / 180))]
                }
                else if(xy_angle == 180)
                {
                   return [1,0,0,Math.sin((90-z_angle)* (Math.PI / 180)),0,Math.sin(z_angle* (Math.PI / 180))] 
                }
                else if(xy_angle < 270)
                {
                    let down_bit = Math.sin((90-z_angle)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle)))

                    let xh =  -1*down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    let yh =  down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    let xw = Math.cos((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.sin((xy_angle) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, xh, yw,yh,0,Math.sin(z_angle * (Math.PI / 180))]
                }
                else if(xy_angle == 270)
                {
                     return [0,-1*Math.sin((90-z_angle)* (Math.PI / 180)),-1,0,0,Math.sin((z_angle)* (Math.PI / 180))] 
                    //return [Math.sin((90-z_angle)* (Math.PI / 180)),0,0,1,0,Math.sin(z_angle* (Math.PI / 180))] 
                }
                else//<360 
                {
                    let down_bit = Math.sin((90-z_angle)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle)))

                    let xh =  down_bit * Math.sin((xy_angle - 90) * (Math.PI / 180));
                    let yh =  down_bit * Math.cos((xy_angle- 90) * (Math.PI / 180));
                    let xw = Math.sin((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.cos((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);

                    return [-1*xw, xh, yw,-1*yh,0,Math.sin(z_angle * (Math.PI / 180))]
                }
           }
           else//looking down
           {
                if(xy_angle == 0)
                {
                    return [1,0,0,Math.sin((z_angle-90)* (Math.PI / 180)),0,Math.sin(z_angle* (Math.PI / 180))]
                }
                if(xy_angle < 90)
                {
                    //this is a bit of a guess

                    //rodoing all
                    let down_bit = Math.sin((z_angle-90)  * (Math.PI / 180) )
                

                    let xh =  down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    let yh =  down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    let xw = Math.cos((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.sin((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    //let xh =  down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    //let yh =  down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    //let xw = Math.cos((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    //let yw = Math.sin((xy_angle) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, -1*xh, yw,yh,0,-1*Math.cos((z_angle-90) * (Math.PI / 180))]

                }
                else if(xy_angle == 90)
                {
                    //console.log("big")
                    //return [0,Math.sin((90-z_angle)* (Math.PI / 180)),-1,0,0,Math.sin((z_angle)* (Math.PI / 180))] 
                    return [0,-1*Math.sin((z_angle-90)* (Math.PI / 180)),1,0,0,Math.sin((z_angle)* (Math.PI / 180))] 
                }
                else if(xy_angle < 180)
                {
                    let down_bit = Math.sin((z_angle-90)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle-90)))

                    let xh =  down_bit * Math.sin((xy_angle - 90) * (Math.PI / 180));
                    let yh =  down_bit * Math.cos((xy_angle- 90) * (Math.PI / 180));
                    let xw = Math.sin((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.cos((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, xh, yw,yh,0,Math.sin((z_angle-90) * (Math.PI / 180))]
                }
                else if(xy_angle == 180)
                {
                    return [1,0,0,-1*Math.sin((z_angle-90)* (Math.PI / 180)),0,Math.sin(z_angle* (Math.PI / 180))]
                   //return [1,0,0,Math.sin((z_angle-90)* (Math.PI / 180)),0,Math.sin((z_angle-90)* (Math.PI / 180))] 
                }
                else if(xy_angle < 270)
                {
                    let down_bit = Math.sin((z_angle-90)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle)))

                    let xh =  -1*down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    let yh =  down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    let xw = Math.cos((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.sin((xy_angle) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, xh, yw,yh,0,Math.sin(z_angle * (Math.PI / 180))]
                }
                else if(xy_angle == 270)
                {
                    //return [Math.sin((z_angle - 90) * (Math.PI / 180)),0,0,1,0,Math.sin((z_angle-90) * (Math.PI / 180))] 
                    return [0,Math.sin((z_angle-90)* (Math.PI / 180)),1,0,0,Math.sin((z_angle)* (Math.PI / 180))] 
                }
                else//<360 
                {
                    let down_bit = Math.sin((z_angle - 90)  * (Math.PI / 180) )
                    //console.log("down bit herere  " + down_bit + " " +( Math.sin(z_angle-90)))

                    let xh =  down_bit * Math.sin((xy_angle - 90) * (Math.PI / 180));
                    let yh =  down_bit * Math.cos((xy_angle- 90) * (Math.PI / 180));
                    let xw = Math.sin((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.cos((xy_angle - 90) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, xh, yw,yh,0,Math.sin((z_angle-90) * (Math.PI / 180))]
                }
                /*if(xy_angle == 0)
                {
                    return [1,0,0,Math.sin((z_angle-90)* (Math.PI / 180)),0,Math.sin(z_angle* (Math.PI / 180))]
                }
                if(xy_angle < 90)
                {
                    let down_bit = Math.sin(z_angle  * (Math.PI / 180) )

                    let xh =  -1*down_bit * Math.cos((xy_angle) * (Math.PI / 180));
                    let yh =  -1*down_bit * Math.sin((xy_angle) * (Math.PI / 180));
                    let xw = Math.sin((xy_angle) * (Math.PI / 180))// * (1-down_bit);
                    let yw = Math.cos((xy_angle) * (Math.PI / 180))// * (1-down_bit);

                    return [xw, xh, yw,yh,0,-1*Math.sin(z_angle * (Math.PI / 180))]
                    
                }*/
           }


        }