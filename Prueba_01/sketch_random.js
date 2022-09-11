function setup() {
    var width = 250; //ancho de lienzo
    var height = 200; //altura de lienzo
    

    var canvas = createCanvas(width, height);
    canvas.parent('sketch_holder'); //div donde va el canvas
    background(0,51,102); //fondo RGB
    //scale(1.5);
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125);
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }

    var data = [];
    var point = [140, 90]; //query

    //random data de 12 datos random

    for (let i = 0; i < 12; i++) {
        //height corregido por width
        var x = Math.floor(Math.random() * width);//floor redondea random genera float aleatorio entre 0 y 1
        var y = Math.floor(Math.random() * height);//y puede tomar un valor entre 0 y altura
        let newPoint = new N_Point([x, y]);
        data.push(newPoint);
    }

    //build KD-tree with data

    var dataChange = data.slice(); //variable temporal porque la siguiente linea modifica data!!!!!
    var dataKNN = data.slice();

    var root = buildKDTree(dataChange);
    console.log(root);

    // closest point
    var closestPoint = closest_point_brute_force(data, point);

    console.log("CLOSEST POINT BRUTE FORCE : " + closestPoint);

    closestPoint = closest_point(root, point);
    console.log("CLOSEST POINT NAIVE : " + closestPoint.point.vectorialSpace);

    //KNN(dataKNN, 5, point);

    //plot points
    var x = point[0];
    var y = point[1];

    fill(81, 209, 246);
    circle(x, height - y, 7);
    textSize(8);
    text(x + ',' + y, x + 5, height - y);


    for (let i = 0; i < data.length; i++) {
        x = data[i].vectorialSpace[0];
        y = data[i].vectorialSpace[1];
        fill(255, 255, 255);
        circle(x, height - y, 7);
        textSize(8);
        text(x + ',' + y, x + 5, height - y);
    }

    x = closestPoint.point.vectorialSpace[0];
    y = closestPoint.point.vectorialSpace[1];
    fill(57, 255, 20);
    circle(x, height - y, 7);
    textSize(8);
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
