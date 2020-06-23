import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class InfoPrecision extends PolymerElement {
   
    static get properties() {
        
    }

    static get template() {
        return html`
         <div>
            <p>Element for selecting precision of private information</p>
         </div>
        `;
    }

}

window.customElements.define('info-precision', InfoPrecision);