//hehe it worked 
function second_linechart(){
    let parseDate = d3.timeParse("%Y");
    let formatTime = d3.timeFormat("%Y");

    d3.csv("data/line_two.csv", row=>{
    return {
    // ...row,
    Year: parseDate(row.Year.toString()),
    Taliban: +row.Taliban,
    ISIL:  +row.ISIL,
    SL: +row.SL,
    AlShabaab: +row.AlShabaab,
    FMLN: +row.FMLN,
    NPA: +row.NPA,
    BokoHaram: +row.BokoHaram,
    IRA: +row.IRA,
    FARC: +row.FARC,
    PKK: +row.PKK
    }
    }).then(data=>{ 
    var height = 400;
    var width =500;

    var maxYear= d3.max(data,(d)=>d.Year)
    var minYear= d3.min(data,(d)=>d.Year)
    var maxDeaths= d3.max(data,(d)=>d.ISIL)

    let div = d3
              .select('#second_line_chart')
              .append('div')
              .attr('class', 'tooltip')
              .style('opacity', 0);

    var y = d3.scaleLinear()
            .domain([0, maxDeaths + 200])
            .range([height,0])


    var x = d3.scaleTime()
            .domain([minYear, maxYear])
            .range([0,width])

    var yAxis =d3.axisLeft(y)
    var xAxis = d3.axisBottom(x)


    var line_svg = d3.select('#second_line_chart').append('svg')
            .attr('height', '600')
            .attr('width', '800')
                    
    var chartgroup = line_svg.append('g')
                       .attr('transform','translate(100,50)')

    var line = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.ISIL))       
            
    var line2 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.Taliban))

    var line3 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.SL)) 
    
    var line4 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.AlShabaab))

    var line5 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.FMLN)) 
    
    var line6 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.NPA))
    
    var line7 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.BokoHaram)) 
    
    var line8 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.IRA))

    var line9 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.FARC)) 
    
    var line10 = d3.line()
            .x(d=>x(d.Year))
            .y(d=>y(d.PKK))
    
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
            .text("Number of Attacks");

    chartgroup.append('path')
            .attr('d',line(data))
            .attr("stroke", "red")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line2(data))
            .attr("stroke", "black")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line3(data))
            .attr("stroke", "green")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line4(data))
            .attr("stroke", "yellow")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line5(data))
            .attr("stroke", "brown")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line6(data))
            .attr("stroke", "grey")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line7(data))
            .attr("stroke", "white")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line8(data))
            .attr("stroke", "pink")
            .attr('stroke-width', '5px')
           
    chartgroup.append('path')
            .attr('d',line9(data))
            .attr("stroke", "purple")
            .attr('stroke-width', '5px')

    chartgroup.append('path')
            .attr('d',line10(data))
            .attr("stroke", "orange")
            .attr('stroke-width', '5px')


    
            // Add the scatterplot
    chartgroup
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.ISIL))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("ISIL was responsible for " + d.ISIL + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px');
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
    .attr('r',  0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.Taliban))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("Taliban was responsible for " + d.Taliban + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.SL))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("SL was responsible for " + d.SL + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.AlShabaab))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("AlShabaab was responsible for " + d.AlShabaab + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.FMLN))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("FMLN was responsible for " + d.FMLN + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.NPA))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("NPA was responsible for " + d.NPA + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.BokoHaram))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("BokoHaram was responsible for " + d.BokoHaram + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.IRA))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("IRA was responsible for " + d.IRA + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.FARC))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("FARC was responsible for " + d.FARC + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
    .attr('fill','red');
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
    .attr('r', 0.01)
    .attr('cx', d => x(d.Year))
    .attr('cy', d => y(d.PKK))
    .attr('stroke-width', '4px')
    .attr('stroke', 'white')
    .style('cursor', 'pointer')
    .on('mouseover', d => {
    div
    .transition()
    .duration(200)
    .style('opacity', 0.9);
    div
    .html("PKK was responsible for " + d.PKK + " deaths in " + formatTime(d.Year))
    .style('left', d3.event.pageX - 100 + 'px')
    .style('top', d3.event.pageY - 60 + 'px')
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

second_linechart();