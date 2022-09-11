////
function setup(){
    var width = 250;
    var height = 200;

    var canvas = createCanvas(width, height);
    canvas.parent('sketch_holder');
    background(0,51,102);
    for( var x = 0; x < width; x += width / 10){
        for( var y = 0; y < height; y += height /5){
            stroke(128,128, 128);//borde /******************* */
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }

    var data = [];
    var point = [100,100]; // query
    
    //random data
    
    for(let i = 0; i < 500; i++){ // 500 puntos
        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        let newPoint = new N_Point([x,y]);
        data.push(newPoint);
    }

    //build KD-tree with data

    var dataChange = data.slice(); //variable temporal dataCHange copia shallow
    var root = buildKDTree(dataChange);

    console.log(root);
    
    // closest point
    var closestPoint1 = closest_point_brute_force(data, point);
    var closestPoint2 = naive_closest_point(root, point);
    var closestPoint3 = closest_point(root, point);
    
    console.log("CLOSEST POINT por Fuerza Bruta : "+ closestPoint1);
    console.log("Punto cercano por naive : "+ closestPoint2);
    //console.log("CLOSEST POINT: " + closestPoint3);

    let knnPoints = range_query_circle(data,point, 50, null);
    console.log(knnPoints);
    
    //plot points
    for(let i=0;i<data.length;i++){
        x = data[i].vectorialSpace[0];
        y = data[i].vectorialSpace[1];
        fill(255, 255, 255);
        circle(x, height - y, 6);//************************ */
        //textSize(8);//******************
    }
    x = closestPoint2[0];
    y = closestPoint2[1];
    
    
    for(let i = 0; i < knnPoints.length; ++i) {
        x = knnPoints[i][0];
        y = knnPoints[i][1];
        fill(255, 255, 0);
        circle(x, height - y, 6);
        //textSize(8);
    }
    
    var x =  point[0];
    var y =  point[1];

    fill(255, 0, 0);
    circle(x, height - y, 7);
    textSize(10);
    text(x + ',' + y, x + 5, height - y);   

    // plot graph en SVG en el DIV graphholder
    var graph = generateDot(root);

    var options = {
        format: 'svg'
    }
      
    var image = Viz(graph, options);
    var graph_holder = document.getElementById('graph_holder');
    
    graph_holder.innerHTML = image;		// SVG lo manda al DIV graphholder

}
