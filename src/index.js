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
import {hStackBarChart} from './visuals/hStackBarChart'

let h_stackbarchart_dataset = [
  {billid: "HB 4643", agree: 67, disagree: -54, index: 141},
  {billid: "HB 6066", agree: 87, disagree: -44, index: 131},
  {billid: "HB 5851", agree: 164, disagree: -34, index: 198},
  {billid: "HB 5400", agree: 58, disagree: -18, index: 76}
];

//
// Horizontal Stacked Bar Chart
let h_stackbarchart = hStackBarChart().width(640).height(400);

d3.select('#hstackbarchart')
   .datum(h_stackbarchart_dataset) // bind data to the div
   .call(h_stackbarchart); // draw chart in div

