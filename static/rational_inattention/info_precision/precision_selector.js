import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';

class PrecisionSelector extends PolymerElement {

    static get properties() {
        return {
            precision: {
                type: Number,
                observer: '_updateSelected',
                notify: true,
                reflectToAttribute: true,
            },
            cost: {
                type: Number,
                value: 0,
            },
            data: {
                type: Array,
                value: [],
            },
            step: {
                type: Number,
                value: 0.1,
            }
        }
    }

    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
                .container {
                    display: flex;
                    flex-direction: row;
                }
                .display {
                    margin: auto;
                }
                #chart {
                    width: 640px;
                }
                input {
                    width: 610px;
                }
            </style>
            <div class="container">
                <figure class="highcharts-figure">
                <div id="chart"></div>
                <input type="range" min="0" max="1" step="[[ step ]]" value="{{ precision::input }}">
                </figure>
                <h4 class="display">width: [[ precision ]]<br/>cost: [[ cost ]]</h4>
            </div>
        `;
    }

    ready() {
        super.ready();
        for(let x = 0; x < 1; x += this.step) {
            this.data.push([+((x).toFixed(1)), this._getCosts(x)])
        }
        this._initHighchart();
    }

    _getCosts(x) {
        // Cost Function: -c * ln(width)
        let c = -10;
        return +((c * Math.log(x)).toFixed(2));

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
                pointFormat: '{series.name}: <b>{point.y}</><br/>',
                valueSuffix: ' credits',
                style: {
                    width: '500px',
                    fontSize: '16px'
                }
                // crosshairs: {
                //     color: 'green',
                //     dashStyle: 'solid'
                // },
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
                min: 0,
                max: 1,
                accessibility: {
                    // rangeDescription: 'Range: 0 to 1'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                line: { marker: { enabled: false } },
                series: {
                    allowPointSelect: true,
                    marker: {
                        states: {
                            select: {
                                // fillColor: 'green',
                                // lineWidth: 0
                            }
                        }
                    },
                    cursor: 'pointer',
                    events: {
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
                name: 'Precision Cost',
                data: this.data,//[[0, 16], [0.1, 12], [0.2, 8], [0.3, 6], [0.4, 4], [0.5, 3], [0.6, 2], [0.7, 1.5], [0.8, 1], [0.9, 0.5], [1, 0]],
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

window.customElements.define('precision-selector', PrecisionSelector);