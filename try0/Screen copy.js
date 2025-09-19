import './PagesCSS/screen.css'

import { useEffect, useRef } from 'react';

const width_pixels = 200
const height_pixels = 100
            //let origin = [0,0,0];//xyz
            //let screen_origin = [0.8,0.6,0];//distance from origin has to be 1
            //let points1 = [[6,9,0],[6,9,6],[12,9,0]];
            //let points1 = [[6,9,0],[6,9,6],[12,9,0],[12,9,6]];
            //let points2 = [[6,15,0],[6,15,6],[12,15,0],[12,15,6]];
            //let points1 = [[6,1.5,1.5],[6,-1.5,1.5],[6,1.5,-1.5],[6,-1.5,-1.5]];
            //let points2 = [[9,1.5,1.5],[9,-1.5,1.5],[9,1.5,-1.5],[9,-1.5,-1.5]];
            //let points1 = [[6,0,1.5],[6,-3,1.5],[6,0,-1.5],[6,-3,-1.5]];
            //let points2 = [[9,0,1.5],[9,-3,1.5],[9,0,-1.5],[9,-3,-1.5]];

            let points1 = [[5,5,3],[5,5,0]]//,[8,5,3],[5,8,3],[8,5,0],[8,5,0]];
            let points2 = []//[8,8,3],[8,8,0]];
            //let points1 = [[6,1.5,1.5],[6,-1.5,1.5],[8.12132034356,1.5,-1.5],[8.12132034356,-1.5,-1.5],[8.12132034356,,],[8.12132034356,,]];
            //let points2 = [[10.24264068712,1.5,1.5],[10.24264068712,-1.5,1.5]];
            //let points1 = [[6,1.5,1.5]];
            //let points2 = [];
            
            const screen_width_total = 4;
            const screen_height_total = 2;


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

    function center_at_dist(dist, origin, screen_origin)
    {
        //
        let run = screen_origin[0]-origin[0]
        let drift = screen_origin[1]-origin[1]
        let rise = screen_origin[2]-origin[2]
        let tot = rise+run+drift

        //console.log("ratio; run: " + (run/tot) + " drift: " + (drift/tot) + " rise: " + (rise/tot))

        return [(run/tot)*dist, (drift/tot)*dist, (rise/tot)*dist]//xyz although im not sure
        
    }
    function dist(point, colour, origin, screen_origin)
    {
        //console.log(point);
        let o_to_p =  Math.sqrt((point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2);
        //console.log("o to p: " + o_to_p);
        let width = o_to_p * screen_width_total
        let height = o_to_p * screen_height_total;
        //console.log("width: " + width + " height: " + height)
        
        //find screen origin at distance of o_to_p
        let adds = center_at_dist(o_to_p, origin, screen_origin)
        let n_s = [origin[0]+ adds[0],origin[1]+ adds[1],origin[2]+ adds[2]]//new center
        console.log("point: " + point)
        console.log("n_s " + n_s)


        //let z = n_s[2]
        //find distance from the new orign width or height /2 in each direction
        //z will be z 
        //angle of x, y used for factor
        //let tot = Math.abs(point[1]- origin[1]) + Math.abs(point[1]- origin[1])
        
        //what angle am i looking at x through
        //console.log(screen_origin[0]- origin[0])
        //console.log(screen_origin[1]- origin[1])
        //console.log((screen_origin[0]- origin[0])/(screen_origin[1]- origin[1])*180*Math.PI)
        //console.log((screen_origin[1]- origin[1])/(screen_origin[0]- origin[0]))
    

        let x_len;
        let y_len;
        let z_len;
        //better angels
        if(screen_origin[0]- origin[0] == 1)
        {//x
            y_len = 1
            x_len=0
            z_len=1
        }
        else if(screen_origin[1]- origin[1] == 1)
        {//y
            x_len = 1
            y_len=0
            z_len = 1
        }
        else if(screen_origin[2]- origin[2] == 1)//probs dont want this i think things get strange
        {//z
            //z_len=0
        
            //figure out later
        }
        else
        {
            //ratio of x and y is unaffected by z
            //console.log("doing");
            let y_angle = Math.atan(((screen_origin[0]- origin[0])/(screen_origin[1]- origin[1])))
            let x_angle = Math.atan(((screen_origin[1]- origin[1])/(screen_origin[0]- origin[0])))
            //console.log("x an + " + x_angle + " y " + y_angle)
            x_len = Math.sin(x_angle)//*(180/Math.PI)
            y_len = Math.sin(y_angle)//*(180/Math.PI)
            z_len = 1
        }//console.log("x an " + x_angle + "  y an " + y_angle)
        //console.log("z len : "+ z_len)
        //console.log("sin 90: " + Math.sin(90)*(180/Math.PI))
        //console.log("X_len " + x_len);
        //console.log("Y_len " + y_len);
        //not sure if i have to do this but will and simplify later
        //x_len=Math.abs(x_len)
        //y_len=Math.abs(y_len)

        //finding distanc from n_s
        let z_dist = point[2]-origin[2]; 
        //let x_dist = (point[0]-origin[0]) * x_len 
        //let y_dist = (point[1]-origin[0]) * y_len
        //console.log("new center x: " + n_s[0] + ", y: " + n_s[1]);
        //console.log("x dist: " + (point[0]-n_s[0]) + " weighted dist: " + ((point[0]-n_s[0]) * x_len))
        //console.log("y dist: " + (point[1]-n_s[1]) + " weighted dist: " + ((point[1]-n_s[1]) * y_len))
        let x_dist = (point[0]-n_s[0]) * x_len 
        let y_dist = (point[1]-n_s[1]) * y_len
        //console.log("z_dist " + z_dist);
        console.log("x_dist "+(x_dist/x_len)+ " , "+ x_dist);
        console.log("y_dist "+(y_dist/y_len)+ " , "+ y_dist);


        //return print cowardinate
        //if of grid move to most aprox point (do later)
        let w = ((x_dist+y_dist+width/2)/width)*width_pixels
        let h = ((z_dist+height/2)/height)*height_pixels
        //console.log(((z_dist+height/2)/height))
        //console.log(screen_height_total)
        //console.log("w: " + w + " h: " + h)
        w=Math.floor(w)
        h=Math.floor(h)
        //console.log(w+','+h)
        let elem = document.getElementById(w+','+h)
        //console.log(elem)
        elem.style.backgroundColor = colour

        
        //return [w,h]

        //x_factor = 
        //y_factor = 
        
        //find congruent lines to origin to o_p (going up and outwards)
        //i think you should just shuffle rise run and drift
        /*let run = screen_origin[0]-origin[0]
        let drift = screen_origin[1]-origin[1]
        let rise = screen_origin[2]-origin[2]
        let tot = rise+run+drift
        let standard_run = run/tot
        let standard_drift = drift/tot
        let standard_rise = rise/tot*/

        //let new_gard_1 = [standard_rise, standard_run, standard_drift]
        //let new_grad_2 = [standard_run, standard_drift, standard_rise]
        //this could be all wrong
        //width and height should be dispersed amoungst the proports to get the real corner
        //let x
        //let y
        //let z


        
        
        //this will need to cahnge for angles but dooing now right angle
        //new sreen corner
        //let x = n_s[0] - width/2
        //let y = n_s[1] - height/2
        //let z = n_s[2] - height/2
        //console.log("height: ")


        //let x_ratio = (point[0]-x)/width
        //let y_ratio = (point[1]-y)/height
        //let z_ratio = (point[2]-z)/height
        //console.log("x,z " + x + "," + z)
        //console.log("point[0] " + point[0])
        //console.log("widdth: " + width)
        //console.log("x rat : " +x_ratio)
        //console.log("y arat : " +z_ratio)

        //console.log(Math.abs(Math.floor(x_ratio*screen_width_total))+','+Math.abs((z_ratio*screen_height_total)));

        //console.log("cornr: " + x + " " + y)
        //let elem = document.getElementById(Math.abs(Math.floor(x_ratio*width_pixels))+','+Math.abs(Math.floor((z_ratio*height_pixels))))
        //console.log(elem)
        //elem.style.backgroundColor = colour

        //findign points position relative to n_s (new screen center)(not sure how)
        //Math.sqrt((point[0]-n_s[0])**2 + (point[1]-n_s[1])**2 + (point[2]-n_s[2])**2);
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    return(
        <div>
        <button onClick={async ()=>{
            //for(let j = 0; j<10; j++)
            //{
                //let origin = [0,0,0]
                //let screen_origin = [0.9,0.43588989435 ,0]
                let screen_origin = [0.70710678118 ,0.70710678118 ,0]
                let origin = [0,0,0];//xyz
                //figure out angle

                //let screen_origin = [1-(j*0.1), Math.sqrt(1-(1-(j*0.1))^2)  ,0];
                for(let i=0; i<points1.length; i++)
                {
                    dist(points1[i],'red', origin, screen_origin)
                }
                for(let i=0; i<points2.length; i++)
                {
                    dist(points2[i],'orange', origin, screen_origin)
                }

                
                /*await sleep(2000);

                //cleat screen
                for(let i=0; i<width_pixels*height_pixels; i++)
                {
                    document.getElementById(String(i%width_pixels)+","+String(Math.floor(i/width_pixels))).style.backgroundColor = 'white'
                }*/

            //}
        }}>on</button>
        <div ref={ref} className="s_frame">

        </div>
        </div>
    );
}
//initail 2.5 d render
/*
function angle()
            {
                //find angle being faced
                //x-y angle of point 
                let o_angle = Math.atan((screen_origin[0]-origin[0]) / (screen_origin[1]-origin[1]));
                console.log("angle: " + o_angle);
            }
            angle();

let origin = [0,0,0];//xyz
            let screen_origin = [0,-1,0];
            const screen_width_total = 4;
            const screen_height_total = 2;

let points1 = [[1,-3,0],[2,-3,0],[2,-3,-1],[1,-3,-1]]//,[1,-5,0],[1,-5,-1],[2,-5,-1],[2,-5,0]];//[2,-5,-1]
            let points2 = [[1,-5,0],[1,-5,-1],[2,-5,-1],[2,-5,0]];//[2,-5,-1]
            let points3 = [[-1,-5,-3],[-3,-5,-3],[-1,-5,-4],[-3,-5,-4]]
            let points4 = [[-1,-6,-3],[-3,-6,-3],[-1,-6,-4],[-3,-6,-4]]
            let points5 = [[-2,-6,1],[2,-6,1],[-2,-6,2],[2,-6,2]]
            let points6 = [[-2,-8,1],[2,-8,1],[-2,-8,2],[2,-8,2]]
            let points7 = [[-5,-8,1],[-5,-8,-3],[-8,-8,1],[-8,-8,-3]]
            let points8 = [[-5,-18,1],[-5,-18,-3],[-8,-18,1],[-8,-18,-3]]

for(let i=0; i<points1.length; i++)
            {
                dist(points1[i], 'yellow');
            }
            for(let i=0; i<points2.length; i++)
            {
                dist(points2[i], 'red');
            }
            for(let i=0; i<points3.length; i++)
            {
                dist(points3[i], 'green');
            }
            for(let i=0; i<points4.length; i++)
            {
                dist(points4[i], 'yellowgreen');
            }
            for(let i=0; i<points5.length; i++)
            {
                dist(points5[i], 'purple');
            }
            for(let i=0; i<points6.length; i++)
            {
                dist(points6[i], 'blue');
            }
            for(let i=0; i<points7.length; i++)
            {
                dist(points7[i], 'black');
            }
            for(let i=0; i<points8.length; i++)
            {
                dist(points8[i], 'orange');
            }
function dist(point, colour)
            {
                let o_to_p =  Math.sqrt((point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2);
                //console.log(o_to_p)
                //80px wide 40px deep
                let width = o_to_p * screen_width_total
                let height = o_to_p * screen_height_total
                //console.log("width: " + width + " height: " + height)
                //find screen origin at distance of o_to_p
                //let ratio = 
                //console.log("ratio: " + ratio)
                let adds = center_at_dist(o_to_p)
                let n_s = [origin[0]+ adds[0],origin[1]+ adds[1],origin[2]+ adds[2]]//new screen//should be new center
                //console.log("n_s " + n_s)
                //this will need to cahnge for angles but dooing now right angle
                //new sreen corner
                let x = n_s[0] - width/2
                //let y = n_s[1] - height/2
                let z = n_s[2] - height/2
                //console.log("height: ")


                let x_ratio = (point[0]-x)/width
                //let y_ratio = (point[1]-y)/height
                let z_ratio = (point[2]-z)/height
                //console.log("x,z " + x + "," + z)
                //console.log("point[0] " + point[0])
                //console.log("widdth: " + width)
                //console.log("x rat : " +x_ratio)
                //console.log("y arat : " +z_ratio)

                //console.log(Math.abs(Math.floor(x_ratio*screen_width_total))+','+Math.abs((z_ratio*screen_height_total)));

                //console.log("cornr: " + x + " " + y)
                let elem = document.getElementById(Math.abs(Math.floor(x_ratio*width_pixels))+','+Math.abs(Math.floor((z_ratio*height_pixels))))
                //console.log(elem)
                elem.style.backgroundColor = colour

                //findign points position relative to n_s (new screen center)(not sure how)
                //Math.sqrt((point[0]-n_s[0])**2 + (point[1]-n_s[1])**2 + (point[2]-n_s[2])**2);
            }

            */





/*
function line(x1,y1, x2,y2)
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

        while ( Math.round(x1)!=x2 && Math.round(y1)!=y2)
        {
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
            console.log('count');
        }
    }
*/
/*
line func 2
function line(x1,y1, x2,y2)
    {
        let dx = Math.abs(x2-x1)
        let dy = Math.abs(y2-y1)
        let xu = x2>x1?1:-1
        let yu = y2>y1?1:-1
        let grad = dy/dx
        let current_x = x1;
        let current_y = y1;
        while ( current_x!=x2 || current_y!=y2)
        {
            console.log("c")
            document.getElementById( String(current_x)+','+String(current_y)).style.backgroundColor = 'yellow'
            //x or y or xy
            //find new grad from all position and use closest one
            let cand_x = Math.abs(y2-current_y)/Math.abs(x2-(current_x+xu))
            let cand_y = Math.abs(y2-(current_y+yu))/Math.abs(x2-current_x)
            let cand_xy =Math.abs(y2-(current_y+yu))/Math.abs(x2-(current_x+xu))
            if(Math.abs(grad - cand_x) < Math.abs(grad - cand_y) && Math.abs(grad - cand_x)<Math.abs(grad - cand_xy))
            {
                current_x+=xu
            }
            else if(Math.abs(grad - cand_y) < Math.abs(grad - cand_xy))
            {
                current_y+=yu
            }
            else
            {
                current_x+=xu
                current_y+=yu
            }
        }
    }
*/

/*function facing()
            {
                //only "facing" a point when screern_orgin  is between origin and point
                //find distances
                let o_to_s =  Math.sqrt((screen_origin[0]-origin[0])**2 + (screen_origin[1]-origin[1])**2 + (screen_origin[2]-origin[2])**2);
                let o_to_p =  Math.sqrt((point[0]-origin[0])**2 + (point[1]-origin[1])**2 + (point[2]-origin[2])**2);
                let s_to_p =  Math.sqrt((screen_origin[0]-point[0])**2 + (screen_origin[1]-point[1])**2 + (screen_origin[2]-point[2])**2);
            
                console.log("o to s: " + o_to_s)
                console.log("o to p: " + o_to_p)
                console.log("s to p: " + s_to_p)

                if(s_to_p <= o_to_p && o_to_s <= o_to_p)
                {
                    console.log("in right half");
                }
                else
                {
                    console.log("wrong half")
                }
            }*/