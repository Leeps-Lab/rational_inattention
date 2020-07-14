import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class Results extends PolymerElement {
    static get properties() {
        return {
            defaultProb: {
                type: Number,
            },
            defaultResult: {
                type: String,
                computed: '_getDefaultResult(y, defaultProb)',
            },
            buyPrice: {
                type: Number,
                value: 0,
            },
            sellPrice: {
                type: Number,
                value: 100,
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
                type: Number,
            },
            m: {
                type: Number,
            }
        }
    }
    static get template() {
        return html`
            <h2>Results:</h2>
            <h4>You [[ isBuy ]]</h4>
            <div>Your buying price: [[ buyPrice ]]</div>
            <h4>You [[ isSold ]]</h4>
            <div>Your selling price: [[ sellPrice ]]</div>
            <h4>Asset price: [[ q ]]<br/>
            Default? [[ defaultResult ]]<br/>
            Actual m: [[ _getPercent(m) ]]</br>
            Expected Asset value: [[ _expectedAssetVal(m) ]]</br>
            </h4>
            <div>
                Actual asset payment: [[ _getAssetPayment(defaultResult) ]]<br/>
                Your private info cost: [[ cost ]]<br/>
                Your payoff: [[ _getPayoff(cost) ]]<br/>
                Your total wealth: <br/>
            </div>

        `;
    }

    _getNondefault(def) {
        return 100 - def;
    }


    _getDefaultResult(y, defaultProb) {
        if (y < defaultProb)
            return 'Yes';
        else
            return 'No';
    }

    _getBuy(q, buyPrice) {
        if (q < buyPrice)
            return 'bought!';
        else
        {
            return 'didn\'t buy.';
        }
    }

    _getSell(q, sellPrice) {
        if (q > sellPrice)
            return 'sold!';
        else
            return 'didn\'t sell.';
    }

    _expectedAssetVal(m) {
        return +((this._getNondefault(this.defaultProb) + this.defaultProb * this._getPercent(m)).toFixed(2));
    }

    _getAssetPayment(defaultResult) {
        if (defaultResult === 'Yes')
            return this.m;
        else
            return 100;
    }

    _getPercent(val) {
        return (val / 100).toFixed(2);
    }

    _getPayoff(cost) {
        return 100 - cost;
    }

    _getTotal() {
        this._getAssetPayment(this.defaultResult) - this.buyPrice;
    }
}

window.customElements.define('results-page', Results);
