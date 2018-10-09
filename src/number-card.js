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
        ">{{numberString}} <button id="delete">X</button></div>
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
            },
            index: Number
        }
    }

    _numberChange(value) {
        this.numberString = toMoneyStrig(value)
    }

    ready() {
        super.ready();
        this.shadowRoot.querySelector('#delete').addEventListener('click', ev => {
            this.dispatchEvent(new CustomEvent('delete', { detail: { index: this.index } }));
            console.log('delete', this.index, this.number);
        })
    }
}

window.customElements.define('number-card', NumberCard);
