import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import '../polymer-elements/paper-range-slider.js';
// import '../polymer-elements/paper-single-range-slider.js';

class AssetSlider extends PolymerElement {

    static get properties() {
        return {
            m: {
              type: Number,
            },
            precision: {
              type: Number,
            },
            // Value in which the two points overlap
            highValue: {
                type: Number,
            },
            lowValue: {
                type: Number,
            },
            buyPrice: {
              type: Number,
            },
            sellPrice: {
              type: Number,
            },
            disableSelect: {
              type: Boolean,
              value: false,
          },
        }
    }

    static get template() {
        // paper-slider seems to be incompatible with ::input
        return html`
        <style>
        </style>
          <h4>Buying price: [[ buyPrice ]]<br/>Selling price: [[ sellPrice ]]</h4>
          <br/>        
          <paper-range-slider
            slider-width="600px"
            always-show-pin
            min="0"
            max="100"
            value-min="{{ buyPrice::change }}"
            value-max="{{ sellPrice::change }}"
          ></paper-range-slider
          >
        `;
      }
}

window.customElements.define('asset-slider', AssetSlider);
