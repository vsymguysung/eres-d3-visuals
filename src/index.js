/**
 * @module vsnxt-d3-visuals
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

import { select, selectAll, event } from "d3-selection";
import { format } from "d3-format";
import { min, max, extent, sum } from "d3-array";
import { hStackBarChart } from './visuals/hStackBarChart';
import { donutChart } from './visuals/donutChart';
import avatarTemplate from './templates/avatar.hbs';
import './scss/main.scss';

let legislators = [
  { id: 4, name: 'Garry Glen'},
  { id: 2, name: 'Debbie Stabenow'},
  { id: 3, name: 'Rebekah Warren'},
  { id: 1, name: 'Gary Peters'},
  { id: 5, name: 'Mark Warner'},
  { id: 6, name: 'Tim Kaine'}
];

let h_stackbarchart_dataset = [
  {index: 121, billid: 'HB 4643', agree: 67, disagree: 54},
  {index: 131, billid: 'HB 6066', agree: 87, disagree: 44},
  {index: 198, billid: 'HB 5851', agree: 164, disagree: 34},
  {index: 76, billid: 'HB 5400', agree: 58, disagree: 18},
  {index: 106, billid: 'HB 5700', agree: 88, disagree: 18},
  {index: 196, billid: 'HB 8200', agree: 75, disagree: 108},
  {index: 86, billid: 'HB 9200', agree: 63, disagree: 23},
  {index: 216, billid: 'HB 3400', agree: 128, disagree: 88}
];

let dataset = {
  name: 'Gary Glenn',
  title: 'Michigan House of Representatives',
  avatarUrl: 'https://usavotes.org/states/Michigan/images/pictures/2015-2016b/House/Glenn,Gary.jpg',
  email: 'gary@gmail.com',
  h_stackbarchart_dataset: h_stackbarchart_dataset
};

let _agreeSum = sum(dataset.h_stackbarchart_dataset, function(d) { return d.agree; });
let _disagreeSum = sum(dataset.h_stackbarchart_dataset, function(d) { return d.disagree; });
console.log(`_agreeSum: ${_agreeSum} _disagreeSum: ${_disagreeSum}`);
let _totalSum = _agreeSum + _disagreeSum;

let donut_dataset =
[
  {
    'Type': 'Agree',
    'Vote Number': _agreeSum
  },
  {
    'Type': 'Disagree',
    'Vote Number': _disagreeSum
  }
];

//
// Horizontal Stacked Bar Chart
//
let h_stackbarchart = hStackBarChart().width(640).height(400);

select('#hstackbarchart')
   .datum(dataset.h_stackbarchart_dataset) // bind data to the div
   .call(h_stackbarchart); // draw chart in div

h_stackbarchart.on('was_clicked', function(idx) {
  console.log(`Custom "was_clicked" event received idx: ${idx} billid: ${JSON.stringify(dataset.h_stackbarchart_dataset[idx].billid)}`);
  //console.log(`Custom event received this: ${JSON.stringify(this)}`);
});

h_stackbarchart.on('was_dblclicked', function(idx) {
  console.log(`Custom "was_dblclicked" event received idx: ${idx} billid: ${JSON.stringify(dataset.h_stackbarchart_dataset[idx].billid)}`);
  //console.log(`Custom event received this: ${JSON.stringify(this)}`);
});

//
// Donut Chart
//
let donut = donutChart()
                .width(920)
                .height(600)
                .cornerRadius(3) // sets how rounded the corners are on each slice
                .padAngle(0.015) // effectively dictates the gap between slices
                .variable('Vote Number')
                .category('Type')
                .percentFormat(format(',d'));

select('#donutchart')
            .datum(donut_dataset) // bind data to the div
            .call(donut); // draw chart in div


//
// Update avatar section DOM
//
let { title, name, avatarUrl, email } = dataset;
//console.log(`destructuring title: ${JSON.stringify(title)}`);
//console.log(`destructuring obj: ${JSON.stringify({ title, name, avatarUrl, email })}`);

let tmplOutput = avatarTemplate({ title, name, avatarUrl, email });
$('#avatar').html(tmplOutput);


//
// Build the select list
//
select('#legislators')
  .selectAll('option')
  .data(legislators)
  .enter()
  .append('option')
  .attr('value', function(d) {
    return d.id;
  })
  .text(
    function(d) {
      return d.name;
  });
