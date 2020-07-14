import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class Results extends PolymerElement {
    static get properties() {
        return {
            defaultProb: {
                type: Number,
            },
            isDefault: {
                type: String,
                computed: '_getActualDefault(y, defaultProb)',
            },
            buyPrice: {
                type: Number,
            },
            sellPrice: {
                type: Number,
            },
            isBuy: {
                type: String,
                computed: '_getBuy(q, buyPrice)'
            },
            isSold: {
                type: String,
                computed: '_getSell(q, sellPrice)'

            },
            y: {
                type: String,
            },
            m: {
                type: String,
            }
        }
    }
    static get template() {
        return html`
            <h2>Results:</h2>
            <h4>Default? [[ isDefault ]]<br/>
            Actual m = [[ _getPercent(m) ]]</br>
            Expected Asset value: [[ _expectedAssetVal(m) ]]</br>
            Asset price: #p</h4>
            <div>
                Your selling price: A. Did you sell? (Yes if #q > A). You [[ isBuy ]]<br/>
                Your buying price: B. Did you buy? (Yes if #q <= B) You [[ isSold ]]<br/>
                Actual asset payment: 100 or # * 100<br/>
                Your private info cost:<br/>
                Your payoff: 100 - cost<br/>
                Your total wealth: <br/>
            </div>

        `;
    }

    _getNondefault(def) {
        return 100 - def;
    }


    _getActualDefault(y, defaultProb) {
        if (y < defaultProb)
            return 'Yes';
        else
            return 'No';
    }

    _getBuy(q, buyPrice) {
        console.log('buyPrice', buyPrice);
        if (q < buyPrice)
            return 'sold!';
        else
            return 'didn\'t sell.';
    }

    _getSell(q, sellPrice) {
        console.log('sellPrice', sellPrice);
        if (q > sellPrice)
            return 'bought!';
        else
            return 'didn\'t buy.';
    }

    _expectedAssetVal(m) {
        return +((this._getNondefault(this.defaultProb) + this.defaultProb * this._getPercent(m)).toFixed(2));
    }

    _getPercent(val) {
        return (val / 100).toFixed(2);
    }
}

window.customElements.define('results-page', Results);
