import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class PieChart extends PolymerElement {
    static get properties() {
        return {
            defaultProb: {
                type: Number,
            }
        }
    }

    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
            </style>
            <figure class="highcharts-figure">
                <div id="chart"></div>
            </figure>
        `;
    }

    _getNondefault(def) {
        return 100 - def;
    }

    ready() {
        super.ready();
        this._initHighchart();
    }

    _initHighchart() {
        console.log(this.defaultProb);
        this.graphObj = Highcharts.chart({
            chart: {
                renderTo: this.$.chart,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Default Probability'
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Default Probability',
                colorByPoint: true,
                data: [{
                    name: 'Default Probability',
                    y: this.defaultProb,
                }, {
                    name: 'Non-default Probability',
                    y: this._getNondefault(this.defaultProb)
                }]
            }]
        });
    }
}

window.customElements.define('pie-chart', PieChart);