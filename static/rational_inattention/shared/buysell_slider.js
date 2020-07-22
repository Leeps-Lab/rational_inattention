import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import '../polymer-elements/paper-range-slider.js';
// import '../polymer-elements/paper-single-range-slider.js';

class BuysellSlider extends PolymerElement {
    static get properties() {
        return {
            m: {
                type: Number,
            },
            precision: {
                type: Number,
            },
            highValue: {
                type: Number,
            },
            lowValue: {
                type: Number,
            },
            buyPrice: {
                type: Number,
                notify: true,
                reflectToAttribute: true,
            },
            sellPrice: {
                type: Number,
                notify: true,
                reflectToAttribute: true,
            },
            disableSelect: {
                type: Boolean,
                value: false,
            },
            markers: {
                type: Array,
                value: [0, , , , , 100],
            },
        }
    }

    static get template() {
        return `
            <style>
                .slider1 {
                    --paper-range-slider-higher-knob-color: #007bff;
                    --paper-range-slider-higher-pin-color: #007bff;
                    --paper-range-slider-lower-knob-color: #2F3238;
                    --paper-range-slider-lower-pin-color: #2F3238;
                    --paper-range-slider-active-color: #F06292;
                }
            </style>
            <paper-range-slider
                class="slider1"
                slider-width="100%"
                always-show-pin
                min="0"
                max="100"
                step="0.1"
                value-min="{{ buyPrice::change }}"
                value-max="{{ sellPrice::change }}"
                disabled="[[ disableSelect ]]"
            ></paper-range-slider>
        `;
    }
}

window.customElements.define('buysell-slider', BuysellSlider);
