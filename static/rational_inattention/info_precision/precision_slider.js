import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class PrecisionSlider extends PolymerElement {

    static get properties() {
        return {
            precision: {
                type: Object,
                value: 1,
                observer: '_updateSelected',
                notify: true,
                reflectToAttribute: true,
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
                :host {
                    display: block;
                }
                #chart {
                    width: 640px;
                }
                input {
                    width: 600px;
                }
            </style>
            <figure class="highcharts-figure">
            <div id="chart"></div>
            <input type="range" min="0" max="1" step="0.1" precision-changed value="{{ precision::input }}" class="slider">
            </figure>
            <div>precision (width): [[ precision ]] cost: [[ cost ]]</div>
        `;
    }

    ready() {
        super.ready();
        this._initHighchart();
    }

    _updateSelected() {
        if (!this.graphObj)
            return;

        const point = this.graphObj.series[0].data[this.precision * 10];
        point.select();
        this.graphObj.tooltip.refresh(point);
        this.cost = point.y;
        // console.log(point.x, point.y);
    }

    _initHighchart() {
        this.graphObj = Highcharts.chart({
            chart: {
                renderTo: this.$.chart,
            },
            tooltip: {
                crosshairs: true,
                crosshairs: {
                    color: 'green',
                    dashStyle: 'solid'
                },
                // shared: true
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
                // min: 0,
                // max: 1,
                accessibility: {
                    rangeDescription: 'Range: 0 to 1'
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                // line: { marker: { enabled: false } },
                series: {
                    allowPointSelect: true,
                    marker: {
                        states: {
                            select: {
                                fillColor: 'green',
                                lineWidth: 0
                            }
                        }
                    },
                    cursor: 'pointer',
                    events: {
                        mouseOver: function () {
                            console.log('hover');
                            // console.log(this.chart);
                        },
                        click: function (event) {
                            console.log(event.point.x, event.point.y);
                        }
                    },
                    label: {
                        allowPointSelect: true,
                        connectorAllowed: false
                    },
                },
            },

            series: [{
                name: 'Precision',
                data: [[0, 16], [0.1, 12], [0.2, 8], [0.3, 6], [0.4, 4], [0.5, 3], [0.6, 2], [0.7, 1.5], [0.8, 1], [0.9, 0.5], [1, 0]],
                pointStart: 0
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