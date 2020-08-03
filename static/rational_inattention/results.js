import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './shared/buysell_slider.js';

class Results extends PolymerElement {
    static get properties() {
        return {
            isDefault: {
                type: Boolean,
                computed: '_getDefaultResult(y, g)',
            },
            defaultResult: {
                type: String,
            },
            isBought: {
                type: String,
                computed: '_getBuy(q, buyPrice)',
                notify: true,
                reflectToAttribute: true,
            },
            isSold: {
                type: String,
                computed: '_getSell(q, sellPrice)',
                notify: true,
                reflectToAttribute: true,
            },
            bondPayment: {
                type: Number,
                computed: '_getBondPayment(m)',
            },
            numBonds: {
                type: Number,
                computed: '_getNumBonds(bonds, isBought, isSold)',
                observer: '_isSingleBond',
                notify: true,
                reflectToAttribute: true,
            },
            payoff: {
                type: Number,
                computed: '_getPayoff(isBought, isSold, endowment, q, cost)',
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
                    animation: 3s ease 6s normal forwards 1 fadein;
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
                    <h4>You [[ isBought ]] and [[ isSold ]].<br/>
                    You now have [[ numBonds ]] bonds</h4>
                </div>
                <div id="substep" $hidden="[[ _hideResults(hideBeforeSubmit) ]]">
                    <h3>Default? <span class$="[[ _getDefaultColor(defaultResult) ]]">[[ defaultResult ]]</span></h3>
                        <h4>Actual bond payment: [[ bondPayment ]]<br/>
                        Your private info cost: [[ cost ]]</h4>
                    <h3>Your payoff: [[ _getPayoffFormula(isBought, isSold, endowment, q, cost) ]] = [[ payoff ]]</h3>
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
        if (y < g) {
            this.defaultResult = 'Yes';
            return true;
        } else {
            this.defaultResult = 'No';
            return false;
        }
    }

    _getDefaultColor() {
        return this.isDefault ? 'def' : 'non-def';
    }

    _getBuy(q, buyPrice) {
        return (q < buyPrice) ? 'bought' : 'didn\'t buy';
    }

    _getSell(q, sellPrice) {
        return (q > sellPrice) ? 'sold' : 'didn\'t sell';
    }

    _getBondPayment(m) {
        return this.isDefault ? m : 100; // 0 if match
    }

    _getPayoff(isBought, isSold, endowment, q, cost) {
        // neither bought nor sold
        let val = endowment + this.bondPayment - cost;
        // bought
        if(isBought && !isBought.localeCompare('bought')) {
            val = endowment + (2 * this.bondPayment) - cost - q;
        }
        // sold
        if (isSold && !isSold.localeCompare('sold')) {
            val = endowment + q - cost;
        }
        return parseFloat(val.toFixed(2));
    }

    _getNumBonds(bonds, isBought, isSold) {
        // bought
        if(isBought && !isBought.localeCompare('bought')) {
            return ++bonds;
        }
        // sold
        if (isSold && !isSold.localeCompare('sold')) {
            return --bonds;
        }
        return bonds;
    }

    _getPayoffFormula(isBought, isSold, endowment, q, cost) {
        let f = `${endowment}`;
        // bought
        if (!isBought.localeCompare('bought'))
            f += ` + (2 * ${this.bondPayment}) - ${q}`;
        // sold
        else if (!isSold.localeCompare('sold'))
            f += ` + ${q}`;
        // neither
        else
            f += ` + ${this.bondPayment}`;
        // cost if non-zero
        if (cost)
            f += ` - ${cost}`;
        return f;
    }
}

window.customElements.define('results-page', Results);
