
// let bardata = [{year:"2014", dead_missing:0, survive:0},{year:"2015", dead_missing:0, survive:0},
// {year:"2016", dead_missing:0, survive:0},{year:"2017", dead_missing:0, survive:0},
// {year:"2018", dead_missing:0, survive:0},{year:"2019", dead_missing:0, survive:0}];

// var bar1margin = {top: 30, right: 50, bottom: 30, left: 50},
//         bar1width = 800 - bar1margin.left - bar1margin.right,
//         bar1height = 500 - bar1margin.top - bar1margin.bottom;

var barchart1Div = document.getElementById("bar_chart1");
var bar1svgwidth = barchart1Div.clientWidth+200;
var bar1svgheight = barchart1Div.clientHeight + 200;

var bar1margin = {top: 30, right: 50, bottom: 200, left: 100},
bar1width = bar1svgwidth - bar1margin.left - bar1margin.right,
bar1height = bar1svgheight - bar1margin.top - bar1margin.bottom;


d3.csv("data/barcharts.csv", row=>{
    return {
        // ...row,
        target: row.target,
        targetnum: +row.targetnum
    }
}).then(data=>{
    // console.log(data);
    // data.sort(function (a, b) {
    //     return a.targetnum - b.targetnum;
    // });

    let yMinTarget = d3.min(data, function(d){ return d.targetnum});
    let yMaxTarget = d3.max(data, function(d){ return d.targetnum});
    // console.log(yMinTarget, yMaxTarget);
    let x = d3.scaleBand()
                .rangeRound([0, bar1width])
                .padding(0.35);
                // .align(0.3);
    
    let y = d3.scaleLinear()
        .rangeRound([bar1height, 0]);

    x.domain(data.map(d=>d.target));
    y.domain([0, yMaxTarget]);


    // let color = d3.scaleOrdinal().range(["lightgray", "salmon"]);

    let xAxis = d3.axisBottom().scale(x);

    let yAxis = d3.axisLeft().scale(y);

    let svg = d3.select(barchart1Div).append("svg")
            .attr("width", bar1svgwidth)
            .attr("height", bar1svgheight)
            .append("g")
            .attr("transform", "translate(" + bar1margin.left + "," + bar1margin.top + ")");

    var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
        .html(function(d) {
            var content = "<span style='margin-left: 1px;'><b>" + d.target + "</b></span><br>";
            content +=`
                    <table style="margin-top: 1px;">
                            <tr><td>Number of attacks with this target: </td><td style="text-align: right">` + d.targetnum + `</td></tr>
                    </table>
                    `;
            return content;
        });
    svg.call(tip);


    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + bar1height + ")")
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
            .style("fill", "brown")
            .attr("x", function(d) { return x(d.target); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.targetnum); })
            .attr("height", function(d) { return bar1height - y(d.targetnum); })
            
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

            console.log(d.target)
           });

    
});
