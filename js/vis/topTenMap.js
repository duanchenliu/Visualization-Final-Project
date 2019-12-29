function topTenAttacks(){
    Promise.all([
        d3.csv("data/final/topTenAttacks.csv"),
        d3.json("data/final/world-110m.json"),
    ]).then((data)=>{
        // let toptenmargin = {top: 40, right: 10, bottom: 60, left: 60};
        // let toptensvgwidth = 960 - toptenmargin.left - toptenmargin.right,
        //     toptensvgheight = 650 - toptenmargin.top - toptenmargin.bottom;
        
        let topTenData = data[0];
        let worldmap = data[1];
        // console.log(topTenData);

        topTenData.sort(function (a, b) {
			return b.numberkilled - a.numberkilled;
		});

        let width = 700,
        height = 700;

        let svg = d3.select("#top_ten_map").append("svg")
        // .attr("width", toptensvgwidth + toptenmargin.left + toptenmargin.right)
        // .attr("height", toptensvgheight + toptenmargin.top + margin.bottom)
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
         }))
         .append("g")
        




         
        let maxDeath = d3.max(topTenData, d=>d.numberkilled);
        console.log(maxDeath);
        
        let circlesize = d3.scaleLinear()
            .domain([0,maxDeath])
            .range([0, 10])

         // make a color scale
        let colorScale = d3.scaleQuantize();
       // colors designed w/ ColorBrewer
        colorScale
            .domain(d3.extent(topTenData.map(function(d) {
                return d.numberkilled;
            })))
            .range(['#fcae91','#fb6a4a','#cb181d', '#ad070c']);//from light red to dark red
            // .range(['#fceae1','#fee5d9','#fcd9c7','#fcae91','#fca483','#fb6a4a','#fa5e3c','#d92e32','#cb181d','#ad070c']);

        // geoMercator projection:
        let projection = d3.geoMercator()
            .scale(100)
            .translate([width/2, height/2]);

        let path = d3.geoPath()
            .projection(projection);

        let world = topojson.feature(worldmap, worldmap.objects.countries).features;
        // console.log(world);
        
        let country_info_holder = document.getElementById("country-info-holder");
        country_info_holder.style.display = "none";
        
        //draw the map
        svg.selectAll("path")
            .data(world.filter(d=>d.properties.name!='Antarctica'))
            .enter()
            .append("path")
            .attr("class", "map")
            .attr("d", path)
            .attr('stroke', 'white');

        let node = svg.selectAll(".node")
            .data(topTenData)
            .enter()
            .append("circle")
            .attr("title", function(d) {
                return d.country;
              })
            .attr("fill", function(d) {
                return colorScale(d.numberkilled);
            })
            // .attr("class", "node")
            .attr("r", function(d){
                return circlesize(d.numberkilled);
            })
            .attr("stroke", "gold")
            .attr("transform", function(d) {
               return "translate(" + projection([d.longitude, d.latitude]) + ")";
             })
             .on("mouseover", function(d) {
                // show info
                // country_info_holder.show();//wrong
                displayInfo(d);
                d3.select(this)
                .style("cursor", "pointer")
                .attr("fill","blue");
                return;
              })
              .on("mouseout", function(d){
                d3.select(this)
                .attr("fill", function(d) {
                    return colorScale(d.numberkilled);
                });
              });
            //  .on({
            //     "mouseover": function(d) {
            //         console.log("get here")
            //       d3.select(this)
            //         .style("cursor", "pointer")
            //     },
            //     "mouseout": function(d) {
            //       d3.select(this)
            //         .style("cursor", "default")
            //     }
            //   });

            let infobox = d3.select('body')
                    .append('div')
                    // .attr("class","tooltip")
                    .style('position', 'absolute')
                    .style('z-index', '10')
                    .style('color', 'black')
                    .style('visibility', 'hidden')   
                    .style('font-size', '18px')
                    .style('font-weight', 'bold')
                    .text('')

            function displayInfo(d) {
                console.log(d);
                var element = document.getElementById("country-quick-info")
                if (country_info_holder.style.display === "none") {
                    country_info_holder.style.display = "block";
                  } 
                let img = document.getElementById("college-image");
                let name = d.country;
                img.src = "image/"+name+".png";//path to image
                let SuperText = "Country: "+d.country + "</br>" + "</br>" +"Death:  "+d.numberkilled + "</br>" + "</br>"+ "Attack Type: "+ d.attacktype+ "</br>" + "</br>"+ "Target: "+ d.targtype+ "</br>"+ "</br>"+ "Terrorist Group: "+ d.groupname + "</br>"+ "</br>"+ "Weapon: "+ d.weaptype + "</br>" + "</br>"+ "Summary: "+d.summary+"</br>";

                element.innerHTML = '<span style="font-size:10px", style="height:300", style="overflow-y:scroll">'+SuperText+ '</span>';

                
              }

    });


}

topTenAttacks();
