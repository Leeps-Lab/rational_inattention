import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import './asset_slider.js'
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

        </div>
        `;
    }
}

window.customElements.define('asset-price', AssetPrice);
