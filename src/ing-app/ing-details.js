import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';

/**
 * @customElement
 * @polymer
 */
class IngDetailsApp extends PolymerElement {
    constructor() {
        super();
        this.productDetails = {

        };
    }
    ready() {
        super.ready();
        console.log(this.routeData);
        //this.getSelectedProductDetails(this.productDetails.productGroup.productDetails);
    }
    connectedCallback(){
        super.connectedCallback();
       
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
            border:1px #ccc solid;
        }
        .detailsHeading{
            color:#ff6200;
        }
        .back{
            color:#000;
            font-size:18px;
        }
        .groupHeading{
            font-size:20px;
        }
        .otherItems, .otherItems a{
            color:#031959;
            font-size:20px;
            text-decoration:none;


        }
        .otherHeading{
            color:#ff6200;
        }
        p{
            font-size:20px;
        }
      </style>
      <iron-ajax id="productDetailsAjax" url="[[configUrl]]productDetails"  method="POST" handle-as="json" on-response="_handleProductDetailsResponse"></iron-ajax>
      <div id="getGroup" groupId="[[routeData.groupId]]"></div>
      <app-route
          route="{{route}}"
          pattern="/:groupId/:productId"
          data="{{routeData}}">
      </app-route>
      [[_getDetailAjax(routeData.groupId,routeData.productId)]]
  <div class="card">  
  <a href="#/home" class="back">Overzicht</a>   
<h2 class="detailsHeading">Product Details</h2>
<hr />
<h3 class="groupHeading">Product Group: [[productGroup.groupName]]</h3>
    <h2 class="groupHeading"> Product Name: [[selectedProducts.productName]]</h2>
    <p>Percntage: [[selectedProducts.precentage]]</p>
    <p>special: [[selectedProducts.special]]</p>
    <p>investmentType: [[selectedProducts.investmentType]]</p>
    <p>Min Limit: [[selectedProducts.minLimit]]</p>
    <p>Max Limit: [[selectedProducts.maxLimit]]</p>
    <p>Duration: [[selectedProducts.duration]]</p>
    <hr />
<div style="border:1px #ccc solid; padding:10px;">
<h2 class="detailsHeading">Other Group Products</h2>
<template is="dom-repeat" items="[[otherProducts]]" as="prod">
    <p><a class="otherItems" href="#/details/[[routeData.groupId]]/[[prod.productId]]" title="[[prod.productName]]">[[prod.productName]]</a> </p>  
</template>
</div>
<h3></h3>

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
            productList: {
                type: Object,
                value: {}
            },
            productGroup:{
                type:Object,
                value:{}
            },
            routeData: Object,
            selectedProducts:{
                type:Object
            },
            otherProducts:{
                type:Array
            },
      configUrl:{
          type:String,
          value: config.baseURL
      }
        };
    }
    _getConfig(path) {
        return config.baseURL + '/' + path;
    }
    _getDetailAjax(groupId,productId){
         var ajaxEle = this.$.productDetailsAjax;
        let data = {
                    "groupId": groupId,
                    "productId": productId
                    };
        ajaxEle.body = JSON.stringify(data);
        ajaxEle.contentType = "application/json";
        ajaxEle.generateRequest();
    }
    _handleProductDetailsResponse(e) {
        let resp = e.detail.response;
        //this.groupList = resp;
        var arr = resp.productGroup.productDetails;
        
        this.set('productGroup',resp.productGroup);
        var selectedArr = resp.selected;
        //this.productDetails = arr;
        //this.selectedProducts = selectedArr;
        this.set('selectedProducts',selectedArr);

       /* var selectedProducts = arr.filter(function (val) {
            return val.productId == this.routeData.productId;
        });*/
        this.selectedProducts = selectedArr;
        var otherProducts = arr.filter(function (val) {
            return val.productId != this.routeData.productId;
        }.bind(this));
        this.otherProducts = otherProducts;
    }
}

window.customElements.define('ing-details', IngDetailsApp);
