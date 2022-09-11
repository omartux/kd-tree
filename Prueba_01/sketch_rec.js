////
function setup() {
    var width = 1000; //ancho de lienzo
    var height = 1000; //altura de lienzo
    var canvas = createCanvas(width, height);
    canvas.parent('sketch_holder');
    background(0, 51, 102);
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 10) {
            stroke(128, 128, 128);
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }

    var data = [];
    var point = [500, 500]; // query

    //random data

    for (let i = 0; i < 1000; i++) { // 500 puntos
        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        let newPoint = new N_Point([x, y]);
        data.push(newPoint);
    }

    //build KD-tree with data

    var dataChange = data.slice(); //variable temporal porque la siguiente linea modifica data!!!!!
    var root = buildKDTree(dataChange);

    console.log(root);

    // closest point
    var closestPoint1 = closest_point_brute_force(data, point);
    var closestPoint2 = naive_closest_point(root, point);
    var closestPoint3 = closest_point(root, point);

    console.log("CLOSEST POINT BRUTE FORCE : " + closestPoint1);
    console.log("NAIVE CLOSEST POINT NAIVE : " + closestPoint2);
    //console.log("CLOSEST POINT: " + closestPoint3);

    //let knnPoints = range_query_circle(data,point, 50, null);
    //console.log(knnPoints);
    //function range_query_rec(data, center, diameter, queue, depth = 0) 
    let knnPoints = range_query_rec(data, point, 200,  null);
    console.log(knnPoints);
    //plot points
    for (let i = 0; i < data.length; i++) {
        x = data[i].vectorialSpace[0];
        y = data[i].vectorialSpace[1];
        fill(255, 255, 255);
        circle(x, height - y, 8);
        textSize(14);
    }
    x = closestPoint2[0];
    y = closestPoint2[1];


    for (let i = 0; i < knnPoints.length; ++i) {
        x = knnPoints[i][0];
        y = knnPoints[i][1];
        fill(255, 255, 0);
        circle(x, height - y, 10);
        textSize(14);
    }

    var x = point[0];
    var y = point[1];
    fill(255, 0, 0);
    circle(x, height - y, 15);
    textSize(14);
    text(x + ',' + y, x + 5, height - y);

    // plot graph
    var graph = generateDot(root);

    var options = {
        format: 'svg'
    }

    var image = Viz(graph, options);
    var graph_holder = document.getElementById('graph_holder');

    graph_holder.innerHTML = image;		// SVG

}
