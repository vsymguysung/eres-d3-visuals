/**
 * @module hStackBarChart
 *
 *
 * File: hStackBarChart.js
 *
 *
 * Author: Guy-Sung Kim.
 *
 * Copyright (c) 2017 eResources
 *
 * Revision History
 *    - v0.1.0 2017.Jun by Guy-Sung Kim, Initial creation.
 */

import * as d3 from "d3";

/*
 * Expected Data Structure:
 *
 *   let dataset = [
 *     {billid: "HB 4643", agree: 67, disagree: -54, index: 121},
 *     {billid: "HB 6066", agree: 87, disagree: -44, index: 131},
 *     {billid: "HB 5851", agree: 164, disagree: -34, index: 198},
 *     {billid: "HB 5400", agree: 58, disagree: -18, index: 76}
 *   ];
 *
 */

export function hStackBarChart() {
  //
  // Internal variables.
  //
  let m_top = 60;
  let m_bottom = 30;
  let m_left = 70;
  let m_right = 30;
  let width = 640;
  let height = 400;
  let axisTransitionDuration = 700;
  let reRenderTransitionDuration = 1000;

  //
  // Generate Chart
  function chart(selection) {
    console.log(`selection:${JSON.stringify(selection)}`);

    selection.each(function(dataset) {
      console.log(`dataset:${JSON.stringify(dataset)}`);

      // Get attrs that are for rendering i.e.  'agree', 'disagree'
      let renderedAttrs = d3.keys(dataset[0]).filter(function(key) {
                    if (key !== "billid" && key !== "index")
                      return true;
                    else
                      return false;
      });

      // Get all attributes.
      let allAttrs = d3.keys(dataset[0]);
      console.log(`allAttrs: ${JSON.stringify(allAttrs)}`);

      // Create the tooltip.
      let tooltip = d3.select("body")
                      .append("div")
                      .style("position", "absolute")
                      .style("color", "white")
                      .style("z-index", "10")
                      .style("visibility", "hidden")
                      .text("a simple tooltip");


      // Dynamic sorting helper.
      function dynamicSort(property) {
          let sortOrder = 1;
          if(property[0] === "-") {
              sortOrder = -1;
              property = property.substr(1);
          }
          return function (a,b) {
              let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
              return result * sortOrder;
          }
      }

      //
      // Sort Data
      dataset.sort(dynamicSort('billid'));

      let billIds = dataset.map( function(d) {
            return d.billid;
      });

      //
      // Data Transform
      let series = d3.stack()
          .keys(renderedAttrs) //.keys(["agree", "disagree"])
          .offset(d3.stackOffsetDiverging)
          (dataset);

      //
      // SVG container
      let svg = selection.append('svg')
                .attr("style", "width:100%; height:100%;")
                .attr("viewBox", "0 0 640 400")
                .attr("preserveAspectRatio", "xMidYMid meet");

      //
      // Scales
      let yScale = d3.scaleBand()
                     .domain(billIds)
                     .rangeRound([m_top, height - m_bottom])
                     .padding(0.4);

      let xScale = d3.scaleLinear()
                     .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
                     .rangeRound([m_left, width - m_right]);

      let zScale = d3.scaleOrdinal(d3.schemeCategory10);
      //let zScale = d3.scaleOrdinal()
      //               .domain(renderedAttrs)
      //               .range(["#d62728", "#2ca02c", "#9467bd"]);



      let default_radio = 0;  // Choose the default selection.

      // Create the shape selectors
      let form = selection.append("form").attr("class", "orderby-radios").text("Order By: ");

      form.selectAll("label")
          .data(allAttrs)
          .enter()
          .append("label")
          .text(function(d) {
            console.log(`d:${JSON.stringify(d)}`);
            return d;
          })
          .insert("input")
          .attr("type", "radio")
          .attr("class", "orderby")
          .attr("name", "orderby")
          .attr("value", function(d, i) {return d;})
          .property("checked", function(d, i) {return i===default_radio;})
          .on("change", orderByChanged);


      //
      // Rendering
      function renderGraph() {
        svg.append("g")
             .attr("class", "container")
           .selectAll("g")
           .data(series)
           .enter().append("g")
             .attr("class", "layer")
             .attr("fill", function(d) { return zScale(d.key); })
           .selectAll("rect")
           .data(function(d) { return d; })
           .enter().append("rect")
             .attr("class", "bar")
             .attr("height", yScale.bandwidth)
             .attr("x", function(d) { return xScale(d[0]); })
             .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]); })
             .attr("y", function(d) { return yScale(d.data.billid); })
             .on("mouseover", function(d){tooltip.text(d[1]-d[0]); return tooltip.style("visibility", "visible");})
             .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
             .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

        svg.selectAll("g.layer").exit().remove();
      }

      function renderXaxis() {
        svg.append("g")
            .attr("class", "x--axis")
            .attr("transform", "translate(0," + m_top + ")")
            .call(d3.axisTop(xScale));
      }

      function renderYaxis() {
        svg.append("g")
            .attr("class", "y--axis")
            .attr("transform", "translate(" + (m_left - 10) + ",0)")
            .call(d3.axisLeft(yScale));
      }


      function render() {
        renderGraph();
        renderXaxis();
        renderYaxis();
      }

      function stackMin(serie) {
        return d3.min(serie, function(d) { return d[0]; });
      }

      function stackMax(serie) {
        return d3.max(serie, function(d) { return d[1]; });
      }

      // Render.
      render();

      function reRenderGraph() {
        svg.selectAll("g.layer")
          .data(series)
            .attr("fill", function(d) {
              console.log("0: d:" + JSON.stringify(d));
              return zScale(d.key);
            })
          .selectAll("rect.bar")
          .data(function(d) {
            console.log("1: d:" + JSON.stringify(d));
            return d;
          })
            .transition()
            .ease(d3.easeExp)
            .duration(axisTransitionDuration)
            .attr("height", yScale.bandwidth)
            .attr("y", function(d) {
              console.log("2: d:" + JSON.stringify(d));
              console.log("2: d.data:" + JSON.stringify(d.data));
              console.log("2: d.data.billid:" + JSON.stringify(d.data.billid));
              return yScale(d.data.billid);
            })
            .attr("x", function(d) { return xScale(d[0]); })
            .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]); });
      }

      function orderByChanged() {
        console.log(`orderByChanged this.value:${this.value}`);
        //if (this.value === "index") orderByIndex();
        //else if (this.value === "agree") orderByAgree();
        //else if (this.value === "disagree") orderByDisagree();

        orderBy(this.value);
      }

      function orderBy( t = 'index' ) {
        console.log(`orderBy ${t} called.`);

        // Data Transfrom
        dataset.sort(dynamicSort(t));

        // Series Update
        series = d3.stack()
          .keys(renderedAttrs) //.keys(["agree", "disagree"])
          .offset(d3.stackOffsetDiverging)
          (dataset);

        // Y Domain Update
        let _billIds = dataset.map( function(d) {
              return d.billid;
        });
        yScale.domain(_billIds);

        // Y Axis Update
        d3.select(".y--axis")
          .transition()
          .ease(d3.easeExp)
          .duration(reRenderTransitionDuration)
          .call(d3.axisLeft(yScale));

        // Re-render Graph
        reRenderGraph();

      }

      //
      // Render Legend
      let legend = svg.selectAll(".legend")
          .data(series.slice(0))
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(-" + (width / 6) +"," + i * 20 + ")"; })
            .style("font", "10px sans-serif");

        legend.append("rect")
            .attr("x", width + 18)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function(d, i){  console.log(JSON.stringify(d.key)); return zScale(d.key)});

        legend.append("text")
            .attr("x", width + 44)
            .attr("y", 9)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .text(function(d, i) {  return d.key; });

    }); // END of selection.each()
  }; // END of chart()


  // Getters & Setters
  // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
  chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
  };

  chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
  };

  return chart;
}

