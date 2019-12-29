 //Slider Properties
 
 var barWidth = 500;
 var maxValue = 2018;
 var minValue = 1970;
 var initialValue = minValue;
 var color = "#ECECEC";
 var emptyColor = "#ECECEC";
 var thumbColor = "white";
 var lineWidth = 6;
 var thumbSize = 6;
 ////////////////////////////////////////
 var render = function() {},
    v0, // Mouse position in Cartesian coordinates at start of drag gesture.
    r0, // Projection rotation as Euler angles at start.
    q0; // Projection rotation as versor at start.

function dragstarted() {
  v0 = versor.cartesian(projection.invert(d3.mouse(this)));
  r0 = projection.rotate();
  q0 = versor(r0);
  // console.log("1",v0,"2",r0,"3",q0)
}

function spin(){
  projection.rotate([90, config.verticalTilt, config.horizontalTilt]);
  d3.timer(function (elapsed) {
    projection.rotate([config.speed * elapsed - 10, config.verticalTilt, config.horizontalTilt]);
    earth.selectAll("path").attr("d", path);
});
}



function dragged() {
  // spin();
  var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this))),
      q1 = versor.multiply(q0, versor.delta(v0, v1)),
      r1 = versor.rotation(q1);
      // console.log(r1);
      projection.rotate(r1);
       earth.selectAll("path").attr("d", path);
  // render();
  //rotate the earth based on v1, q1, r1
  
        // Rotate Three.js objects according to the versor
        // for some strange reason the order of arguments is not the same
        // var q = new earth.Quaternion(-q1[2], q1[1], q1[3], q1[0])
        //q.normalize() // not needed since our versor norm = 1
        // earth.setRotationFromQuaternion(earth)
        // drawShadeLayer()
       
}
////***********drag function end************************ */

 var NormValue = (initialValue-minValue)/(maxValue-minValue); // value normalized between 0-1
 var selectedValue;
 var bar = d3.select("#big_guy_slider").append("svg").attr('width', barWidth + 30).attr("viewBox", '-15,0,' + (barWidth + 30) + ',40');


 document.getElementById("current_yr").innerHTML = 1970;
//  document.getElementById("value").value = initialValue;

 function dragEnded() {
     selectedValue = d3.event.x;

     if (selectedValue < 0)
         selectedValue = 0;
     else if (selectedValue > barWidth)
         selectedValue = barWidth;

     NormValue = selectedValue / barWidth;
     valueCircle.attr("cx", selectedValue);
     valueLine.attr("x2", barWidth * NormValue);
     emptyLine.attr("x1", barWidth * NormValue);

    //  d3.event.sourceEvent.stopPropagation();
    //  document.getElementById("value").value = (NormValue*(maxValue-minValue)+minValue).toFixed(0)
    
    document.getElementById("current_yr").innerHTML = (NormValue*(maxValue-minValue)+minValue).toFixed(0)
    
  }
//update the graph here
function rerenderEarth(){
  selected_yr = document.getElementById("current_yr").innerHTML;

Promise.all([
  d3.csv("data/final/newglobe.csv"),
]).then(function (data){

  let max;
  numKilled = [];
  for (var i in data[0]){
    if( data[0][i].year == selected_yr){
      numKilled.push(+data[0][i].death);
      }
    }
 
  max = d3.max(numKilled);
  
  earth.selectAll("path")
  .attr("fill",function(d){
    let local_coun = d.properties.name;
   
      for(i in data[0]){
        if(data[0][i].year == selected_yr){
          // console.log(data[0][i].country)
          if(data[0][i].country == local_coun){
            //color range
             return deathColor(data[0][i].death,0,max)
          }
        }
      }
      return("white")
  })
    
}


)}



 //Line to represent the current value
 var valueLine = bar.append("line")
         .attr("x1", 0)
         .attr("x2", barWidth * NormValue)
         .attr("y1", 20)
         .attr("y2", 20)
         .style("stroke", color)
         .style("stroke-linecap", "round")
         .style("stroke-width", lineWidth);

 //Line to show the remaining value
 var emptyLine = bar.append("line")
         .attr("x1", barWidth * NormValue)
         .attr("x2", barWidth)
         .attr("y1", 20)
         .attr("y2", 20)
         .style("stroke", emptyColor)
         .style("stroke-linecap", "round")
         .style("stroke-width", lineWidth);
        

