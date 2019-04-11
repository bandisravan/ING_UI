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
            "productGroup": {
                "groupId": 1,
                "groupName": "Sparen",
                "count": 0,
                "productDetails": [
                    {
                        "productId": 101,
                        "productName": "dd",
                        "productViewCount": 2,
                        "precentage": 2,
                        "special": "df",
                        "investmentType": "dt",
                        "minLimit": 442,
                        "maxLimit": 23,
                        "duration": "5"
                    },
                    {
                        "productId": 102,
                        "productName": "gj",
                        "productViewCount": 2,
                        "precentage": 5,
                        "special": "hgjh",
                        "investmentType": "hgh",
                        "minLimit": 56,
                        "maxLimit": 56,
                        "duration": "5"
                    }
                ]
            }

        };
    }
    ready() {
        super.ready();
        console.log(this.routeData);
        console.log('tests'+this.productDetails.productGroup.productDetails);
        this.getSelectedProductDetails(this.productDetails.productGroup.productDetails);
        console.log(this.productDetails)
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
      <iron-ajax url="_getConfig('productDetails')" handle-as="json" on-response="_handleProductDetailsResponse"></iron-ajax>
      <app-route
          route="{{route}}"
          pattern="/:groupId/:productId"
          data="{{routeData}}">
      </app-route>
  <div class="card">     
<h2>Produktdetails</h2>
<hr />
<h3>[[productDetails.productGroup.groupName]]</h3>
<template is="dom-repeat" items="[[selectedProducts]]" as="products">
    <h2>ProductName: [[products.productName]]</h2>
    <p>Percntage: [[products.precentage]]</p>
    <p>special: [[products.special]]</p>
    <p>investmentType: [[products.investmentType]]</p>
    <p>Min Limit: [[products.minLimit]]</p>
    <p>Max Limit: [[products.maxLimit]]</p>
    <p>Duration: [[products.duration]]</p>
</template>
<div style="border:1px #ccc solid; width:400px;">
<h3>Other group products</h3>
<template is="dom-repeat" items="[[otherProducts]]" as="prod">
    <h2>[[prod.productName]]</h2>
    
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
            routeData: Object,
            selectedProducts:{
                type:Array
            },
            otherProducts:{
                type:Array
            }
        };
    }
    _getConfig(path) {
        return config.baseURL + '/' + path;
    }
    _handleProductDetailsResponse(e) {
        let resp = e.detail.response;
        this.groupList = resp;
    }
    getSelectedProductDetails(arr) {
        var selectedProducts = arr.filter(function (val) {
            return val.productId == "101";
        });
        this.selectedProducts = selectedProducts;
        var otherProducts = arr.filter(function (val) {
            return val.productId != "101";
        });
        this.otherProducts = otherProducts;

    }
}

window.customElements.define('ing-details', IngDetailsApp);
