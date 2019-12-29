
// let bardata = [{year:"2014", dead_missing:0, survive:0},{year:"2015", dead_missing:0, survive:0},
// {year:"2016", dead_missing:0, survive:0},{year:"2017", dead_missing:0, survive:0},
// {year:"2018", dead_missing:0, survive:0},{year:"2019", dead_missing:0, survive:0}];

// var bar1margin = {top: 30, right: 50, bottom: 30, left: 50},
//         bar1width = 800 - bar1margin.left - bar1margin.right,
//         bar1height = 500 - bar1margin.top - bar1margin.bottom;

var barchart3Div = document.getElementById("bar_chart3");
var bar3svgwidth = barchart3Div.clientWidth+200;
var bar3svgheight = barchart3Div.clientHeight +50;

var bar3margin = {top: 30, right: 110, bottom: 200, left: 60},
bar3width = bar3svgwidth - bar3margin.left - bar3margin.right,
bar3height = bar3svgheight - bar3margin.top - bar3margin.bottom;


d3.csv("data/barcharts.csv", row=>{
    return {
        // ...row,
        group: row.group,
        groupnum: +row.groupnum,
        groupfullname: row.groupfullname

    }
}).then(data=>{
    // console.log(data);
    let yMinTarget = d3.min(data, function(d){ return d.groupnum});
    let yMaxTarget = d3.max(data, function(d){ return d.groupnum});
    // console.log(yMinTarget, yMaxTarget);
    let x = d3.scaleBand()
                .rangeRound([0, bar3width])
                .padding(0.35);
                // .align(0.3);
    
    let y = d3.scaleLinear()
        .rangeRound([bar3height, 0]);

    x.domain(data.map(d=>d.group));
    y.domain([0, yMaxTarget]);


    // let color = d3.scaleOrdinal().range(["lightgray", "salmon"]);

    let xAxis = d3.axisBottom().scale(x);

    let yAxis = d3.axisLeft().scale(y);

    let svg = d3.select(barchart3Div).append("svg")
            .attr("width", bar3svgwidth)
            .attr("height", bar3svgheight)
            .append("g")
            .attr("transform", "translate(" + bar3margin.left + "," + bar3margin.top + ")");

    var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
        .html(function(d) {
            var content = "<span style='margin-left: 1px;'><b>" + d.groupfullname + "</b></span><br>";
            content +=`
                    <table style="margin-top: 1px;">
                            <tr><td>Number of attack by group: </td><td style="text-align: right">` + d.groupnum + `</td></tr>
                    </table>
                    `;
            return content;
        });
    svg.call(tip);


    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + bar3height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-1.5em")
            .attr("dy", "-0.01em")
            // .style("font-size", "10px")
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
            .style("fill", "salmon")
            .attr("x", function(d) { return x(d.group); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.groupnum); })
            .attr("height", function(d) { return bar3height - y(d.groupnum); })
            
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
            
            displaypic(d);
        });
    
    let imagebox = d3.select('img')
    .style('visibility', 'hidden')  


    function displaypic(d){
        console.log(d);

        let groupimg = document.getElementById("group-image");
        if (groupimg.style.visibility === "hidden") {
            groupimg.style.visibility = "visible";
          } 
        let groupname = d.group;
        groupimg.src = "image/terroristgroups/"+groupname+".jpg";//path to image

    }
    
});
