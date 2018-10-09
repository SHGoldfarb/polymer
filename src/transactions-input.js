import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export const dispatchTransaction = (element, value) => {
    element.dispatchEvent(new CustomEvent(
        'newTransaction', {
            detail: {
                value: value
            }
        }));
};

const addListeners = (element) => {
    element.shadowRoot.querySelector('#submit')
        .addEventListener('click', (ev) => {
            ev.preventDefault();
            const inputElement = element.shadowRoot.querySelector("#input")
            const value = inputElement.value;
            if (value.length > 0) {
                dispatchTransaction(element, value);
                console.log('new value added ', value);
                inputElement.value = '';
            }
        });
}

class TransactionsInput extends PolymerElement {
    static get template() {
        return html`
        <style></style>
        <form>
            <input type="number" id="input"/>
            <input type="submit" value="Guardar" id="submit"/>
        </form>
      `;
    }

    ready() {
        super.ready();
        addListeners(this);
    }
}

window.customElements.define('transactions-input', TransactionsInput);
