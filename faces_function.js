function vector_by_points(p1, p2)
{
    return [p1[0]-p2[0],p1[1]-p2[1],p1[2]-p2[2]]
}


function triangle_middle(p1,p2,p3)
{
    let x = (p1[0] + p2[0] + p3[0])/3
    let y = (p1[1] + p2[1] + p3[1])/3
    let z = (p1[2] + p2[2] + p3[2])/3
    return [x,y,z]
}
function crossProduct(vectorA, vectorB) {
  if (vectorA.length !== 3 || vectorB.length !== 3) {
    throw new Error("Cross product is defined only for 3D vectors.");
  }

  const a1 = vectorA[0];
  const a2 = vectorA[1];
  const a3 = vectorA[2];

  const b1 = vectorB[0];
  const b2 = vectorB[1];
  const b3 = vectorB[2];

  const resultX = a2 * b3 - a3 * b2;
  const resultY = a3 * b1 - a1 * b3;
  const resultZ = a1 * b2 - a2 * b1;

  return [resultX, resultY, resultZ];
}
function cross_product(v1,v2)
{
    //return [ v1[1]*v2[2]-v1[2]*v2[1], v1[0]*v2[2]-v1[2]*v2[0], v1[0]*v2[1]-v1[1]*v2[0]]
    return [ v1[1]*v2[2]-v1[2]*v2[1], v1[0]*v2[2]-v1[2]*v2[0], v1[0]*v2[1]-v1[1]*v2[0]]
}

function normal_vector(p1, p2, p3)
{
    let v1 = vector_by_points(p1, p2)
    let v2 = vector_by_points(p1, p3)

    return cross_product(v1, v2);

}

function bounding_box(shape)
{
    //console.log('in bb ' + shape.length)
    //retruns top point and bottom point

    //top point is most -x,-y,-x
    //bottom point is most +x,+y,+z

    let nx=Infinity,ny=Infinity,nz=Infinity
    let px=-Infinity,py=-Infinity,pz=-Infinity

    //for faces in sahpe
    for(let i=0; i<shape.length; i++)
    {
        for(let j=0; j<shape[i].length; j++)
        {
            //console.log(shape[i][j][0])
            //console.log(nx)
            console.log(Math.min(nx, shape[i][j][0]))

            nx = Math.min(nx, shape[i][j][0])
            ny = Math.min(ny, shape[i][j][1])
            nz = Math.min(nz, shape[i][j][2])

            px = Math.max(px, shape[i][j][0])
            py = Math.max(py, shape[i][j][1])
            pz = Math.max(pz, shape[i][j][2])
        }
    }

    return [[nx,ny, nz],[px, py,pz]]
}

function scale_vector(vector)
{
    let total = vector[0]**2 + vector[1]**2 + vector[2]**2
    total = Math.sqrt(total);
    let factor = 1/total;

    return [vector[0]*factor, vector[1]*factor, vector[2]*factor]
}

function round_down(array, presicion)
{
    for(let i =0; i< array.length; i++)
    {
        array[i] = array[i].toFixed(presicion)
    }

    return array;
}

function point_on_plane(point, vector, plane_point, normal_vector)
{
    //nv[0](x - pp[0]) + nv[1](y - pp[1]) + nv[2](z - pp[2]) = 0
    //sub in parametric equations
    //x = v[0] * t + p[0] 
    //y = v[1] * t + p[1]
    //z = v[2] * t + p[2]
    //nv[0]((v[1] * t + p[1]) - pp[0]) + nv[1]((v[1] * t + p[1]) - pp[1]) + nv[2]((v[2] * t + p[2]) - pp[2]) = 0
    // nv[0]*v[0]*t + nv[0]*p[0] - nv[0]*pp[0] + nv[1]*v[1]*t + nv[1]*p[1] - nv[1]*pp[1] + nv[2]*v[2]*t + nv[2]*p[2] - nv[2]*pp[2] = 0
    //nv[0]*v[0]*t  + nv[1]*v[1]*t + nv[2]*v[2]*t = nv[0]*pp[0] + nv[1]*pp[1] + nv[2]*pp[2] - nv[0]*p[0] - nv[1]*p[1] -nv[2]*p[2]
    //(nv[0]*v[0]  + nv[1]*v[1] + nv[2]*v[2])*t = nv[0]*pp[0] + nv[1]*pp[1] + nv[2]*pp[2] - nv[0]*p[0] - nv[1]*p[1] -nv[2]*p[2]
    //t = nv[0]*pp[0] + nv[1]*pp[1] + nv[2]*pp[2] - nv[0]*p[0] - nv[1]*p[1] -nv[2]*p[2] / (nv[0]*v[0]  + nv[1]*v[1] + nv[2]*v[2])

    let t = 
    (
        (
            normal_vector[0] * plane_point[0] +
            normal_vector[1] * plane_point[1] +
            normal_vector[2] * plane_point[2]
        )
        - normal_vector[0] * point[0]
        - normal_vector[1] * point[1]
        - normal_vector[2] * point[2]
    )
    /
    (
        normal_vector[0] * vector[0] +
        normal_vector[1] * vector[1] +
        normal_vector[2] * vector[2]
    )

    return [point[0] + t*vector[0], point[1] + t*vector[1], point[2] + t*vector[2]];

}

