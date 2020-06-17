import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class PieChart extends PolymerElement {
    static get properties() {
        return {
            defaultProbability: {
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
        return (1 - def).toFixed(2);
    }

    ready() {
        super.ready();
        this._initHighchart();
    }

    _initHighchart() {
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
                    y: this.defaultProbability*100,
                }, {
                    name: 'Non-default Probability',
                    y: this._getNondefault(this.defaultProbability)*100
                }]
            }]
        });
    }
}

window.customElements.define('pie-chart', PieChart);