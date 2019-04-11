import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import * as d3 from "d3";

/**
 * @customElement
 * @polymer
 */
class IngAnalyticsApp extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
        console.log(this.routeData);
    }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .card{
            border:1px #ccc solid;
            width:auto;
            margin:0 auto;
            padding:20px;
        }
        .bar{
            fullbleed:blue;
        }
        paper-tabs{
            --paper-tabs-selection-bar-color: #ff6200;
        }
      </style>
      <iron-ajax auto url="[[configUrl]]viewCount" method="GET" handle-as="json" on-response="_handleAnalyticsResponse"></iron-ajax>
      
  <div class="card">    
         <paper-tabs selected="{{selected}}">
       <paper-tab>Group Analytics</paper-tab>
       <paper-tab>Product Analytics</paper-tab>
      </paper-tabs>
      <iron-pages selected="{{selected}}">
       <div>
             <svg width="600" height="500" id="groupChart"></svg>
       </div>
       <div>
               <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort items="[[productList]]">
    <vaadin-grid-sort-column width="9em" path="productName" header="Product Name"></vaadin-grid-sort-column>
    <vaadin-grid-sort-column width="9em" path="productViewCount" header="View Count"></vaadin-grid-sort-column>
  </vaadin-grid>
       </div>
      </iron-pages>

  </div>
</app-header-layout>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'ing-app'
      },
      configUrl:{
          type:String,
          value: config.baseURL
      },
      productGroupList:{
          type:Array,
          value:[]
      },
      productList:{
          type:Array,
          value:[]
      },
      selected:{
          type:Number,
          value:0
      }

    };
  }
  _getConfig(path){
      return config.baseURL+'/'+path;
  }
  _handleAnalyticsResponse(e){
      let response = e.detail.response;
      let productList = response.productGroupList;
       let groups = productList.map(group => ({ 'groupViewCount': group.groupViewCount, 'groupName': group.groupName }));
      this.productGroupList = groups;
      this.productList = response.productList;
      this.generateBarChart();
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
        var color = d3.scaleLinear().range(["#df1e0e", "#ff6200", "#db4437", "#4285f4", "#6e1a07"]);
    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

   let data =this.productGroupList;

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
             return d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Count");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("x", function(d) { return xScale(d.groupName); })
         .attr("y", function(d) { return yScale(d.groupViewCount); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.groupViewCount); })     
         .attr("fill", function(d,i) { return color(i); });
    
  }
}

window.customElements.define('ing-analytics', IngAnalyticsApp);
