import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class PrecisionSlider extends PolymerElement {
   
    static get properties() {
        return {
            // credits: {
            //     type: Number,
            // },
            precision: {
                type: Number,
                value: 0,
            },
            cost: {
                type: Number,
                value: 0,
            },
        }
    }

    static get template() {
        return html`
            <style>
                input {
                    width: 700px;
                }
            </style>
            <figure class="highcharts-figure">
            <div id="container"></div>
            </figure>
            <input type="range" min="0" max="1" step="0.1" value="{{ precision::change }}">
            <div>precision (width): [[ precision ]]</div>
        `;
    }

    ready() {
        super.ready();
        this._initHighchart();
    }

    _initHighchart() {
        this.graphObj = Highcharts.chart({
            chart: {
                renderTo: this.$.container,
            },
            title: {
                text: ''
            },
        
            subtitle: {
            },
        
            yAxis: {
                title: {
                    text: 'Cost'
                }
            },
        
            xAxis: {
                // type: 'logarithmic',
                accessibility: {
                    rangeDescription: 'Range: 1 to 10'
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        
            series: [{
                name: 'Precision',
                data: [512, 256, 128, 64, 32, 16, 8, 4, 2, 1],
                pointStart: 1
            },],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 1000
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }

}

window.customElements.define('precision-slider', PrecisionSlider);