function inter(p1, p2, p3, p4)
{


   

    //vector of line 2
    let v1 =  vector_by_points(p1, p2)
    v1 = scale_vector(v1)
    v1 = round_down(v1)

    //vector of line 2
    let v2 =  vector_by_points(p3, p4)
    v2 = scale_vector(v2)
    v2 = round_down(v2)

    if(n_v[0] == vector[0] && n_v[1] == vector[1] && n_v[2] == vector[2])
    {
        return false
    }


    let t2 = (p1[1] +    v1[1]*(p3[0]/v1[0])  + v1[1]*(-p1[0]/v1[0])   - p3[1])/(v2[1] - v1[1]*(v2[0]/v1[0]))
    //console.log("t2 " + t2);

    //console.log('x ' + (p2[0] + t2 * v2[0]))
    //console.log('y ' + (p2[1] + t2 * v2[1]))
    //console.log('z ' + (p2[2] + t2 * v2[2]))

    return [(p3[0] + t2 * v2[0]),(p3[1] + t2 * v2[1]),(p3[2] + t2 * v2[2])];
}

function inter_from_points_and_vectors(p1, p2, v1, v2)
{
    //should never be called with the paralele vectors
    /*v1 = round_down(v1)
    v2 = round_down(v2)

    if(n_v[0] == vector[0] && n_v[1] == vector[1] && n_v[2] == vector[2])
    {
        return false
    }*/

    /*
        redo maths
        1 in para
        x = p1[0] + v1[0]*t
        y = p1[1] + v1[1]*t
        z = p1[2] + v1[2]*t

        2 in para
        x = p2[0] + v2[0]*s
        y = p2[1] + v2[1]*s
        z = p2[2] + v2[2]*s


        equating
        p1[0] + v1[0]*t = p2[0] + v2[0]*s
        p1[1] + v1[1]*t = p2[1] + v2[1]*s
        p1[2] + v1[2]*t = p2[2] + v2[2]*s

        cleaning up
        e1 v1[0]*t - v2[0]*s = p2[0] - p1[0]
        e2 v1[1]*t - v2[1]*s = p2[1] - p1[1]
        e3 v1[2]*t - v2[2]*s = p2[2] - p1[2]

        s = -7 + t2
        7  = -3

        e1 in terms of t
        v1[0]*t = p2[0] - p1[0] - v2[0]*s
        t = (p2[0] - p1[0] - v2[0])/v1[0]
    */


    let t2 = (p1[1] +    v1[1]*(p2[0]/v1[0])  + v1[1]*(-p1[0]/v1[0])   - p2[1])/(v2[1] - v1[1]*(v2[0]/v1[0]))

    console.log('unlikely t2 ' + t2)
    if(Number.isNaN(t2) || t2==0 || Number.isFinite(t2) == false)
    {
       // console.log('nan')
        t2 = t2 = (p1[1] +    v1[1]*(p2[2]/v1[2])  + v1[1]*(-p1[2]/v1[2])   - p2[1])/(v2[1] - v1[1]*(v2[2]/v1[2]))
        //console.log('new t2: ' + t2)
       //t2 = t2 = (p1[0] +    v1[0]*(p2[2]/v1[2])  + v1[0]*(-p1[2]/v1[2])   - p2[0])/(v2[0] - v1[0]*(v2[2]/v1[2]))
        console.log('new t2: ' + t2)
    }
    if(Number.isNaN(t2) || t2 ==0 || Number.isFinite(t2) == false)
    {
        //console.log('nan')
        //t2 = t2 = (p1[1] +    v1[1]*(p2[2]/v1[2])  + v1[1]*(-p1[2]/v1[2])   - p2[1])/(v2[1] - v1[1]*(v2[2]/v1[2]))
        //console.log('new t2: ' + t2)
        t2 = t2 = (p1[0] +    v1[0]*(p2[2]/v1[2])  + v1[0]*(-p1[2]/v1[2])   - p2[0])/(v2[0] - v1[0]*(v2[2]/v1[2]))
        console.log('new t2: ' + t2)
    }
    return [(p2[0] + t2 * v2[0]),(p2[1] + t2 * v2[1]),(p2[2] + t2 * v2[2])];
}


