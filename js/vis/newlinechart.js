//hehe it worked 
function newlinechart(){
        let parseDate = d3.timeParse("%Y");
        let formatTime = d3.timeFormat("%Y");

        d3.csv("data/globalterrorism_line.csv", row=>{
        return {
        // ...row,
        Year: parseDate(row.Year.toString()),
        Events: +row.Events,
        Deaths:  +row.Deaths
        }
        }).then(data=>{ 
        var height = 400;
        var width =600;

        var maxYear= d3.max(data,(d)=>d.Year)
        var minYear= d3.min(data,(d)=>d.Year)
        var maxDeaths= d3.max(data,(d)=>d.Deaths)

        let div = d3
                  .select('#line_chart')
                  .append('div')
                  .attr('class', 'tooltip')
                  .style('opacity', 0);

        var y = d3.scaleLinear()
                .domain([0, maxDeaths])
                .range([height,0])


        var x = d3.scaleTime()
                .domain([minYear, maxYear])
                .range([0,width])

        var yAxis =d3.axisLeft(y)
        var xAxis = d3.axisBottom(x)


        var line_svg = d3.select('#line_chart').append('svg')
                .attr('height', '600')
                .attr('width', '800')
                        
        var chartgroup = line_svg.append('g')
                           .attr('transform','translate(100,50)')

        var line = d3.line()
                .x(d=>x(d.Year))
                .y(d=>y(d.Deaths))       
                
        var line2= d3.line()
                .x(d=>x(d.Year))
                .y(d=>y(d.Events))
        
        chartgroup.append('g')
                .attr('class','x axis')
                .attr('transform', 'translate(0, '+height+')')
                .call(xAxis)

        chartgroup.append('g')
                .attr('class','y axis')
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 9)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Number of Attacks and Deaths");

        chartgroup.append('path')
                .attr('d',line(data))
                .attr("stroke", "red")
                .attr('stroke-width', '7px');

        chartgroup.append('path')
                .attr('d',line2(data))
                .attr("stroke", "black")
                .attr('stroke-width', '7px');
        
                // Add the scatterplot
        chartgroup
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 0.1)
        .attr('cx', d => x(d.Year))
        .attr('cy', d => y(d.Events))
        .attr('stroke-width', '4px')
        .attr('stroke', 'white')
        .style('cursor', 'pointer')
        .on('mouseover', d => {
        div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
        div
        .html(d.Events + " attacks in " + formatTime(d.Year))
        .style('left', d3.event.pageX - 100+ 'px')
        .style('top', d3.event.pageY - 150 + 'px');
        })
        .on('mouseout', () => {
        div
        .transition()
        .duration(500)
        .style('opacity', 0);
        });

        chartgroup
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 0.1)
        .attr('cx', d => x(d.Year))
        .attr('cy', d => y(d.Deaths))
        .attr('stroke-width', '4px')
        .attr('stroke', 'white')
        .style('cursor', 'pointer')
        .on('mouseover', d => {
        div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
        div
        .html(d.Deaths + " deaths in " + formatTime(d.Year))
        .style('left', d3.event.pageX - 100 + 'px')
        .style('top', d3.event.pageY - 150 + 'px')
        .attr('fill','red');
        })
        .on('mouseout', () => {
        div
        .transition()
        .duration(500)
        .style('opacity', 0);
        });

        })


}

newlinechart();

//BRAINSTORM-IGNORE
// function newlinechart(){
//   let margin = {
//     top: 30,
//     right: 20,
//     bottom: 30,
//     left: 50
//   };
//   let width = 600 - margin.left - margin.right;
//   let height = 270 - margin.top - margin.bottom;
//   // Parse the date / time
//   let parseDate = d3.timeParse("%Y");
//   let formatTime = d3.timeFormat("%Y");
//   // Set the ranges
//   let x = d3.scaleTime().range([0, width]);
//   let y = d3.scaleLinear().range([height, 0]);
//   // Define the axes
//   let xAxis = d3.axisBottom(x).ticks(5);
//   let yAxis = d3.axisLeft(y)
//     .ticks(5);
//   // Define the line
//   let valueline = d3.line()
//     .x(d => x(d.Year))
//     .y(d => y(d.Events));
  
