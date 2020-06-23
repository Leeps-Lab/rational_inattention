import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './pie_chart.js';

class RationalInattention extends PolymerElement {

    static get properties() {
        return {
            step: {
                type: Number,
                value: 0,
            },
            defaultProb: {
                type: Number,
            },
        }
    }
    static get template() {
        return html`
            <h4>Public information:</h4>
            <div>This asset has [[ defaultProb ]]% default probability
                and [[ _getNondefault(defaultProb) ]]% non-default probability.</div>
            <pie-chart
                default-prob="[[ defaultProb ]]"
            ></pie-chart>
            <button type="button" on-click="_nextStep">next</button>
            <div>Step [[ step ]]</div>
            <div>
            <template is="dom-if" if="{{  _showStep(step, 1) }}">
                <h1>should display as step 1</h1>
                <div> [[ step ]]</div>
            </template>
            </div>
            <div>
            <template is="dom-if" if="{{ _showStep(step, 2) }}">
                <div> [[ step ]]</div>
            </template>
            </div>
        `;
    }

    _getNondefault(def) {
        return 100 - def;
    }

    _nextStep() {
        this.step++;
    }

    _showStep(step, num) {
        console.log('chcking step', step, num, step >=num);
        return step >= num;
    }
}

window.customElements.define('rational-inattention', RationalInattention);