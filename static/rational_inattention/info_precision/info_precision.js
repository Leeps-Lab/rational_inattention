import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './precision_slider.js';

class InfoPrecision extends PolymerElement {
   
    static get properties() {
        
    }

    static get template() {
        return html`
         <div>
            <precision-slider></precision-slider>
         </div>
        `;
    }

}

window.customElements.define('info-precision', InfoPrecision);