//   let valuelinev2 = d3.line()
//     .x(d => x(d.Year))
//     .y(d => y(d.Deaths));
  
//   // Define the div for the tooltip
//   let div = d3
//     .select('#line_chart')
//     .append('div')
//     .attr('class', 'tooltip')
//     .style('opacity', 0);
//   // Adds the svg canvas
//   let svg = d3
//     .select('#line_chart')
//     .append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//   // Get the data
// d3.csv("data/globalterrorism_line.csv", row=>{
//   return {
//       // ...row,
//       Year: parseDate(row.Year.toString()),
//       Events: +row.Events,
//       Deaths:  +row.Deaths
//   }
// }).then(data=>{ 

//   var maxYear= d3.max(data,(d)=>d.Year)
//   var minYear= d3.min(data,(d)=>d.Year)
//   var maxDeaths= d3.max(data,(d)=>d.Deaths)

//   // Scale the range of the data
//   x.domain([minYear, maxYear]);
//   y.domain([0, maxDeaths]);
  
//     // Add the X Axis
//   svg
//     .append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(xAxis);

//   // Add the Y Axis
//   svg
//     .append('g')
//     .attr('class', 'y axis')
//     .call(yAxis)
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 9)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end")
//     .text("Number of Deaths and Events");

//   // Add the valueline path. 
//   svg
//     .append('path')
//     .attr('class', 'line')
//     .attr("stroke", "black")
//     .attr('d', valueline(data));

//   svg
//     .append('path')
//     .attr('class', 'line')
//     .attr("stroke", "red")
//     .attr('d', valuelinev2(data));


//   // Add the scatterplot
//   svg
//     .selectAll('dot')
//     .data(data)
//     .enter()
//     .append('circle')
//     .attr('r', 2)
//     .attr('cx', d => x(d.Year))
//     .attr('cy', d => y(d.Events))
//     .attr('stroke-width', '20px')
//     .attr('stroke', 'rgba(0,0,0,0)')
//     .style('cursor', 'pointer')
//     .on('mouseover', d => {
//       div
//         .transition()
//         .duration(200)
//         .style('opacity', 0.9);
//       div
//         .html(d.Events + " attacks in " + formatTime(d.Year))
//         .style('left', d3.event.pageX + 'px')
//         .style('top', d3.event.pageY - 28 + 'px');
//     })
//     .on('mouseout', () => {
//       div
//         .transition()
//         .duration(500)
//         .style('opacity', 0);
//     });

//     svg
//     .selectAll('dot')
//     .data(data)
//     .enter()
//     .append('circle')
//     .attr('r', 2)
//     .attr('cx', d => x(d.Year))
//     .attr('cy', d => y(d.Deaths))
//     .attr('stroke-width', '20px')
//     .attr('stroke', 'rgba(0,0,0,0)')
//     .style('cursor', 'pointer')
//     .on('mouseover', d => {
//       div
//         .transition()
//         .duration(200)
//         .style('opacity', 0.9);
//       div
//         .html(d.Deaths + " deaths in " + formatTime(d.Year))
//         .style('left', d3.event.pageX + 'px')
//         .style('top', d3.event.pageY - 28 + 'px');
//     })
//     .on('mouseout', () => {
//       div
//         .transition()
//         .duration(500)
//         .style('opacity', 0);
//     });


// })

// }

// newlinechart();









//VEGALITE CODE 

// // // document.querySelector(".select-control").addEventListener("change", updateBarChart);

// // function updateBarChart(){
// // //   let column = document.querySelector(".select-control").value;
// //   let spec = {
    
