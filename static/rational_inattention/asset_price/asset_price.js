import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './asset_slider.js';

class AssetPrice extends PolymerElement {

    static get properties() {
        return {
            m: {
                type: Number,
            },
            r: {
                type: Number,
                computed: '_getRandomRange(precision)',
            },
            mLow: {
                type: Number,
                computed: '_getMLow(m, precision, r)'
            },
            mHigh: {
                type: Number,
                computed: '_getMHigh(m, precision, r)'
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
            <h3>Your private information about m: [[ mLow ]] < m < [[ mHigh ]]</h3>
            <p>Select the price for which you'd like to buy the asset and the price for which you'd like to sell the asset.</p>
            <p>Assuming you don't care about uncertainty, you would expect:</p>
            <p>VL = <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> * 100 + <span class="def">[[ defaultProb ]]%</span>
            * [[ mLow ]] * 100 = [[ lowValue ]]</p>
            <p>VH = <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> * 100 + <span class="def">[[ defaultProb ]]%</span>
            * [[ mHigh ]] *  100 = [[ highValue ]]</p>
            <asset-slider
                m="[[ m ]]"
                precision="[[ precision ]]"
                high-value="[[ highValue ]]"
                low-value="[[ lowValue ]]"
                buy-price="[[ lowValue ]]"
                sell-price="[[ highValue ]]"
            ></asset-slider>
        </div>
        `;
    }

    _getRandomRange(precision) {
        let r = Math.random();
        // between 0 and precision
        let random = +((r * (precision - 0.01)).toFixed(2));
        return random;
    }

    _getMLowOverflow() {
        let mLow = this.m / 100 - (this.precision - this.r);
        if (mLow < 0) {
            let overflow = 0 - mLow;
            return overflow;
        }
        return 0;
    }
    
    _getMHighOverflow() {
        let mHigh = this.m / 100 + this.r;
        if (mHigh > 1) {
            let overflow = mHigh - 1;
            return overflow;
        }
        return 0;
    }

    _getMHigh(m, precision, r) {
        let mHigh = Math.min(1, m / 100 + this.r + this._getMLowOverflow());
        return +((mHigh).toFixed(2));
    }

    _getMLow(m, precision, r) {
        let mLow = Math.max(0, m / 100 - (precision - this.r) - this._getMHighOverflow());
        return +((mLow).toFixed(2));
    }

    _getHighValue(m, defaultProb, precision) {
        return +((this._getNondefault(defaultProb) + defaultProb * this.mHigh).toFixed(2));

    }

    _getLowValue(m, defaultProb, precision) {
        return +((this._getNondefault(defaultProb) + defaultProb * this.mLow).toFixed(2));
    }

    _getNondefault(def) {
        return 100 - def;
    }


}

window.customElements.define('asset-price', AssetPrice);
