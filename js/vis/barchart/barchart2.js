
// let bardata = [{year:"2014", dead_missing:0, survive:0},{year:"2015", dead_missing:0, survive:0},
// {year:"2016", dead_missing:0, survive:0},{year:"2017", dead_missing:0, survive:0},
// {year:"2018", dead_missing:0, survive:0},{year:"2019", dead_missing:0, survive:0}];

// var bar1margin = {top: 30, right: 50, bottom: 30, left: 50},
//         bar1width = 800 - bar1margin.left - bar1margin.right,
//         bar1height = 500 - bar1margin.top - bar1margin.bottom;

var barchart2Div = document.getElementById("bar_chart2");
var bar2svgwidth = barchart2Div.clientWidth+200;
var bar2svgheight = barchart2Div.clientHeight + 400;

var bar2margin = {top: 30, right: 40, bottom: 500, left: 70},
bar2width = bar2svgwidth - bar2margin.left - bar2margin.right,
bar2height = bar2svgheight - bar2margin.top - bar2margin.bottom;


d3.csv("data/barcharts.csv", row=>{
    return {
        // ...row,
        type: row.type,
        typenum: +row.typenum
    }
}).then(data=>{
    // console.log(data);
    let yMinTarget = d3.min(data, function(d){ return d.typenum});
    let yMaxTarget = d3.max(data, function(d){ return d.typenum});
    // console.log(yMinTarget, yMaxTarget);
    let x = d3.scaleBand()
                .rangeRound([0, bar2width])
                .padding(0.35);
                // .align(0.3);
    
    let y = d3.scaleLinear()
        .rangeRound([bar2height, 0]);

    x.domain(data.map(d=>d.type));
    y.domain([0, yMaxTarget]);


    // let color = d3.scaleOrdinal().range(["lightgray", "salmon"]);

    let xAxis = d3.axisBottom().scale(x);

    let yAxis = d3.axisLeft().scale(y);

    let svg = d3.select(barchart2Div).append("svg")
            .attr("width", bar2svgwidth)
            .attr("height", bar2svgheight)
            .append("g")
            .attr("transform", "translate(" + bar2margin.left + "," + bar2margin.top + ")");

    var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
        .html(function(d) {
            var content = "<span style='margin-left: 1px;'><b>" + d.type + "</b></span><br>";
            content +=`
                    <table style="margin-top: 1px;">
                            <tr><td>Number of Attack by type: </td><td style="text-align: right">` + d.typenum + `</td></tr>
                    </table>
                    `;
            return content;
        });
    svg.call(tip);


    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + bar2height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-1.5em")
            .attr("dy", "-0.01em")
            .attr("transform", "rotate(-90)" );

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 9)
            .attr("dy", ".3em")
            // .attr("dy", ".01em")
            .style("text-anchor", "end")
            .text("Number (attack)")
            .style("font-size","13px");

    svg.selectAll("bar")
            .data(data)
          .enter().append("rect")
            .style("fill", "saddlebrown")
            .attr("x", function(d) { return x(d.type); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.typenum); })
            .attr("height", function(d) { return bar2height - y(d.typenum); })
            
            .on("mouseover", function() {
                d3.select(this)
                    .style("fill", "red");
                // d3.select(this)
                //     .text(function(d) { return d.targetnum; });
            })
            .on("mouseout", function() {
                d3.select(this)
                    .style("fill", "salmon");
            })
            .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on('click', function(d){

            console.log(d.type)
           });
    
});