function mouseUp(){
          console.log("dsaasddsa");
        }
 //Draggable circle to represent the current value
 var valueCircle = bar.append("circle")
         .attr("cx", barWidth * NormValue)
         .attr("cy", 20)
         .attr("r", thumbSize)
         .style("stroke", "black")
         .style("stroke-width", 1)
         .style("fill", thumbColor)
         .call(d3.drag().on("drag", dragEnded).on("end",rerenderEarth));

       
         
        

         
let width = 800,
height = 500;
//change your speed and angle here
const config = {
  speed: 0.05,
  verticalTilt: -10,
  horizontalTilt: 0
}
//input the value(death number), max(death#) and min(death#)
//return the desired color
function deathColor(inputValue,min,max) {

    var darkRed = d3.rgb(255,26,26);    
    var lightColor = d3.rgb(196, 196, 196);        

    var color = d3.interpolate(lightColor,darkRed);
    var linear = d3.scaleLinear()
        .domain([min, max])
        .range([0, 5]);

    var colorLinear = d3.scaleLinear()
      .domain([min,max])
      .range([lightColor, darkRed]);
    var svgC = d3.select("#legendLinear");

    svgC.selectAll('*').remove();
    svgC.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(20,20)");

  var legendLinear = d3.legendColor()
    .shapeWidth(100)//legend length here
    // .orient('verticle')
    .orient("horizontal")
    .scale(colorLinear);

  svgC.select(".legendLinear")
      .call(legendLinear);
        // console.log(min,max)
    // svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 10).style("fill", lightColor)
    // svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 10).style("fill", darkRed)
    // svg.append("text").attr("x", 220).attr("y", 130).text(min).style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", 220).attr("y", 160).text(max).style("font-size", "15px").attr("alignment-baseline","middle")

  return (color(linear(inputValue) ));
  
}







let earth = d3.select("#big_guy").append("svg")
      .attr("width", width)
      .attr("height", height);
let projection = d3.geoOrthographic()
// let projection = d3.geoMercator()
//     .translate([width / 2, height / 2])

//spin!!~




let path = d3.geoPath()
             .projection(projection);


//initial the earth here with data of 1970
// spin();

Promise.all([
    d3.csv("./data/final/newglobe.csv"),
    d3.json("./data/final/world-110m.json")
]).then(function(data){
    let death = data[0];
    let worldmap = data[1];
    let world = topojson.feature(worldmap, worldmap.objects.countries).features;
    
    numKilled = [];


    for (var i in death){
      // console.log("2dadasadsdaads", i)
      if(death[i].year == "1970"){

        numKilled.push(+death[i].death)

    
        }
      }
    // console.log("killllll",numKilled)

    let globetooltip = d3.select('body')
    .append('div')
    .attr("class","globetooltip")
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('color', 'black')
    // .style("background",'black')
    .style('visibility', 'hidden')   
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .text('')
    // let globetooltip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])


    let min = 0, max;
    max = d3.max(numKilled);
    // console.log(max,min,numKilled)
    earth.selectAll("path")
		    .data(world)
        .enter()
        .append("path")
        .attr('stroke', 'black')
        .attr("d", path)
        .on("mouseover",globemouseOverEvent)
        .on("mouseout", globemouseOutEvent)
        .attr("fill", function(d){
          
          //get the country name here
          let local_coun = d.properties.name
          // console.log(local_coun)
          for (i in death){
            
            if(death[i].year == "1970" ){
              
              
              if(death[i].country == local_coun){
                let inputV = death[i].death;
                // console.log("kokokokoko", inputV)
                return deathColor(inputV,min,max);
              }
  
            }

          }
          return("white")
        })
        .call(d3.drag()
    .on("start", dragstarted)
    // .on("start", function(){
    //   console.log("2133129090")
    // })
    .on("drag", dragged));;



    function globemouseOverEvent(d){
      // console.log(death);
      let countryDeath = "NA";
      selected_yr2 = document.getElementById("current_yr").innerHTML;

      for (var i in death){
       
        if(death[i].year == selected_yr2 && death[i].country == d.properties.name){
  
         
          countryDeath = death[i].death
      
          }
        }
      // console.log(d)
      //    console.log("111111");
      return globetooltip.text("Country name: " + d.properties.name +", Death:"+ countryDeath)

      .style("left",(d3.event.pageX)+"px")
      .style("top",(d3.event.pageY+20)+"px")
      .style("visibility", "visible")
      .style("opacity", 0.8)
      .style("background-color", "white")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")}

      function globemouseOutEvent(d){
        return globetooltip.style("opacity", 0);
        
              }
})





