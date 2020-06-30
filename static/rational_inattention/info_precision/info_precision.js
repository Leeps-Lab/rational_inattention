import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './precision_slider.js';

class InfoPrecision extends PolymerElement {
   
    static get properties() {
        return {
        }
    }

    static get template() {
        return html`
         <div>
            <h3>Select the precision of your private information about m.</h3>
            <precision-slider
            ></precision-slider>
         </div>
        `;
    }

}

window.customElements.define('info-precision', InfoPrecision);