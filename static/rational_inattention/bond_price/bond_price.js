import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './asset_slider.js';

class BondPrice extends PolymerElement {

    static get properties() {
        return {
            r: {
                type: Number,
                computed: '_getRandomRange(precision)',
            },
            mLow: {
                type: Number,
                computed: '_getMLow(m, precision)',
                observer: '_getLowValue',
            },
            mHigh: {
                type: Number,
                computed: '_getMHigh(m, precision)',
                observer: '_getHighValue',
            },
            highValue: {
                type: Number,
                computed: '_getHighValue(defaultProb, mHigh)',
            },
            lowValue: {
                type: Number,
                computed: '_getLowValue(defaultProb, mLow)',
            },
            buyPrice: {
                type: Number,
                notify: true,
                value: 0,
                reflectToAttribute: true,
            },
            sellPrice: {
                type: Number,
                notify: true,
                value: 100,
                reflectToAttribute: true,
            },
            disableSelect: {
                type: Boolean,
                value: false,
            },
            scale: {
                type: Number,
                value: 100,
            }
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
            .values {
                text-align: center;
            }
            .low-val {
                color: #2F3238;
                font-weight: bold;
            }
            .high-val {
                color: #007bff;
                font-weight: bold;
            }
        </style>
        <div>
            <h3>Your private information about m: [[ mLow ]] < m < [[ mHigh ]]</h3>
            <p>Select the price for which you'd like to <span class="low-val">buy</span> the bond and the price for which you'd like to <span class="high-val">sell</span> the bond.</p>
            <p>Assuming you don't care about uncertainty, you would expect:</p>
            <p class="values">Lowest expected bond value: <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> * 100 + <span class="def">[[ defaultProb ]]%</span>
            * [[ mLow ]] = <span class="low-val">[[ lowValue ]]</span></p>
            <p class="values">Highest expected bond value: <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> * 100 + <span class="def">[[ defaultProb ]]%</span>
            * [[ mHigh ]] = <span class="high-val">[[ highValue ]]</span></p>
            <asset-slider
                m="[[ m ]]"
                precision="[[ precision ]]"
                high-value="[[ highValue ]]"
                low-value="[[ lowValue ]]"
                buy-price="{{ buyPrice }}"
                sell-price="{{ sellPrice }}"
                is-submitted="{{ submitPrices }}"
                disable-select="[[ disableSelect ]]"
                q="[[ q ]]"
            ></asset-slider>
        </div>
        `;
    }

    _getRandomRange() {
        return Math.random();
    }

    _getMLowOverflow(m, precision) {
        let mLow = m - (precision * this.r);
        if (mLow < 0) {
            let overflow = 0 - mLow;
            return overflow;
        }
        return 0;
    }

    _getMHighOverflow(m, precision) {
        let mHigh = m + (precision * (1 - this.r));
        if (mHigh > this.scale) {
            let overflow = mHigh - this.scale;
            return overflow;
        }
        return 0;
    }

    _getMHigh(m, precision) {
        let mHigh = Math.min(this.scale, m + (precision * (1 - this.r)) + this._getMLowOverflow(m, precision));
        return parseFloat(mHigh.toFixed(2));
    }

    _getMLow(m, precision) {
        let mLow = Math.max(0, m - (precision * this.r) - this._getMHighOverflow(m, precision));
        return parseFloat(mLow.toFixed(2));
    }

    _getHighValue(defaultProb, mHigh) {
        return parseFloat((this._getNondefault(defaultProb) + defaultProb * mHigh / this.scale).toFixed(2));

    }

    _getLowValue(defaultProb, mLow) {
        return parseFloat((this._getNondefault(defaultProb) + defaultProb * mLow / this.scale).toFixed(2));
    }

    _getNondefault(def) {
        return parseInt(this.scale - def);
    }
}

window.customElements.define('bond-price', BondPrice);
