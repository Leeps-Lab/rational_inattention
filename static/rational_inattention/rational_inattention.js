import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './public_info/public_info.js';
import './info_precision/info_precision.js';
import './asset_price/asset_price.js';
import './polymer-elements/paper-button.js';
import './results.js';
class RationalInattention extends PolymerElement {

    static get properties() {
        return {
            step: {
                type: Number,
                value: 0,
                observer: '_updateButtonLabel',
            },
            defaultProb: {
                type: Number,
            },
            m: {
                type: Number,
            },
            y: {
                type: Number,
            },
            q: {
                type: Number,
            },
            initialCredits: {
                type: Number,
            },
            precision: {
                type: Number,
                value: 1,
            },
            buyPrice: {
                type: Number,
            },
            sellPrice: {
                type: Number,
            },
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
            default-prob="[[ defaultProb ]]"
            credits="[[ initialCredits ]]"
            ></public-info>
            </div>
            <div hidden$="{{ _hideStep(step, 1) }}">
            <info-precision
                    precision="{{ precision }}"
                    disable-select="{{ _disableStep(step, 1) }}"
                    ></info-precision>
            </div>
            <div class="row">
            <div class="step" hidden$="{{ _hideStep(step, 2) }}">
                <asset-price
                m="[[ m ]]"
                precision="[[ precision ]]"
                default-prob="[[ defaultProb ]]"
                buy-price="{{ buyPrice }}"
                sell-price="{{ sellPrice }}"
                disable-select="{{ _disableStep(step, 2) }}"
                ></asset-price>
            </div>
            <div class="step" hidden$="{{ _hideStep(step, 3) }}">
                <results-page
                    default-prob="[[ defaultProb ]]"
                    m="[[ m ]]"
                    y="[[ y ]]"
                    buy-price="[[ buyPrice ]]"
                    sell-price="[[ sellPrice ]]"
                    q="[[ q ]]"
                ></results-page>
            </div>
           </div>
           <paper-button class="btn" on-click="_nextStep">[[ buttonLabel ]]</paper-button>
           <h4>debug m: [[ m ]], y: [[ y ]], q: [[ q ]]</h4>
        `;
    }

    _nextStep() {
        this.step++;
        // auto scroll down to next step/screen
        if (this.step !== 3)
            window.scrollBy({ top: 600, behavior: 'smooth' });
    }

    _hideStep(step, num) {
        return step < num;
    }

    _disableStep(step, num) {
        // return step != num;
        return false;
    }

    _updateButtonLabel() {
        if (this.step == 1 || this.step == 2)
            this.buttonLabel = 'Submit';
        else
            this.buttonLabel = 'Next';
    }

}

window.customElements.define('rational-inattention', RationalInattention);
