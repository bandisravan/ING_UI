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
            // "productGroup": {
            //     "groupId": 1,
            //     "groupName": "Sparen",
            //     "count": 0,
            //     "productDetails": [
            //         {
            //             "productId": 101,
            //             "productName": "dd",
            //             "productViewCount": 2,
            //             "precentage": 2,
            //             "special": "df",
            //             "investmentType": "dt",
            //             "minLimit": 442,
            //             "maxLimit": 23,
            //             "duration": "5"
            //         },
            //         {
            //             "productId": 102,
            //             "productName": "gj",
            //             "productViewCount": 2,
            //             "precentage": 5,
            //             "special": "hgjh",
            //             "investmentType": "hgh",
            //             "minLimit": 56,
            //             "maxLimit": 56,
            //             "duration": "5"
            //         }
            //     ]
            // }

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
  <a href="/#/home">Back</a>   
<h2>Produktdetails</h2>
<hr />
<h3>Product Group: [[productGroup.groupName]]</h3>
    <h2> Product Name: [[selectedProducts.productName]]</h2>
    <p>Percntage: [[selectedProducts.precentage]]</p>
    <p>special: [[selectedProducts.special]]</p>
    <p>investmentType: [[selectedProducts.investmentType]]</p>
    <p>Min Limit: [[selectedProducts.minLimit]]</p>
    <p>Max Limit: [[selectedProducts.maxLimit]]</p>
    <p>Duration: [[selectedProducts.duration]]</p>
<div style="border:1px #ccc solid; width:400px;">
<h3>Other group products</h3>
<template is="dom-repeat" items="[[otherProducts]]" as="prod">
    <h2><a href="/#/details/[[routeData.groupId]]/[[prod.productId]]">[[prod.productName]]</h2>   
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
        let resp = e.detail.response;debugger;
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
