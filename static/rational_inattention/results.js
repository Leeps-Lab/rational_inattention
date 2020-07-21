import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class Results extends PolymerElement {
    static get properties() {
        return {
            defaultResult: {
                type: String,
                computed: '_getDefaultResult(y, g)',
            },
            isBought: {
                type: String,
                computed: '_getBuy(q, buyPrice)',
                value: 'didn\'t buy.',
                notify: true,
                reflectToAttribute: true,
            },
            isSold: {
                type: String,
                computed: '_getSell(q, sellPrice)',
                value: 'didn\'t sell.',
                notify: true,
                reflectToAttribute: true,
            },
            assetPayment: {
                type: Number,
                computed: '_getAssetPayment(y, g, m)',
            },
            payoff: {
                type: Number,
                computed: '_getPayoff(buyPrice, sellPrice, cost)',
                notify: true,
                reflectToAttribute: true,
            },
        }
    }

    static get template() {
        return html`
            <style>
                :host {
                    animation: 5s ease-in 0s normal forwards 1 fadein;
                }
                @keyframes fadein {
                    0% {
                        opacity: 0;
                    }
                    66% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                .row {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }
                .def {
                    color: #DF5353;
                }
                .non-def {
                    color: #55BF3B;
                }
                .sell-val {
                    color: #2F3238;
                    font-weight: bold;
                }
                .buy-val {
                    color: #007bff;
                    font-weight: bold;
                }
                .price-val {
                    color: #F06292;
                    font-weight: bold;
                }    
            </style>
            <h2>Results:</h2>
            <div class="row">
                <div>
                    <h4>You [[ isBought ]]</h4>
                    <p>Your buying price: <span class="buy-val">[[ buyPrice ]]</span></p>
                </div>
                <div>
                    <h4>You [[ isSold ]]</h4>
                    <p>Your selling price: <span class="sell-val">[[ sellPrice ]]</span></p>
                </div>
            </div>
            <div class="row">
                <div>
                    <h4>Asset price: <span class="price-val">[[ q ]]</span><br/>
                    Default? [[ defaultResult ]]<br/>
                    Actual m: [[ _getPercent(m) ]]</br>
                    Expected Asset value:</h4>
                    <p class="values"><span class="non-def">[[ _getNondefault(g) ]]%</span> * 100 + 
                    <span class="def">[[ g ]]%</span>
                    * [[ _getPercent(m) ]] * 100 = <strong>[[ _expectedAssetVal(m) ]]</strong></p>      
                </div>
                <div>
                    <h4>Actual asset payment: [[ _getAssetPayment(y, g, m) ]]<br/>
                    Your private info cost: [[ cost ]]<br/>
                    Your payoff: {{ payoff }}<br/>
                    </h4>
                </div>
            </div>
        `;
    }

    _getNondefault(def) {
        return 100 - def;
    }

    _getDefaultResult(y, g) {
        if (y < g)
            return 'Yes';
        else
            return 'No';
    }

    _getBuy(q, buyPrice) {
        if (q < buyPrice)
            return 'bought!';
        else {
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
        return +((this._getNondefault(this.g) + this.g * this._getPercent(m)).toFixed(2));
    }

    _getAssetPayment(y, g, m) {
        return (y < g) ? m : 100; // 0 if match
    }

    _getPercent(val) {
        return (val / 100).toFixed(2);
    }

    _getPayoff(buyPrice, sellPrice, cost) {
        let val = this.assetPayment - cost;
        if(!this.isBought.localeCompare('bought!'))
            val = 2 * this.assetPayment - cost - buyPrice;
        else if (!this.isSold.localeCompare('sold!'))
            val = this.assetPayment - this.cost;
        return val.toFixed(2);
    }
}

window.customElements.define('results-page', Results);
