import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './pie-chart.js';

class RationalInattention extends PolymerElement {

    static get properties() {
        return {
            defaultProb: {
                type: Number,
            }
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
        `;
    }

    _getNondefault(def) {
        return 100 - def;
    }
}

window.customElements.define('rational-inattention', RationalInattention);