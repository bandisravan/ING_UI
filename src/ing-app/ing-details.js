import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-item/paper-item.js';

/**
 * @customElement
 * @polymer
 */
class IngDetailsApp extends PolymerElement {
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
      <iron-ajax auto url="_getConfig('productDetails')" handle-as="json" on-response="_handleProductDetailsResponse"></iron-ajax>
  <div class="card">
      

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
          type: Object,
          value:{
                }
      }
    };
  }
  _getConfig(path){
      return config.baseURL+'/'+path;
  }
  _handleProductDetailsResponse(e){
      let resp = e.detail.response;
      this.groupList = resp;
  }
}

window.customElements.define('ing-details', IngDetailsApp);
