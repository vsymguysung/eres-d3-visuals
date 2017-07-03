/**
 * @module eres-d3-visuals
 *
 *
 * File: index.js
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
import { hStackBarChart } from './visuals/hStackBarChart'
import { donutChart } from './visuals/donutChart'

let h_stackbarchart_dataset = [
  {billid: "HB 4643", agree: 67, disagree: -54, index: 141},
  {billid: "HB 6066", agree: 87, disagree: -44, index: 131},
  {billid: "HB 5851", agree: 164, disagree: -34, index: 198},
  {billid: "HB 5400", agree: 58, disagree: -18, index: 76}
];

//let donut_dataset = [
//  {
//    "Title": "Agree",
//    "Number": 40,
//    "Total Vote": "190"
//  },
//  {
//    "Title": "Disagree",
//    "Number": 100,
//    "Total Vote": "190"
//  }
//]


//let donut_dataset =
//[
//  {
//    "Species": "Halobacillus halophilus",
//    "Probability": 0.02069108308662117,
//    "Error": 0.045296463390387814
//  },
//  {
//    "Species": "Staphylococcus epidermidis",
//    "Probability": 0.10076903848429238,
//    "Error": 0.0096463390387814
//  },
//  {
//    "Species": "Chromobacterium violaceum",
//    "Probability": 0.40318269548054262,
//    "Error": 0.03390387814
//  },
//]

let donut_dataset =
[
  {
    "Vote Type": "Agree",
    "Vote Number": 10000,
  },
  {
    "Vote Type": "Disagree",
    "Vote Number": 7000,
  }
]


//
// Horizontal Stacked Bar Chart
//
let h_stackbarchart = hStackBarChart().width(640).height(400);

d3.select('#hstackbarchart')
   .datum(h_stackbarchart_dataset) // bind data to the div
   .call(h_stackbarchart); // draw chart in div

h_stackbarchart.on('was_clicked', function(idx) {
  console.log(`Custom event received idx: ${idx} billid: ${JSON.stringify(h_stackbarchart_dataset[idx].billid)}`);
  console.log(`Custom event received this: ${JSON.stringify(this)}`);
});

//
// Donut Chart
//
let donut = donutChart()
                .width(640)
                .height(400)
                .cornerRadius(3) // sets how rounded the corners are on each slice
                .padAngle(0.015) // effectively dictates the gap between slices
                .variable('Vote Number')
                .category('Vote Type')
                .percentFormat(d3.format(',d'));

d3.select('#donutchart')
            .datum(donut_dataset) // bind data to the div
            .call(donut); // draw chart in div



