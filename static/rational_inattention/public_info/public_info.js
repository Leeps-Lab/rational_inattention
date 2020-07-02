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
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                }
                .def {
                    color: #DF5353;
                }
                .non-def {
                    color: #55BF3B;
                }
            </style>
            <div><strong>Public information: </strong>
            This asset has <span class="def">[[ defaultProb ]]%</span> default probability
                and <span class="non-def">[[ _getNondefault(defaultProb) ]]%</span> non-default probability.</div>
            <pie-chart
                default-prob="[[ defaultProb ]]"
            ></pie-chart>
            <span class="non-def">If non-default, the asset repays [[ credits ]] game credits.</span>
            <span class="def">If default, the asset repays in ratio of [[ credits ]] game credits (0 < m < 1).</span>        
            `;
    }

    _getNondefault(def) {
        return 100 - def;
    }

}

window.customElements.define('public-info', PublicInfo);