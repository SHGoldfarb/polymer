import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { toMoneyString } from './utils.js'

class NumberCard extends PolymerElement {
    static get template() {
        return html`
        <div style$="
            color: {{color}};
            text-align: end;
    ">{{numberString}} ${console.log(this.deletable) ? html`<button id="delete">X</button></div>` : html``}
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
            index: Number,
            deletable: {
                type: String,
                value: "true"
            }
        }
    }

    _numberChange(value) {
        this.numberString = toMoneyString(value);
    }

    ready() {
        super.ready();
        if (this.deletable === "true") {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'X'
            deleteButton.addEventListener('click', ev => {
                this.dispatchEvent(new CustomEvent('delete', { detail: { index: this.index } }));
                console.log('delete', this.index, this.number);
            });
            this.shadowRoot.querySelector('div').appendChild(deleteButton);
        }
    }
}


window.customElements.define('number-card', NumberCard);
