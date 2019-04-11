import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
/**
 * @customElement
 * @polymer
 */
class IngApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        app-header{
          background:#ff6200;
          color:#fff;
        }
        app-header a{
          text-decoration:none;
          padding:10px;
          color:#fff;
        }
      </style>
      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route
          route="{{route}}"
          pattern="/:page"
          data="{{routeData}}"
          tail="{{subroute}}">
      </app-route>
      <h2>Hello [[prop1]]!</h2>
      <app-header-layout>
  <app-header slot="header" fixed>
    <app-toolbar>
      <div main-title>ING PRODUCT VIEWER APP</div>
      <iron-selector selected="0">
        <a href="/#/home">Home</a>
        <a href="/#/analytics">Analytics</a>
      </iron-selector>
    </app-toolbar>
  </app-header>
  <div>
      <iron-pages selected="[[page]]" attr-for-selected="name">
        <ing-group name="home"></ing-group>
        <ing-details route="{{subRoute}}" name="details"></ing-details>
        <ing-analytics name="analytics"></ing-analytics>
        <ing-notfound name="notFound"></ing-notfound>
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
      page:{
        type: String,
        reflectToAttribute:true,
        observer:'_pageChanged'
      },
      routeData:Object
    };
  }
  static get observers(){
    return ['_routePageChanged(routeData.page)'];
  }
  _routePageChanged(page){
    if(!page){
      this.page = 'home';
    }else if(['home','details','analytics'].indexOf(page)!== -1){
      this.page = page;
    }else{
      this.page = 'notFound';
    }
  }

  _pageChanged(page){
    switch(page){
      case 'home':
        import('./ing-group.js');
        break;
      case 'details':
        import('./ing-details.js');
        break;
      case 'analytics':
        import('./ing-analytics.js');
        break;
      case 'notFound':
        import('./ing-notfound.js');
        break;
    }
  }
}

window.customElements.define('ing-app', IngApp);
