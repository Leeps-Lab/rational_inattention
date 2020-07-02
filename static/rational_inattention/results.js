import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class Results extends PolymerElement {
    static get template() {
        return html`
            <h2>Results:</h2>
            <h4>Default? Yes or No<br/>
            Actual m = 0.5</br>
            Expected Asset value: ##</br>
            Asset price: idk</h4>
            <div>Your selling price: A. Did you sell?<br/>
                Your buying price: B. Did you sell?<br/>
                Actual asset payment: 100 or # * 100
                Your private info cost:
                Your payoff: 100 - cost
                Your total wealth: 
            </div>

        `;
    }
}

window.customElements.define('results-page', Results);
