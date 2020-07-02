import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './precision_selector.js';

class InfoPrecision extends PolymerElement {
   
    static get properties() {
        return {
            precision: {
                type: Object,
                value: 1,
                notify: true,
                reflectToAttribute: true,
            },
            cost: {
                type: Number,
                value: 0,
            },
        }
    }

    static get template() {
        return html`
        <style>
        :host {
            display: flex;
            flex-direction: column;
        }
        </style>
         <div>
            <h3>Select the precision of your private information about m (slide and submit).</h3>
            <precision-selector
                precision="{{ precision }}"
                cost="{{ cost }}"
            ></precision-selector>
         </div>
        `;
    }

}

window.customElements.define('info-precision', InfoPrecision);