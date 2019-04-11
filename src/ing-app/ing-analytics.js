import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import * as d3 from "d3";

/**
 * @customElement
 * @polymer
 */
class IngAnalyticsApp extends PolymerElement {
    constructor(){
        super();
        this.groupData = [
            {
            "groupId": 1000,
            "groupName": "String",
            "groupViewCount": 123
            },
            {
            "groupId": 1000,
            "groupName": "String",
            "groupViewCount": 123
            }
        ]
    }
    ready(){
        super.ready();
        console.log(this.routeData);
        this.generateBarChart()
    }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .card{
            width:700px;
            margin:0 auto;
            padding:20px;
        }
      </style>
      <iron-ajax url="_getConfig('viewCount')" handle-as="json" on-response="_handleAnalyticsResponse"></iron-ajax>
      
  <div class="card">     
<svg width="600" height="500" id="groupChart"></svg>
  </div>
</app-header-layout>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'ing-app'
      }
    };
  }
  _getConfig(path){
      return config.baseURL+'/'+path;
  }
  _handleAnalyticsResponse(e){
      debugger;
  }
  generateBarChart(){
       var svg = d3.select(this.$.groupChart),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Product Groups Overview")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
//var color = d3.scale.ordinal().range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

   let data =this.groupData;

        xScale.domain(data.map(function(d) { return d.groupName; }));
        yScale.domain([0, d3.max(data, function(d) { return d.groupViewCount; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Product Group");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Stock Price");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.groupName); })
         .attr("y", function(d) { return yScale(d.groupViewCount); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.groupViewCount); });
    
  }
}

window.customElements.define('ing-analytics', IngAnalyticsApp);
