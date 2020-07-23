import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './shared/buysell_slider.js';

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
            bondPayment: {
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
                #results {
                    text-align: center;
                }
                #buy-sell {
                    opacity: 0;
                    animation: 3s ease 4s normal forwards 1 fadein;
                }
                @keyframes fadein{
                    0% { opacity:0; }
                    66% { opacity:0; }
                    100% { opacity:1; }
                }
                #substep {
                    opacity: 0;
                }
                .row {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                }
                .def {
                    color: #DF5353;
                }
                .non-def {
                    color: #55BF3B;
                }
                .sell-val {
                    color: #007bff;
                    font-weight: bold;
                }
                .buy-val {
                    color: #2F3238;
                    font-weight: bold;
                }
                .price-val {
                    color: orange;
                    font-weight: bold;
                }    
                .slider {
                    --price-color: orange;   
                }    
            </style>
            <div id="results">
                <h2>Results</h2>
                <buysell-slider
                    class="slider"
                    low-value="[[ lowValue ]]"
                    high-value="[[ highValue ]]"
                    buy-price="[[ buyPrice ]]"
                    sell-price="[[ sellPrice ]]"
                    price-to-show="[[ q ]]"
                    disable-select="[[ disableSelect ]]"
                    animate-price="[[ animatePrice ]]"
                ></buysell-slider>
                <div id="buy-sell">
                    <div class="row">
                        <div>
                            <p>Your bid: <span class="buy-val">[[ buyPrice ]]</span></p>
                        </div>
                        <div>
                            <p>Your ask: <span class="sell-val">[[ sellPrice ]]</span></p>
                        </div>
                    </div>
                    <h3>Bond price: <span class="price-val">[[ q ]]</span></h3>
                    <h4>You [[ isBought ]] and [[ isSold ]].</h4>
                </div>
                <div id="substep" $hidden="[[ _hideResults(hideBeforeSubmit) ]]">
                    <h3>Default? [[ defaultResult ]]</h3>
                        <h4>Actual bond payment: [[ _getAssetPayment(y, g, m) ]]<br/>
                        Your private info cost: [[ cost ]]</h4>
                    <h3>Your payoff: {{ payoff }}</h3>
                </div>
            </div>
        `;
    }

    _hideResults(hideBeforeSubmit) {
        if(!hideBeforeSubmit) {
            this.$.substep.animate([
                { opacity: 0 },
                { opacity: 1 },
            ], {
                duration: 1000, //milliseconds
                easing: 'ease-in',
                fill: 'forwards',
                // delay: 1000, // wait until show price animation finish
            });
        }
        return hideBeforeSubmit;
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
            return 'bought';
        else {
            return 'didn\'t buy';
        }
    }

    _getSell(q, sellPrice) {
        if (q > sellPrice)
            return 'sold';
        else
            return 'didn\'t sell';
    }

    _getAssetPayment(y, g, m) {
        return (y < g) ? m : 100; // 0 if match
    }

    _getPayoff(buyPrice, sellPrice, cost) {
        let val = this.bondPayment - cost;
        if(!this.isBought.localeCompare('bought'))
            val = 2 * this.bondPayment - cost;
        else if (!this.isSold.localeCompare('sold'))
            val = this.bondPayment - this.cost;
        return val.toFixed(2);
    }
}

window.customElements.define('results-page', Results);
