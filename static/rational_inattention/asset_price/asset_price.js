import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './asset_slider.js';

class AssetPrice extends PolymerElement {

    static get properties() {
        return {
            // TODO: get input from Python side, set non-neg constraints
            m: {
                type: Number,
                value: 0.5,
            },
            mLow: {
                type: Number,
                computed: '_getMLow(m, precision)'
            },
            mHigh: {
                type: Number,
                computed: '_getMHigh(m, precision)'
            },
            precision: {
                type: Number,
            },
            highValue: {
                type: Number,
                computed: '_getHighValue(m, defaultProb, precision)',
            },
            lowValue: {
                type: Number,
                computed: '_getLowValue(m, defaultProb, precision)',
            },
            defaultProb: {
                type: Number,
            },
        }
    }

    static get template() {
        return html`
        <style>
            .def {
                color: #DF5353;
            }
            .non-def {
                color: #55BF3B;
            }
        </style>
        <div>
            <h3>Your private information about m: [[ _getMLow(m, precision) ]] < m < [[ _getMHigh(m, precision) ]]</h3>
            <p>Select the price for which you'd like to buy the asset and the price for which you'd like to sell the asset.</p>
            <p>Assuming you don't care about uncertainty, you would expect:</p>
            <p>VL = <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> * 100 + <span class="def">[[ defaultProb ]]%</span>
            * [[ _getMLow(m, precision) ]] * 100 = [[ lowValue ]]</p>
            <p>VH = <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> * 100 + <span class="def">[[ defaultProb ]]%</span>
            * [[ _getMHigh(m, precision) ]] *  100 = [[ highValue ]]</p>
            <asset-slider
                m="[[ m ]]"
                precision="[[ precision ]]"
                high-value="{{ highValue }}"
                low-value="{{ lowValue }}"
            ></asset-slider>
        </div>
        `;
    }

    _getMHigh(m, precision) {
        return +((m + (precision / 2)).toFixed(2));
    }

    _getMLow(m, precision) {
        return +((m - (precision / 2)).toFixed(2));
    }

    _getHighValue(m, defaultProb, precision) {
        return +((this._getNondefault(defaultProb) + defaultProb * this._getMHigh(m, precision)).toFixed(2));

    }

    _getLowValue(m, defaultProb, precision) {
        return +((this._getNondefault(defaultProb) + defaultProb * this._getMLow(m, precision)).toFixed(2));
    }

    _getNondefault(def) {
        return 100 - def;
    }


}

window.customElements.define('asset-price', AssetPrice);
