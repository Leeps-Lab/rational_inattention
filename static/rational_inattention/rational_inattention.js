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
            initialCredits: {
                type: Number,
            },
            precision: {
                type: Number,
                value: 1,
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
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                .main {
                    display: flex;
                    flex-direction: column;
                }
                .btn {
                    margin: 20px;
                    width: 50px;
                }
            </style>
            <div class="main">
           <public-info
            default-prob="[[ defaultProb ]]"
            credits="[[ initialCredits ]]"
           ></public-info>
           <div hidden$="{{ _hideStep(step, 1) }}">
               <info-precision
                precision="{{ precision }}"
                disable-select="{{ _disableStep(step, 1) }}"
               ></info-precision>
           </div>
           <div hidden$="{{ _hideStep(step, 2) }}">
            <asset-price
                m="[[ m ]]"
                precision="[[ precision ]]"
                default-prob="[[ defaultProb ]]"
                disable-select="{{ _disableStep(step, 2) }}"
            ></asset-price>
           </div>
           <div hidden$="{{ _hideStep(step, 3) }}">
            <results-page></results-page>
           </div>
           <paper-button class="btn" on-click="_nextStep">[[ buttonLabel ]]</paper-button>
           </div>
        `;
    }

    _nextStep() {
        this.step++;
        // auto scroll down to next step/screen
        window.scrollBy({top: 600, behavior: 'smooth'});
    }

    _hideStep(step, num) {
        return step < num;
    }

    _disableStep(step, num) {
        return step != num;
    }

    _updateButtonLabel() {
        if(this.step == 1 || this.step == 2)
            this.buttonLabel = 'Submit';
        else
            this.buttonLabel = 'Next';
    }

}

window.customElements.define('rational-inattention', RationalInattention);
