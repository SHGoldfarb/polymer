import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import { dispatchTransaction } from './transactions-input.js';
import './number-card.js';

class TransactionsContainer extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    margin: 20px;
                }
            </style>
            <transactions-input id="input"></transactions-input>
            <dom-repeat items="{{data}}">
                <template>
                    <number-card 
                        number="{{item}}" 
                        color="{{color}}" 
                        style="
                            width: 200px;
                            display: block;
                        "
                    ></number-card>
                </template>
            </dom-repeat>
        `;
    }

    static get properties() {
        return {
            color: String,
            data: {
                type: Array
            }
        }
    }

    ready() {
        super.ready();
        this.shadowRoot.querySelector('#input').addEventListener('newTransaction', (ev => {
            dispatchTransaction(this, ev.detail.value);
        }))
    }
}

window.customElements.define('transactions-container', TransactionsContainer);
