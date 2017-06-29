(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("eresD3Visuals", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.eresD3Visuals = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var m_top = 60;
  var m_bottom = 30;
  var m_left = 70;
  var m_right = 30;
  var width = 640;
  var height = 400;
  var axisTransitionDuration = 700;
  var reRenderTransitionDuration = 1000;

  var dataset = [{ billid: "HB 4643", agree: 67, disagree: -54, index: 121 }, { billid: "HB 6066", agree: 87, disagree: -44, index: 131 }, { billid: "HB 5851", agree: 164, disagree: -34, index: 198 }, { billid: "HB 5400", agree: 58, disagree: -18, index: 76 }];

  var itemNames = d3.keys(dataset[0]).filter(function (key) {
    if (key !== "billid" && key !== "index") return true;else return false;
  });

  var tooltip = d3.select("body").append("div").style("position", "absolute").style("color", "white").style("z-index", "10").style("visibility", "hidden").text("a simple tooltip");

  dataset.sort(function (x, y) {
    return d3.ascending(x.index, y.index);
  });

  var billIds = dataset.map(function (d) {
    return d.billid;
  });

  var series = d3.stack().keys(itemNames).offset(d3.stackOffsetDiverging)(dataset);

  var svg = d3.select("svg");
  var margin = { top: m_top, right: m_right, bottom: m_bottom, left: m_left };

  var yScale = d3.scaleBand().domain(billIds).rangeRound([m_top, height - m_bottom]).padding(0.4);

  var xScale = d3.scaleLinear().domain([d3.min(series, stackMin), d3.max(series, stackMax)]).rangeRound([m_left, width - m_right]);

  var zScale = d3.scaleOrdinal(d3.schemeCategory10);

  function renderGraph() {
    svg.append("g").attr("class", "container").selectAll("g").data(series).enter().append("g").attr("class", "layer").attr("fill", function (d) {
      return zScale(d.key);
    }).selectAll("rect").data(function (d) {
      return d;
    }).enter().append("rect").attr("class", "bar").attr("height", yScale.bandwidth).attr("x", function (d) {
      return xScale(d[0]);
    }).attr("width", function (d) {
      return xScale(d[1]) - xScale(d[0]);
    }).attr("y", function (d) {
      return yScale(d.data.billid);
    }).on("mouseover", function (d) {
      tooltip.text(d[1] - d[0]);return tooltip.style("visibility", "visible");
    }).on("mousemove", function () {
      return tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
    }).on("mouseout", function () {
      return tooltip.style("visibility", "hidden");
    });

    svg.selectAll("g.layer").exit().remove();
  }

  function renderXaxis() {
    svg.append("g").attr("class", "x--axis").attr("transform", "translate(0," + m_top + ")").call(d3.axisTop(xScale));
  }

  function renderYaxis() {
    svg.append("g").attr("class", "y--axis").attr("transform", "translate(" + (m_left - 10) + ",0)").call(d3.axisLeft(yScale));
  }

  function render() {
    renderGraph();
    renderXaxis();
    renderYaxis();
  }

  function stackMin(serie) {
    return d3.min(serie, function (d) {
      return d[0];
    });
  }

  function stackMax(serie) {
    return d3.max(serie, function (d) {
      return d[1];
    });
  }

  d3.selectAll("input").on("change", orderByChanged);

  function orderByChanged() {
    if (this.value === "orderbyindex") orderByIndex();else if (this.value === "orderbyagree") orderByAgree();else if (this.value === "orderbydisagree") orderByDisagree();
  }

  function reRenderGraph() {
    svg.selectAll("g.layer").data(series).attr("fill", function (d) {
      console.log("0: d:" + JSON.stringify(d));
      return zScale(d.key);
    }).selectAll("rect.bar").data(function (d) {
      console.log("1: d:" + JSON.stringify(d));
      return d;
    }).transition().ease(d3.easeExp).duration(axisTransitionDuration).attr("height", yScale.bandwidth).attr("y", function (d) {
      console.log("2: d:" + JSON.stringify(d));
      console.log("2: d.data:" + JSON.stringify(d.data));
      console.log("2: d.data.billid:" + JSON.stringify(d.data.billid));
      return yScale(d.data.billid);
    }).attr("x", function (d) {
      return xScale(d[0]);
    }).attr("width", function (d) {
      return xScale(d[1]) - xScale(d[0]);
    });
  }

  function orderByIndex() {
    console.log("orderByIndex called.");

    dataset.sort(function (x, y) {
      return d3.ascending(x.index, y.index);
    });

    series = d3.stack().keys(itemNames).offset(d3.stackOffsetDiverging)(dataset);

    var _billIds = dataset.map(function (d) {
      return d.billid;
    });
    yScale.domain(_billIds);

    d3.select(".y--axis").transition().ease(d3.easeExp).duration(reRenderTransitionDuration).call(d3.axisLeft(yScale));

    reRenderGraph();
  }

  function orderByAgree() {
    console.log("orderByAgree called.");

    dataset.sort(function (x, y) {
      return d3.descending(x.agree, y.agree);
    });

    series = d3.stack().keys(itemNames).offset(d3.stackOffsetDiverging)(dataset);

    var _billIds = dataset.map(function (d) {
      return d.billid;
    });
    yScale.domain(_billIds);

    d3.select(".y--axis").transition().ease(d3.easeExp).duration(reRenderTransitionDuration).call(d3.axisLeft(yScale));

    reRenderGraph();
  }

  function orderByDisagree() {
    console.log("orderByDisagree called.");

    dataset.sort(function (x, y) {
      return d3.descending(x.disagree, y.disagree);
    });

    series = d3.stack().keys(itemNames).offset(d3.stackOffsetDiverging)(dataset);

    var _billIds = dataset.map(function (d) {
      return d.billid;
    });
    yScale.domain(_billIds);

    d3.select(".y--axis").transition().ease(d3.easeExp).duration(reRenderTransitionDuration).call(d3.axisLeft(yScale));

    reRenderGraph();
  }

  var legend = svg.selectAll(".legend").data(series.slice(0)).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
    return "translate(-" + width / 6 + "," + i * 20 + ")";
  }).style("font", "10px sans-serif");

  legend.append("rect").attr("x", width + 18).attr("width", 18).attr("height", 18).attr("fill", function (d, i) {
    console.log(JSON.stringify(d.key));return zScale(d.key);
  });

  legend.append("text").attr("x", width + 44).attr("y", 9).attr("dy", ".35em").attr("text-anchor", "start").text(function (d, i) {
    return d.key;
  });

  var hStackBarChart = {
    render: render
  };

  hStackBarChart.render();

  var index = function index() {
    _classCallCheck(this, index);
  };

  module.exports = index;
});