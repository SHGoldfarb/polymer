import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import { dispatchTransaction } from './transactions-input.js';

class TransactionsContainer extends PolymerElement {
    static get template() {
        return html`
        <style></style>
        <dom-repeat items="{{data}}">
            <template>
                <div style$="color: {{color}}" >{{item}}</div>
            </template>
        </dom-repeat>
        <transactions-input id="input"></transactions-input>
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
