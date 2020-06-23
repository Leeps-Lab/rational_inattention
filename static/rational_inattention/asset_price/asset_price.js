import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './polymer-elements/paper-button.js';

class AssetPrice extends PolymerElement {

    static get properties() {
        
    }

    static get template() {
        return html`
        <div>
            <p><strong>Your private information about m:</strong></p>
            <p>Element for selecting prices to buy/sell the asset</p>
            <input type="range" min="0" max="100" step="0.1">
            <paper-button>Submit</paper-button>
        </div>
        `;
    }
}

window.customElements.define('asset-price', AssetPrice);