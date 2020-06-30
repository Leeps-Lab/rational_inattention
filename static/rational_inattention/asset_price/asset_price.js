import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './asset_slider.js'
import '../polymer-elements/paper-button.js';

class AssetPrice extends PolymerElement {

    static get properties() {

    }

    static get template() {
        return html`
        <div>
            <p><strong>Your private information about m:</strong></p>
            <p>Element for selecting prices to buy/sell the asset</p>

            <asset-slider
            ></asset-slider>

            <input type="range" min="0" max="100" step="0.1">
        </div>
        `;
    }
}

window.customElements.define('asset-price', AssetPrice);
