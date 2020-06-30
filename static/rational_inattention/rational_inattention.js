import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './public_info/public_info.js';
import './info_precision/info_precision.js';
import './asset_price/asset_price.js';
import './polymer-elements/paper-button.js';
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
            initialCredits: {
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
           <public-info
            default-prob="[[ defaultProb ]]"
            credits="[[ initialCredits ]]"
           ></public-info>
           <div hidden$="{{ _hideStep(step, 1) }}">
               <info-precision></info-precision>
           </div>
           <div hidden$="{{ _hideStep(step, 2) }}">
            <asset-price></asset-price>
           </div>
           <div>
           <paper-button on-click="_nextStep">[[ buttonLabel ]]</paper-button>
           </div>
        `;
    }

    _nextStep() {
        this.step++;
    }

    _hideStep(step, num) {
        return step < num;
    }

    _updateButtonLabel() {
        if(this.step == 1 || this.step == 2)
            this.buttonLabel = 'Submit';
        else
            this.buttonLabel = 'Next';
    }

}

window.customElements.define('rational-inattention', RationalInattention);
