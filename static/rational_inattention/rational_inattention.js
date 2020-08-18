import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js'; // // /static/otree-redwood/node_modules/@polymer/
import './public_info/public_info.js';
import './info_precision/info_precision.js';
import './bond_price/bond_price.js';
import './polymer-elements/paper-button.js';
import './results.js';
class RationalInattention extends PolymerElement {

    static get properties() {
        return {
            step: {
                type: Number,
                value: 0,
                observer: function (step) {
                    this._updateButtonLabel();
                    setTimeout(function () {
                        if (step === 3) {
                            this.submitPrices = true;
                        } else if (step && step < 4) {  // auto scroll down to next step/screen
                            window.scrollBy({ top: 540, behavior: 'smooth' });
                        }
                    }, 500);
                },
                notify: true,
                reflectToAttribute: true,
            },
            g: Number,
            m: Number,
            y: Number,
            q: Number,
            endowment: Number,
            bonds: Number,
            precision: Number,
            cost: Number,
            mLow: Number,
            mHigh: Number,
            lowValue: Number,
            highValue: Number,
            bidPrice: Number,
            askPrice: Number,
            expectedVal: Number,
            default: Boolean,
            bought: Boolean,
            sold: Boolean,
            bondPayment: Number,
            numBonds: Number,
            payoff: Number,
            buttonLabel: {
                type: String,
                value: 'Next',
            },
        }
    }
    static get template() {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .row {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }
                .first {
                    margin-top: -9%;
                }
                .step {
                    width: 38%;
                    padding: 0 30px;
                    margin: 30px;
                }
                .btn {
                    position: relative;
                    margin: 30px 25% auto auto;
                    width: 50px;
                }
            </style>
            <div class="first">
            <public-info
                    g="[[ g ]]"
                    credits="[[ endowment ]]"
                ></public-info>
            </div>
            <div hidden$="{{ _hideStep(step, 1) }}">
                <info-precision
                    precision="{{ precision }}"
                    cost="{{ cost }}"
                    disable-select="{{ _disableStep(step, 1) }}"
                ></info-precision>
            </div>
            <div class="row">
                <div class="step" hidden$="{{ _hideStep(step, 2) }}">
                    <bond-price
                        g="[[ g ]]"
                        m="[[ m ]]"
                        q="[[ q ]]"
                        precision="[[ precision ]]"
                        default-prob="[[ g ]]"
                        m-low="{{ mLow }}"
                        m-high="{{ mHigh }}"
                        low-value="{{ lowValue }}"
                        high-value="{{ highValue }}"              
                        buy-price="{{ bidPrice }}"
                        sell-price="{{ askPrice }}"
                        expected-value="{{ expectedVal }}"
                        disable-select="[[ _disableStep(step, 2) ]]"
                        hide-before-submit="{{ _hideStep(step, 3) }}"
                        animate-price="[[ _animatePrice(2) ]]"
                    ></bond-price>
                </div>
                <div class="step" hidden$="{{ _hideStep(step, 4) }}">
                    <results-page
                        endowment="[[ endowment ]]"
                        bonds="[[ bonds ]]"
                        g="[[ g ]]"
                        m="[[ m ]]"
                        y="[[ y ]]"
                        q="[[ q ]]"
                        buy-price="[[ buyPrice ]]"
                        sell-price="[[ sellPrice ]]"
                        low-value="[[ lowValue ]]"
                        high-value="[[ highValue ]]"              
                        cost="[[ cost ]]"
                        is-default="{{ default }}"
                        bought="{{ bought }}"
                        sold="{{ sold }}"
                        bond-payment="{{ bondPayment }}"
                        num-bonds="{{ numBonds }}"
                        payoff="{{ payoff }}"
                        disable-select="[[ _disableStep(step, 2) ]]"
                        hide-before-submit="[[ _hideStep(step, 5) ]]"
                        animate-price="[[ _animatePrice(step) ]]"
                    ></results-page>
                </div>
           </div>
           <paper-button class="btn" on-click="nextStep">[[ buttonLabel ]]</paper-button>
           <h3>DEBUG g: [[ g ]], m: [[ m ]], y: [[ y ]], q: [[ q ]]</h3>
        `;
    }

    nextStep() {
        this.step++;
        this.dispatchEvent(new CustomEvent('getPolymerData', {
            bubbles: true,
            composed: true,
            detail: {
                this: this,
                value: { // values to dispatch to oTree
                    'step': this.step,
                    'precision': this.precision,
                    'cost': this.cost,
                    'bidPrice': this.bidPrice,
                    'askPrice': this.askPrice,
                    'mLow': this.mLow,
                    'mHigh': this.mHigh,
                    'lowValue': this.lowValue,
                    'highValue': this.highValue,
                    'bought': this.bought,
                    'sold': this.sold,
                    'payoff': this.payoff,
                },
                eventName: 'getPolymerData'
            }
        }));
        return this.step;
    }

    _getBought(isBought) {
        return isBought === 'bought';
    }

    _getSold(isSold) {
        return isSold === 'sold';
    }

    _hideStep(step, num) {
        return step < num;
    }

    _disableStep(step, num) {
        return step != num;
        // return false;
    }

    _updateButtonLabel() {
        if (this.step == 1 || this.step == 2)
            this.buttonLabel = 'Submit';

        else if (this.step == 3 || this.step == 4) {
            this.buttonLabel = 'Continue';
        }
        else
            this.buttonLabel = 'Next';
    }

    _animatePrice(step) {
        return step == 4;
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('rational-inattention', RationalInattention);
