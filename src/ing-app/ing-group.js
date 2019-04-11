import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class IngGroupApp extends PolymerElement {
    constructor(){
        super();
        this.openedFlag = false;
    }
    ready(){
        super.ready();
        this.groupList = [
                        {
                        "groupId": 1000,
                        "groupName": "Sparen",
                        "products": 3
                        },
                        {
                        "groupId": 1000,
                        "groupName": "Betalen",
                        "products": 4
                        }
                    ];
        
    }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        app-header{
          background:#ccc;
        }
        app-header a{
          text-decoration:none;
          padding:10px;
        }
        .card{
            width:700px;
            margin:0 auto;
            padding:20px;
        }
      </style>
      <iron-ajax id="groupAjax" url="_getConfig('groups')" handle-as="json" method="GET" on-response="_handleGroupResponse"></iron-ajax>
      <iron-ajax id="productListAjax" url="_getConfig('products')" method="POST" handle-as="json" on-response="_handleProductsResponse"></iron-ajax>
  <div class="card">
      <vaadin-accordion>
      <template is="dom-repeat" items="[[groupList]]">
  <vaadin-accordion-panel opened$="false">
    <div slot="summary" id="[[item.groupId]]" on-click="_getProducts">[[item.groupName]] | [[item.products]]</div>
    
    <div>
    <template is="dom-repeat" items="[[productList]]" as="products">
    <paper-item>[[products.productName]]</paper-item>

    </template>
    </div>
  </vaadin-accordion-panel>
  </template>
</vaadin-accordion>
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
      groupList:{
          type: Object
      },
      openedFlag:{
          type:Boolean,
          value:false
      },
      productList:{
          type:Object
      }
    };
  }
  _getConfig(path){
      return config.baseURL+'/'+path;
  }
  _handleGroupResponse(e){
      let resp = e.detail.response;
      this.groupList = resp;
  }
  _getProducts(e){
      debugger;
      
      let resp = e.detail.response;
      let groupId = e.target.getAttribute('id');
      /*let data = {
            "groupId": groupId
      }
      this.$.productListAjax.body = JSON.stringify(data);
      this.$.productListAjax.contentType = 'application/json';
      this.$.productListAjax.generateRequest();*/
      this.productList=[
    {
      "productId": 1000,
      "productName": "String"
    },
    {
      "productId": 1000,
      "productName": "String"
    }];

  }

  _handleProductsResponse(e){

  }
}

window.customElements.define('ing-group', IngGroupApp);