// //     "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
// //     "data": {"url": "data/globalterrorism_line.csv", "format": {"type": "csv"}},
// //     "width": 800,
// //     "height": 400,
// //     "title": "Events and Deaths over Time",
// //     "layer": [
// //       {
// //         "mark": "line",
// //         "encoding": {
// //           "color": {"type": "nominal", "field": "Types"},
// //           "x": {"type": "temporal", "field": "Year", "axis": {"grid": false}},
// //           "y": {"type": "quantitative", "field": "Ratio", "axis": {"grid": false}}
// //         }
// //       },
// //       {
// //         "mark": "point",
// //         "encoding": {
// //           "opacity": {"value": 0},
// //           "x": {"type": "temporal", "field": "Year"}
// //         },
// //         "selection": {
// //           "tooltip": {
// //             "type": "single",
// //             "nearest": true,
// //             "on": "mouseover",
// //             "fields": ["Year"],
// //             "empty": "none",
// //             "resolve": "global"
// //           }
// //         }
// //       },
// //       {
// //         "mark": "point",
// //         "encoding": {
// //           "color": {"type": "nominal", "field": "Types"},
// //           "opacity": {
// //             "condition": {"selection": "tooltip", "value": 1},
// //             "value": 0
// //           },
// //           "x": {"type": "temporal", "field": "Year"},
// //           "y": {"type": "quantitative", "field": "Ratio"}
// //         }
// //       },
// //       {
// //         "mark": {"type": "rule", "color": "gray"},
// //         "encoding": {"x": {"type": "temporal", "field": "Year"}},
// //         "transform": [{"filter": {"selection": "tooltip"}}]
// //       },
// //       {
// //         "mark": {"type": "text", "align": "left", "dx": 5, "dy": -5},
// //         "encoding": {
// //           "text": {
// //             "condition": {
// //               "type": "quantitative",
// //               "field": "Ratio",
// //               "selection": "tooltip"
// //             },
// //             "value": " "
// //           },
// //           "x": {"type": "temporal", "field": "Year"},
// //           "y": {"type": "quantitative", "field": "Ratio"}
// //         }
// //       }
// //     ],
// //     "config": {}
      
// //   };
// //   vegaEmbed('#line_chart', spec);
// // }

// // updateBarChart();
// }

// newlinechart();


//OLD COPY JUST IN CASE 

// function newlinechart(){
//         let parseDate = d3.timeParse("%Y");
//       d3.csv("data/globalterrorism_line.csv", row=>{
//         return {
//             // ...row,
//             Year: parseDate(row.Year.toString()),
//             Events: +row.Events,
//             Deaths:  +row.Deaths
//         }
//       }).then(data=>{ 
//         var height = 400;
//         var width =600;
      
//         var maxYear= d3.max(data,(d)=>d.Year)
//         var minYear= d3.min(data,(d)=>d.Year)
//         var maxDeaths= d3.max(data,(d)=>d.Deaths)
      
//         var y = d3.scaleLinear()
//                 .domain([0, maxDeaths])
//                 .range([height,0])
      
      
//         var x = d3.scaleTime()
//                 .domain([minYear, maxYear])
//                 .range([0,width])
      
//         var yAxis =d3.axisLeft(y)
//         var xAxis = d3.axisBottom(x)
      
      
//         var svg =d3.select('#line_chart').append('svg')
//                   .attr('height', '600')
//                   .attr('width', '800')
                      
      
//         var chartgroup= svg.append('g')
//                         .attr('transform','translate(100,50)')
      
//         var line = d3.line()
//                   .x(d=>x(d.Year))
//                   .y(d=>y(d.Deaths))
                 
                  
//         var line2= d3.line()
//             .x(d=>x(d.Year))
//             .y(d=>y(d.Events))
            
      
//         chartgroup.append('g')
//                 .attr('class','x axis')
//                 .attr('transform', 'translate(0, '+height+')')
//                 .call(xAxis)
//                 // .append("text")
//                 // .attr("transform", "rotate(0)")
//                 // .attr("y", 9)
//                 // .attr("dx", "40em")
//                 // .attr("dy", "-1em")
//                 // .style("text-anchor", "end")
//                 // .text("Years");
      
//         chartgroup.append('g')
//                 .attr('class','y axis')
//                 .call(yAxis)
//                 .append("text")
//                 .attr("transform", "rotate(-90)")
//                 .attr("y", 9)
//                 .attr("dy", ".71em")
//                 .style("text-anchor", "end")
//                 .text("Number of Events and Deaths");
      
        
//         chartgroup.append('path')
//                 .attr('d',line(data))
//                 .attr("stroke", "red")
      
//         chartgroup.append('path')
//                   .attr('d',line2(data))
//                   .attr("stroke", "black")
      
//       })
      
      
//       }
      
//       newlinechart();