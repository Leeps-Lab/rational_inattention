import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class Results extends PolymerElement {
    static get template() {
        return html`
            <h2>Results:</h2>
            <h4>Default? Yes or No<br/>
            Actual m = 0.5</br>
            Expected Asset value: ##</br>
            Asset price: #p</h4>
            <div>
                Your selling price: A. Did you sell? Yes if #p > A<br/>
                Your buying price: B. Did you sell? Yes if #p <= B<br/>
                Actual asset payment: 100 or # * 100<br/>
                Your private info cost:<br/>
                Your payoff: 100 - cost<br/>
                Your total wealth: <br/>
            </div>

        `;
    }
}

window.customElements.define('results-page', Results);
