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
          .slider1 {
            --paper-range-slider-higher-knob-color: #007bff;
            --paper-range-slider-higher-pin-color: #007bff;
            --paper-range-slider-lower-knob-color: #2F3238;
            --paper-range-slider-lower-pin-color: #2F3238;
            --paper-range-slider-active-color: #F06292;
          }
          .sliderticks {
            display: flex;
            justify-content: space-between;
            max-width: 800px;
        }
        .sliderticks p {
            position: relative;
            display: flex;
            justify-content: center;
            text-align: center;
            width: 1px;
            background: #D3D3D3;
            height: 10px;
            line-height: 40px;
            margin: 0 15px;
        }
        </style>
          <br/>        
          <paper-range-slider
            class="slider1"
            slider-width="800px"
            always-show-pin
            min="0"
            max="100"
            step="0.1"
            value-min="{{ buyPrice::change }}"
            value-max="{{ sellPrice::change }}"
            max-markers="10"
          ></paper-range-slider>
          <div class="sliderticks">
              <p>0</p>
              <p>20</p>
              <p>40</p>
              <p>60</p>
              <p>80</p>
              <p>100</p>
          </div>
        `;
      }
}

window.customElements.define('asset-slider', AssetSlider);
