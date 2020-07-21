import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import '../polymer-elements/paper-range-slider.js';
// import '../polymer-elements/paper-single-range-slider.js';

class AssetSlider extends PolymerElement {

  static get properties() {
    return {
      m: {
        type: Number,
      },
      precision: {
        type: Number,
      },
      // Value in which the two points overlap
      highValue: {
        type: Number,
      },
      lowValue: {
        type: Number,
      },
      buyPrice: {
        type: Number,
        notify: true,
        reflectToAttribute: true,
      },
      sellPrice: {
        type: Number,
        notify: true,
        reflectToAttribute: true,
      },
      disableSelect: {
        type: Boolean,
        value: false,
      },
      markers: {
        type: Array,
        value: [0, 20, 40, 60, 80, 100],
      },
    }
  }

  static get template() {
    // paper-slider seems to be incompatible with ::input
    return html`
        <style>
          .slider1 {
            --paper-range-slider-higher-knob-color: #007bff;
            --paper-range-slider-higher-pin-color: #007bff;
            --paper-range-slider-lower-knob-color: #2F3238;
            --paper-range-slider-lower-pin-color: #2F3238;
            --paper-range-slider-active-color: #F06292;
          }
          .sliderticks {
            display: flex;
            justify-content: space-between;
          }
        .sliderticks p {
            position: relative;
            display: flex;
            justify-content: center;
            text-align: center;
            width: 1px;
            background: #D3D3D3;
            height: 10px;
            line-height: 40px;
            margin: 0 15px;
        }
        .valticks {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        p.mark {
          position: absolute;
          width: 2px;
          background: #F06292;
          height: 10px;
          line-height: 40px;
          z-index: 1;
          animation: 2s ease-in 0s normal forwards 1 fadein;
        }
        .high {
          background-color: #007bff;
        }
        .low {
          background-color: #2F3238;
        }
        span {
          color: white;
          margin-top: 5px;
          padding: 5px;
          border-radius: 5px;
        }
        .price {
          background-color: #F06292;
          animation: 3s ease-in 0s normal forwards 1 fadein;
        }
        @keyframes fadein {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .path {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 20px;
          margin: auto;
        }
        .shape {
          position: absolute;
          left: 0;
          background-color: purple;
          width: 8px;
          height: 8px;
          display: block;
          top: 0;
          
          x-transition: all 1s ease-in-out;
          animation: ani 1.7s 3;
          animation-delay: 2s;
          animation-play-state: running;
        }
        .static {
          position: absolute;
          left: 0;
          background-color: red;
          width: 8px;
          height: 8px;
          display: none;
          top: 0;
          animation-play-state: paused;
        }
        @keyframes ani {
          0% {
            left: 0;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 0;
          }
        </style>
        <br/>        
        <div class="valticks">
          <p class="mark" style$="margin: 120px 0 12px {{ _getHighMark(highValue) }}%;"><span class="high">[[ highValue ]]</span></p>
          <p class="mark" style$="margin: 120px 0 12px  {{ _getLowMark(lowValue) }}%;"><span class="low">[[ lowValue ]]</span></p>
          </div>
          <p class="mark" style$="margin: 50px 0 12px {{ _getPriceMark(q)}}%;" hidden$="[[ _hidePrice(isSubmitted) ]]"><span class="price">[[ q ]]</span></p>
        <div class="path">
          <span id="elem" class$="[[ revealPrice(isSubmitted) ]]"></span> 
        </div>
        <paper-range-slider
          class="slider1"
          slider-width="100%"
          always-show-pin
          min="0"
          max="100"
          step="0.1"
          value-min="{{ buyPrice::change }}"
          value-max="{{ sellPrice::change }}"
          disabled="[[ disableSelect ]]"
        ></paper-range-slider>
        <div class="sliderticks">
        <template is="dom-repeat" items="[[ markers ]]">
            <p>[[ item ]]</p>
            </template>
        </div>
        `;
  }

  _stop() {
    this.isSubmitted = !this.isSubmitted;
  }

  _hidePrice(isSubmitted) {
    return !isSubmitted;
  }

  revealPrice(isSubmitted) {
    // if (isSubmitted) {
    //   return 'shape';
    // }
    // else
    //   return 'static';
    return 'static';
  }

  _getHighMark(highVal) {
    return 37 - ((100 - highVal) * 0.36);
  }

  _getLowMark(lowVal) {
    return (lowVal * 0.373);
  }

  _getPriceMark(q)  {
    return q * 0.37;
  }
}

window.customElements.define('asset-slider', AssetSlider);
