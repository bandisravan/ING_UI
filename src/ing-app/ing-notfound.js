import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
/**
 * @customElement
 * @polymer
 */
class IngNotFoundApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div class="card">
      Page Not Found.
      </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'ing-app'
      },
      page:{
        type: String,
        reflectToAttribute:true,
        observer:'_pageChanged'
      }
    };
  }
  
}

window.customElements.define('ing-notfound', IngNotFoundApp);
