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
            <div>Public information:</div>
            <div>This asset has [[ defaultProb ]] default probability
                and [[ _getNondefault(defaultProb) ]] non-default probability.</div>
            <pie-chart
                default-probability="[[ defaultProb ]]"
            ></pie-chart>
        `;
    }

    _getNondefault(def) {
        return (1 - def).toFixed(2);
    }
}

window.customElements.define('rational-inattention', RationalInattention);