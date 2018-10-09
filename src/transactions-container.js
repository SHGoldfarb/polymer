import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { } from '@polymer/polymer/lib/elements/dom-repeat.js';
import './number-card.js';
import { propagate } from './utils.js';

class TransactionsContainer extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    margin: 20px;
                }
            </style>
            <transactions-input id="input"></transactions-input>
            <div id="repeater-container">
                <dom-repeat items="{{data}}">
                    <template>
                        <number-card 
                            index="{{item.index}}"
                            number="{{item.number}}" 
                            color="{{color}}" 
                            style="
                                width: 200px;
                                display: block;
                            "
                        ></number-card>
                    </template>
                </dom-repeat>
            </div>
            
        `;
    }

    static get properties() {
        return {
            color: String,
            data: {
                type: Array,
                observer: '_dataChanged'
            }
        }
    }

    _dataChanged(data) {
        // console.log('data changed', data);
        const cards = this.shadowRoot.querySelectorAll('number-card');
        if (cards) {
            // console.log(cards);
            // cards.forEach(node => console.log(node));
        }
    }

    ready() {
        super.ready();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                //Detect insertion
                if (mutation.addedNodes.length) {
                    mutation
                        .addedNodes[0]
                        .nextElementSibling
                        .addEventListener('delete', ev => {
                            propagate(this, ev);
                        });
                }
            })
        })

        observer.observe(
            this.shadowRoot.querySelector('#repeater-container'),
            { childList: true }
        );

        this.shadowRoot.querySelector('#input').addEventListener('newTransaction', (ev => {
            propagate(this, ev);
        }))
    }
}

window.customElements.define('transactions-container', TransactionsContainer);
