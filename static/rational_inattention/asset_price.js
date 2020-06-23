import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class AssetPrice extends PolymerElement {

    static get properties() {
        
    }

    static get template() {
        return html`
        <div>Element for selecting prices to buy/sell the asset</div>
        `;
    }
}

window.customElements.define('asset-price', AssetPrice);