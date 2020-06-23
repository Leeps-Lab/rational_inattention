import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './pie_chart.js';

class PublicInfo extends PolymerElement {

    static get properties() {
        return {
            defaultProb: {
                type: Number,
            },
            credits: {
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
            <p>If non-default, the asset repays [[ credits ]] game credits.</p>
            <p>If default, the asset repays in ratio of [[ credits ]] game credits (0 < m < 1).</p>        
            `;
    }

    _getNondefault(def) {
        return 100 - def;
    }

}

window.customElements.define('public-info', PublicInfo);