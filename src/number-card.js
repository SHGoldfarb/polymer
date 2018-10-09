import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

const toMoneyStrig = number => {
    let numberString = number.toString();
    let ret = '';
    while (numberString) {
        if (ret) {
            ret = '.' + ret
        }
        ret = numberString.slice(-3) + ret;
        numberString = numberString.slice(0, -3)
    }
    return '$' + ret;
}

class NumberCard extends PolymerElement {
    static get template() {
        return html`
        <div style$="
            color: {{color}};
            text-align: end;
        ">{{numberString}}</div>
      `;
    }

    static get properties() {
        return {
            number: {
                type: Number,
                observer: '_numberChange'
            },
            color: {
                type: String,
                value: 'black'
            }
        }
    }

    _numberChange(value) {
        this.numberString = toMoneyStrig(value)
    }
}

window.customElements.define('number-card', NumberCard);