function distance_total(p1, p2)
{
    return (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2 + (p1[2]-p2[2])**2
}

function crosses_a_triangle(point, vector, triangle)
{
    //point is center of a different trinagle


    //find if cross a plane
    //scale vectors
    vector = scale_vector(vector)
    vector = round_down(vector, 4)

    let n_v = normal_vector(triangle[0], triangle[1], triangle[2])
    n_v = scale_vector(normal_vector)
    n_v = round_down(normal_vector, 4)

    if(n_v[0] == vector[0] && n_v[1] == vector[1] && n_v[2] == vector[2])
    {//the plane and the line are paralel
        return false
    }

    //check where line crosses plane
    let new_point = point_on_plane(point, vector, triangle[0], normal_vector);

    let triangle_center = triangle_middle(triangle[0], triangle[1], triangle[2])

    //restrint the plane to inside the triangle
    //use triagle center to find what side of line defines triangle
    //if new_point on the inside of all lines then we have crossed a triangle

    //check if new point is between centerpoint and traingle line
    //line from cent to point
    //where dose this line cross traingle line
    //which point closer

    console.log('have to check if point is on the opisite side of intersection with triangle_center')
    //if it is on the opisite side then the test passes


    let intersection
    intersection =inter(new_point, triangle_center, triangle[0], triangle[1])
    if(intersection != false)
    {
        if(distance_total(triangle_center, intersection) < distance_total(triangle_center, new_point))
        {
            return false
        }
    }   

    intersection = inter(new_point, triangle_center, triangle[0], triangle[2])
    if(intersection != false)
    {
        if(distance_total(triangle_center, intersection) < distance_total(triangle_center, new_point))
        {
            return false
        }
    } 

    intersection = inter(new_point, triangle_center, triangle[2], triangle[1])
    if(intersection != false)
    {
        if(distance_total(triangle_center, intersection) < distance_total(triangle_center, new_point))
        {
            return false
        }
    } 

    return true
}

function same_point(p1, p2)
{
    if(p1[0] == p2[0] && p1[1] == p2[1] && p1[2] == p2[2])
    {
        //console.log('gettin motion')
        return true
    }

    return false;
}

function not_same_face(face1, face2)
{
    //console.log('ab')
    if(same_point(face1[0], face2[0]) && same_point(face1[1], face2[1]) && same_point(face1[2], face2[2]) )
    {
        return false
    }
    //1=1 ,2=2, 3=3
    if(same_point(face1[0], face2[0]) && same_point(face1[1], face2[2])  && same_point(face1[2], face2[1]) )
    {
        return false
    }
    //1=1 2=3 3=2
    if(same_point(face1[0], face2[1]) && same_point(face1[1], face2[0])  && same_point(face1[2], face2[2]) )
    {
        return false
    }
    //1=2 ,2=1 3=3
    if(same_point(face1[0], face2[1]) && same_point(face1[1], face2[2])  && same_point(face1[2], face2[0]) )
    {
        return false
    }
    //1=2 2=3 3=1
    if(same_point(face1[0], face2[2]) && same_point(face1[1], face2[0])  && same_point(face1[2], face2[1]) )
    {
        return false
    }
    //1=3 2=1 3=2
    if(same_point(face1[0], face2[2]) && same_point(face1[1], face2[1])  && same_point(face1[2], face2[0]) )
    {
        return false
    }
    //1=3 2=2 3=1   
    //console.log('a')

    return true;
}

function neighbour_face(face1, face2)
{

    //a face is a neighbour if it shares exactly one edge with another face
    //this means it must have exactly 2 points in common

    //redoing combinatorics
    /*


    */

    //make sure point inst itself
    if(not_same_face(face1, face2) == false)
    {
        //console.log('found ourself')
        return false;
    }//hash maps sorts this out so may remove it

    //doing with hash map
    //let hm = new Map();
    let hm = []

    for(let i=0;i<face1.length; i++)
    {
        //hm.set(face1[i],true)
        hm[face1[i]] = true
    }

    let seenCount = 0
    //console.log(hm)
    for(let i=0;i<face2.length; i++)
    {
        //console.log('ddd '+ face2[i])
        //console.log(hm.has(face2[i]))
        //if(hm.has(face2[i]))
        if(hm[face2[i]] == true)
        {
            //console.log("found");
            seenCount++;
        }
    }

    if(seenCount == 2)
    {
        return true;
    }
    return false;
        
    /*//all combos
    
    //f1>12 = f2>12 backwards and forwards 
    //f1>12 = f2>13
    //f1>12 = f2>23
    
    if((same_point(face1[0], face2[0]) && same_point(face1[1], face2[1]))||(same_point(face1[0], face2[1]) && same_point(face1[1], face2[0])))
    {
        return true;
    }
    if((same_point(face1[0], face2[0]) && same_point(face1[1], face2[2]))||(same_point(face1[0], face2[2]) && same_point(face1[1], face2[0])))
    {
        return true;
    }
    if((same_point(face1[0], face2[1]) && same_point(face1[1], face2[2]))||(same_point(face1[0], face2[2]) && same_point(face1[1], face2[1])))
    {
        return true;
    }


//f1>13 = f2>12
    //f1>13 = f2>13
    //f1>13 = f2>23
    if((same_point(face1[0], face2[0]) && same_point(face1[2], face2[1]))||(same_point(face1[0], face2[1]) && same_point(face1[2], face2[1])))
    {
        return true;
    }
    if((same_point(face1[0], face2[0]) && same_point(face1[2], face2[2]))||(same_point(face1[0], face2[2]) && same_point(face1[2], face2[0])))
    {
        return true;
    }
    if((same_point(face1[0], face2[1]) && same_point(face1[2], face2[2]))||(same_point(face1[0], face2[2]) && same_point(face1[2], face2[1])))
    {
        return true;
    }

    //f1>23 = f2>12
    //f1>23 = f2>13
    //f1>23 = f2>23
    
    if((same_point(face1[1], face2[0]) && same_point(face1[2], face2[1]))||(same_point(face1[1], face2[1]) && same_point(face1[2], face2[0])))
    {
        return true;
    }//propably a repeat, will sort out later
    if((same_point(face1[1], face2[0]) && same_point(face1[2], face2[2]))||(same_point(face1[1], face2[2]) && same_point(face1[2], face2[1])))
    {
        return true;
    }
    if((same_point(face1[1], face2[1]) && same_point(face1[2], face2[2]))||(same_point(face1[2], face2[1]) && same_point(face1[1], face2[2])))
    {
        return true;
    }
    
    //console.log('pre ln')

    return false;*/

}

function list_neighbours(face, shape)
{
    let list = []

    for(let i=0; i<shape.length; i++)
    {
        //console.log('ln')
        if(neighbour_face(face, shape[i]))
        {
            //console.log('add ' + shape[i])
            list.push(shape[i])
        }
        else
        {
            //console.log('no add')
        }
    }

    return list
}

function shared_edges(face1, face2)
{
    //only passing in shapes that have shared edges
    //Also will not pass in the same face so find 2 shared points

    //console.log('this is really untested');

    //find p1
    if(same_point(face1[0], face2[0]))
    {
        //f1 1 and f2 1
        if(same_point(face1[1], face2[1]))
        {
            return [face1[0], face1[1]]
        }
        //f1 1 and f2 2
        if(same_point(face1[1], face2[2]))
        {
            return [face1[0], face1[1]]
        }
        //esle f1 2
        return [face1[0], face1[2]]
    }
    else if(same_point(face1[0], face2[1]))
    {
        //f1 1 and f2 0
        if(same_point(face1[1], face2[0]))
        {
            return [face1[0], face1[1]]
        }
        //f1 1 and f2 2
        if(same_point(face1[1], face2[2]))
        {
            return [face1[0], face1[1]]
        }
        //esle f1 2
        return [face1[0], face1[2]]

    }
    else if(same_point(face1[0], face2[2]))
    {
        //f1 1 and f2 0
        if(same_point(face1[1], face2[0]))
        {
            return [face1[0], face1[1]]
        }
        //f1 1 and f2 2
        if(same_point(face1[1], face2[1]))
        {
            return [face1[0], face1[1]]
        }
        //esle f1 2
        return [face1[0], face1[2]]
    }
    else
    {//face1 first point is not shared return other 2 points
        return [face1[1],face1[2]];
    }

    //find p2

}

/*function first_centre(shape)
{
    //i am prepared for this to be completely wrong

    
        //find the bounding box

        //find the closest point of object to the bounding box
        //find two faces that use this point
        //find the centers of these faces
        //draw a line between the center
        //find the center of that line
        //the center of that line should be clostest to the inside point of both of the 2 shapes
    
    let [p1, p2] = bounding_box(shape)

    let point = shape[0][0];//shape,face,point
    let distance = distance_total(point, p1);

    for(let i=1; i<shape.length; i++)
    {
        for( let j=0; j<shape[i].length; j++)
        {
            //console.log(distance_total(shape[i][j], p1) + " " + shape[i][j])
            if(distance_total(shape[i][j], p1) < distance)
            {
                distance = distance_total(shape[i][j], p1)
                point = shape[i][j]
            }
        }
    }

    //console.log("bounding box points are " + p1 + " " + p2)
    //console.log("closest point is " + point)

    //find 2 points faces conected to this point
    let face1 = undefined
    let face2 = undefined
    let break_flag = false;
    
    for(let i=1; i<shape.length; i++)
    {
        //for( let j=0; j<shape[i].length; j++)
        //{
        //    if()
        //}
        if(same_point(shape[i][0], point)|| same_point(shape[i][0], point) || same_point(shape[i][0], point) )
        {
            if(face1 == undefined)
            {
                face1 = shape[i]
            }
            else
            {
                face2 = shape[i]
                break_flag = true;
            }
        }

        if(break_flag)
        {
            break
        }
    }
    //console.log('these are our new faces ' + face1 + " " + face2 + " includes " + point)

    //find mid point between centers of these faces
    let tc1 = triangle_middle(face1[0],face1[1],face1[2])
    let tc2 = triangle_middle(face2[0],face2[1],face2[2])

    //console.log('cnet 1 ' + tc1)
    //console.log('cnet 2 ' + tc2)

    let centre_centre = [(tc1[0]+tc2[0])/2,(tc1[1]+tc2[1])/2,(tc1[2]+tc2[2])/2]

    //find face ones 'vector points'
    let vvv = normal_vector(face1[0], face1[1], face1[2])
    vvv = scale_vector(vvv)

    let vp1 = [tc1[0]+vvv[0],tc1[1]+vvv[1],tc1[2]+vvv[2]]
    let vp2 = [tc1[0]+(-1*vvv[0]),tc1[1]+(-1*vvv[1]),tc1[2]+(-1*vvv[2])]

    let initial_inside;
    let outside;

    if(distance_total(centre_centre, vp1) < distance_total(centre_centre, vp2))
    {
        //console.log("vp1 is our inside point " + vp1)
        initial_inside = vp1
        outside = vp2
    }  
    else if(distance_total(centre_centre, vp1) > distance_total(centre_centre, vp2))
    {
        //console.log("vp2 is our inside point " + vp2)
        initial_inside = vp2
        outside = vp1
    }
    else
    {
        console.log("equal up this should be impossible")
    }

    console.log("intial face " + face1);
    console.log("inital inside point " + initial_inside)

    //now use bfs to find all center vector points
    
        //for all faces tracked through hashmap
        //find a neightbouring face that has its inside point
        //find the shared edge
        //find center of that edge
        //find vector of center of bost faces
        //find vecotr know faces center to middle of shared edge
        //find vecotr of edge
        //use cros product of (vector of edge, vector centers)

        //find where line from middle of edge using previos vecotr

        //and inside point using this vector( find vecotr know faces center to middle of shard edge) 
        //meet

        //this point will be closer to inside vector then out side vector

        //add this faces unqueed neighbours


    

    //bfs n^2 becuase finding neigbours for a shape is a n process
    const done = new Map();//map faces to thier inside points
    //add face one
    done.set(face1, [initial_inside,outside]);
    let next = []
    //add face1's neighbours
    let temp = list_neighbours(face1, shape)
    for(let i=0; i<temp.length; i++)
    {
        next.push([temp[i], face1])//needs the face, the center of the parent and parent face
    }

    let ttttt = 0
    console.log("strating mega algo");
    while(next.length!=0)
    {
        //ttttt++
        if(ttttt== 5)
        {
            break
        }

        

        let [doing_now, parent] = next.pop()
        //check if face alread computed
        if(done.has(doing_now))
        {
            continue
        }

        //console.log(not_same_face(doing_now, [[ 1, 0, -1 ],[ 0, 0, -1 ],[ 0, 0, 0 ]]) == false)
        //{
        //    console.log('i think i search for this')
        //}

        console.log(doing_now)
        console.log('doing face ' + doing_now + " has parent " + parent)



        //find shared edge
        let [sep1,sep2] = shared_edges(doing_now, parent)
        let sepC = [(sep1[0]+sep2[0])/2,(sep1[1]+sep2[1])/2,(sep1[2]+sep2[2])/2]

        console.log('these share edges ' + sep1 + "   " + sep2 + "  with center of " + sepC)

        //let pc = triangle_middle(parent[0],parent[1],parent[2])
        //let dnc = triangle_middle(doing_now[0],doing_now[1],doing_now[2])

        
        //let between_face_vector = vector_by_points(pc, dnc)

        //previously had centers of faces now
        //find vector from center of shared edge 
        //scale this vector
        //add one unit to 

        let pc = triangle_middle(parent[0],parent[1],parent[2])
        let dnc = triangle_middle(doing_now[0],doing_now[1],doing_now[2])

        console.log('middle of these faces   ' + dnc + "    parent   " + pc)

        //the order for this operation in this case is very delicate positives and negatives very imporant
        let pv = vector_by_points(pc, sepC)
        pv = scale_vector(pv)
        let dnv = vector_by_points(dnc, sepC)
        dnv = scale_vector(dnv)

        console.log('moving from sep to cents dnv ' + dnv + "    parent  " + pv)

        //finding these new points at a distance of one

        let dist_one_p = [sepC[0]+pv[0],sepC[1]+pv[1],sepC[2]+pv[2]]
        let dist_one_dn = [sepC[0]+dnv[0],sepC[1]+dnv[1],sepC[2]+dnv[2]]

        console.log("add to dn " + dist_one_dn)
        console.log("add to p " + dist_one_p)


        let between_v = vector_by_points(dist_one_p, dist_one_dn)
        let between_v2 = vector_by_points(sep1, sep2)

        console.log("our imporatnt vectors " + between_v)
        console.log(" " + between_v2)


        let outwards_vector = crossProduct(between_v,between_v2)//cross_product(between_v,between_v2)
        let outw2 = crossProduct(between_v,between_v2)
        console.log(outw2)
        console.log('outward_vector   ' + outwards_vector)
        let outward_vector = scale_vector(outwards_vector)
        console.log('outward_vector   ' + outwards_vector)

        //finding where pv from parents inside point meets outwards_vector from sepC


        let intintint = inter_from_points_and_vectors(done.get(parent)[0], sepC, pv, outwards_vector)


        console.log('the following point is derived from ' + done.get(parent)[0])
        console.log('hopefully this point fine  ' + intintint);

        //generate the 2 points to check
        vvv = normal_vector(doing_now[0],doing_now[1],doing_now[2])
        vvv = scale_vector(vvv)
        console.log('noramal vector of current face  ' + vvv + "      " + doing_now)

        vp1 = [dnc[0]+vvv[0],dnc[1]+vvv[1],dnc[2]+vvv[2]]
        vp2 = [dnc[0]+(-1*vvv[0]),dnc[1]+(-1*vvv[1]),dnc[2]+(-1*vvv[2])]

        console.log('two candidates ' + vp1 + "    " + vp2)


        if(distance_total(intintint, vp1) < distance_total(intintint, vp2))
        {
            done.set(doing_now, [vp1,vp2]);
            console.log("dn face" + doing_now + "    " + vp1)
        }
        else
        {//vp2 closer
            done.set(doing_now, [vp2,vp1]);
            console.log("dn face" + doing_now + "    " + vp2)
        }

        //add neighbours to que

        temp = list_neighbours(doing_now, shape)
        for(let i=0; i<temp.length; i++)
        {
            next.push([temp[i], doing_now])//needs the face, the center of the parent and parent face
        }

    }






    return done

    //key shape/ 3 point
    //value [center of shape, inside point]
}*/


function plane_equation(nv, point, new_point)
{
    //nv[0]*x - nv[0]*x1 +  nv[1]*y - nv[1]*y1 +  nv[2]*z - nv[2]*z1 = 0
    /*console.log('plane equation')
    console.log(nv)
    console.log(point)
    console.log(new_point)
    console.log('plane equation done')*/

    return (nv[0]*new_point[0] - nv[0]*point[0] +  nv[1]*new_point[1] - nv[1]*point[1] +  nv[2]*new_point[2] - nv[2]*point[2])
}

function first_centre(shapes)
{
    //i am prepared for this to be completely wrong

    /*
        find the bounding box

        find the closest point of object to the bounding box
        find two faces that use this point
        find the centers of these faces
        draw a line between the center
        find the center of that line
        the center of that line should be clostest to the inside point of both of the 2 shapes
    */
    let dones = []
    //let done
    for(let h=0; h<shapes.length; h++)
    {
        let [p1, p2] = bounding_box(shapes[h])

        let point = shapes[h][0][0];//shape,face,point
        let distance = distance_total(point, p1);

        for(let i=1; i<shapes[h].length; i++)
        {
            for( let j=0; j<shapes[h][i].length; j++)
            {
                //console.log(distance_total(shape[i][j], p1) + " " + shape[i][j])
                if(distance_total(shapes[h][i][j], p1) < distance)
                {
                    distance = distance_total(shapes[h][i][j], p1)
                    point = shapes[h][i][j]
                }
            }
        }

        //console.log("bounding box points are " + p1 + " " + p2)
        //console.log("closest point is " + point)

        //find 2 points faces conected to this point
        let face1 = undefined
        let face2 = undefined
        let break_flag = false;
        
        for(let i=1; i<shapes[h].length; i++)
        {
            /*for( let j=0; j<shape[i].length; j++)
            {
                if()
            }*/
            if(same_point(shapes[h][i][0], point)|| same_point(shapes[h][i][0], point) || same_point(shapes[h][i][0], point) )
            {
                if(face1 == undefined)
                {
                    face1 = shapes[h][i]
                }
                else
                {
                    face2 = shapes[h][i]
                    break_flag = true;
                }
            }

            if(break_flag)
            {
                break
            }
        }
        //console.log('these are our new faces ' + face1 + " " + face2 + " includes " + point)

        //find mid point between centers of these faces
        let tc1 = triangle_middle(face1[0],face1[1],face1[2])
        let tc2 = triangle_middle(face2[0],face2[1],face2[2])

        //console.log('cnet 1 ' + tc1)
        //console.log('cnet 2 ' + tc2)

        let centre_centre = [(tc1[0]+tc2[0])/2,(tc1[1]+tc2[1])/2,(tc1[2]+tc2[2])/2]

        //find face ones 'vector points'
        let vvv = normal_vector(face1[0], face1[1], face1[2])
        vvv = scale_vector(vvv)

        let vp1 = [tc1[0]+vvv[0],tc1[1]+vvv[1],tc1[2]+vvv[2]]
        let vp2 = [tc1[0]+(-1*vvv[0]),tc1[1]+(-1*vvv[1]),tc1[2]+(-1*vvv[2])]

        let initial_inside;
        let outside;

        if(distance_total(centre_centre, vp1) < distance_total(centre_centre, vp2))
        {
            //console.log("vp1 is our inside point " + vp1)
            initial_inside = vp1
            outside = vp2
        }  
        else if(distance_total(centre_centre, vp1) > distance_total(centre_centre, vp2))
        {
            //console.log("vp2 is our inside point " + vp2)
            initial_inside = vp2
            outside = vp1
        }
        else
        {
            console.log("equal up this should be impossible")
        }

        //console.log("intial face " + face1);
        //console.log("inital inside point " + initial_inside)

        //now use bfs to find all center vector points
        /*
            for all faces tracked through hashmap
            find a neightbouring face that has its inside point
            find the shared edge
            find center of that edge
            find vector of center of bost faces
            find vecotr know faces center to middle of shared edge
            find vecotr of edge
            use cros product of (vector of edge, vector centers)

            find where line from middle of edge using previos vecotr

            and inside point using this vector( find vecotr know faces center to middle of shard edge) 
            meet

            this point will be closer to inside vector then out side vector

            //add this faces unqueed neighbours


        */

        //bfs n^2 becuase finding neigbours for a shape is a n process
        //const done = new Map();//map faces to thier inside points
        dones[h] = new Map();//map faces to thier inside points
        //add face one
        dones[h].set(face1, [initial_inside,outside]);
        let next = []
        //add face1's neighbours
        let temp = list_neighbours(face1, shapes[h])
        for(let i=0; i<temp.length; i++)
        {
            next.push([temp[i], face1])//needs the face, the center of the parent and parent face
        }

        let ttttt=0;
        //console.log("strating mega algo");
        while(next.length!=0)
        {
            ttttt++
            if(ttttt==2)
            {
                //break
            }
            

            let [doing_now, parent] = next.pop()
            //check if face alread computed
            if(dones[h].has(doing_now))
            {
                continue
            }

            //console.log('doing face ' + doing_now + " has parent " + parent)

            //new algo
            //find parents noramal vector (use parents center and its inside point)
            //find equation of the plane on parent
            //nv[0]*x - nv[0]*x1 +  nv[1]*y - nv[1]*y1 +  nv[2]*z - nv[2]*z1 = 0
            //sub in the inside to this equation and remmber if it is negative or not

            let pc = triangle_middle(parent[0],parent[1],parent[2])
            let nv = vector_by_points(pc,dones[h].get(parent)[0])



            //find shared edge
            let [sep1,sep2] = shared_edges(doing_now, parent)
            let sepC = [(sep1[0]+sep2[0])/2,(sep1[1]+sep2[1])/2,(sep1[2]+sep2[2])/2]

            //console.log('these share edges ' + sep1 + "   " + sep2 + "  with center of " + sepC)

            //previously had centers of faces now
            //find vector from center of shared edge 
            //scale this vector
            //add one unit to 

            let dnc = triangle_middle(doing_now[0],doing_now[1],doing_now[2])

            //console.log('middle of these faces   ' + dnc + "    parent   " + pc)

            //the order for this operation in this case is very delicate positives and negatives very imporant
            let pv = vector_by_points(pc, sepC)
            pv = scale_vector(pv)
            let dnv = vector_by_points(dnc, sepC)
            dnv = scale_vector(dnv)

            //console.log('moving from sep to cents dnv ' + dnv + "    parent  " + pv)

            //finding these new points at a distance of one

            let dist_one_p = [sepC[0]+pv[0],sepC[1]+pv[1],sepC[2]+pv[2]]
            let dist_one_dn = [sepC[0]+dnv[0],sepC[1]+dnv[1],sepC[2]+dnv[2]]

            //console.log("add to dn " + dist_one_dn)
            //console.log("add to p " + dist_one_p)


            let between_v = vector_by_points(dist_one_p, dist_one_dn)
            let between_v2 = vector_by_points(sep1, sep2)

            //console.log("our imporatnt vectors " + between_v)
            //console.log(" " + between_v2)


            let outwards_vector = crossProduct(between_v,between_v2)//cross_product(between_v,between_v2)
            //let outw2 = crossProduct(between_v,between_v2)
            //console.log(outw2)
            //console.log('outward_vector   ' + outwards_vector)
            outwards_vector = scale_vector(outwards_vector)
            //console.log('outward_vector   ' + outwards_vector)


            //generate 2 point with outward vector on normal and one * -1
            //these points start at sepC
            let cand1 = [sepC[0] + outwards_vector[0], sepC[1] + outwards_vector[1], sepC[2] + outwards_vector[2]]
            let cand2 = [sepC[0] + -1*outwards_vector[0], sepC[1] + -1*outwards_vector[1], sepC[2] + -1*outwards_vector[2]]

            /*console.log('errrors here')
            console.log(sepC)
            console.log(outwards_vector)
            console.log(cand1)
            console.log(cand2)*/

            //ok here is the new stuff
            //nv[0]*x - nv[0]*x1 +  nv[1]*y - nv[1]*y1 +  nv[2]*z - nv[2]*z1 = 0
            //let needed = nv[0]*x - nv[0]*x1 +  nv[1]*y - nv[1]*y1 +  nv[2]*z - nv[2]*z1 = 0

            let refrence = plane_equation(nv, pc, dones[h].get(parent)[0])
            //console.log(refrence)
            let cand1_eq = plane_equation(nv, pc, cand1)
            let cand2_eq = plane_equation(nv, pc, cand2)

            //console.log('candidates ' + cand1_eq + " " + cand2_eq)



            //finding where pv from parents inside point meets outwards_vector from sepC

            //generate the 2 points to check
            vvv = normal_vector(doing_now[0],doing_now[1],doing_now[2])
            vvv = scale_vector(vvv)
            //console.log('noramal vector of current face  ' + vvv + "      " + doing_now)

            vp1 = [dnc[0]+vvv[0],dnc[1]+vvv[1],dnc[2]+vvv[2]]
            vp2 = [dnc[0]+(-1*vvv[0]),dnc[1]+(-1*vvv[1]),dnc[2]+(-1*vvv[2])]

            //console.log('two candidates ' + vp1 + "    " + vp2)

            if(refrence < 0)
            {
                //console.log('reference is negative ' + refrence)
                if(cand1_eq < 0)
                {
                    //console.log('cand1 is negative ' + cand1_eq)
                    //done.set(doing_now, [vp1,vp2]);
                    if(distance_total(cand1, vp1) < distance_total(cand1, vp2))
                    {
                        dones[h].set(doing_now, [vp1,vp2]);
                    }
                    else
                    {
                        dones[h].set(doing_now, [vp2,vp1]);
                    }
                }
                else
                {
                    //console.log('cand2 is negative ' + cand2_eq)
                    if(distance_total(cand2, vp1) < distance_total(cand2, vp2))
                    {
                        dones[h].set(doing_now, [vp1,vp2]);
                    }
                    else
                    {
                        dones[h].set(doing_now, [vp2,vp1]);
                    }
                }
            }
            else
            {//refernce is greater then 0
                //console.log('reference is positve ' + refrence)
                
                if(cand1_eq > 0)
                {
                    //console.log('cand1 is postive ' + cand1_eq)
                    if(distance_total(cand1, vp1) < distance_total(cand1, vp2))
                    {
                        dones[h].set(doing_now, [vp1,vp2]);
                    }
                    else
                    {
                        dones[h].set(doing_now, [vp2,vp1]);
                    }
                }
                else
                {
                    //console.log('cand2 is postive ' + cand2_eq)
                    if(distance_total(cand2, vp1) < distance_total(cand2, vp2))
                    {
                        dones[h].set(doing_now, [vp1,vp2]);
                    }
                    else
                    {
                        dones[h].set(doing_now, [vp2,vp1]);
                    }
                }
            }

            temp = list_neighbours(doing_now, shapes[h])
            for(let i=0; i<temp.length; i++)
            {
                next.push([temp[i], doing_now])//needs the face, the center of the parent and parent face
            }


            

        }
    }

    return dones
    //key shape/ 3 point
    //value [center of shape, inside point]
}

/*
if(distance_total(intintint, vp1) < distance_total(intintint, vp2))
        {
            done.set(doing_now, [vp1,vp2]);
            console.log("dn face" + doing_now + "    " + vp1)
        }
        else
        {//vp2 closer
            done.set(doing_now, [vp2,vp1]);
            console.log("dn face" + doing_now + "    " + vp2)
        }

        //add neighbours to que

        temp = list_neighbours(doing_now, shape)
        for(let i=0; i<temp.length; i++)
        {
            next.push([temp[i], doing_now])//needs the face, the center of the parent and parent face
        }
*/