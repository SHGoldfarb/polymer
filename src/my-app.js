import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import './transactions-container.js'
import './transactions-input.js'
import { sumArray } from './utils.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  constructor() {
    super();
    this.incomes = [1200, 3000];
    this.expenses = [2000];
    this.indexedIncomes = [];
    this.indexedExpenses = [];
    this.total = 0;
    this.totalColor = 'black';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: flex;
        }
      </style>
      <transactions-container name="Ingresos" id="incomes" color="blue" data={{indexedIncomes}}></transactions-container>
      <transactions-container name="Gastos" id="expenses" color="red" data={{indexedExpenses}}></transactions-container>
      <div id="totals-container">
        <h2 style$="color: {{totalColor}}">Total</h2>
        <number-card 
          number="{{total}}"
          style="
            width: 100px;
            display: block;
            margin: 20px;
            font-size: 30px;
            font-weight: 50"
          color="{{totalColor}}"
          deletable="false"
        ></number-card>
      </div>
      
    `;
  }

  ready() {
    super.ready();
    this.updateTotal();
    const incomesContainer = this.shadowRoot.querySelector('#incomes');
    const expensesContainer = this.shadowRoot.querySelector('#expenses');
    incomesContainer.addEventListener('newTransaction', (ev => {
      const value = parseInt(ev.detail.value);
      this.push('incomes', value);
      this.updateTotal();
    }))
    incomesContainer.addEventListener('delete', ev => {
      this.incomes.splice(ev.detail.index, 1);
      this.updateTotal();
    });
    expensesContainer.addEventListener('newTransaction', (ev => {
      const value = parseInt(ev.detail.value);
      this.push('expenses', value);
      this.updateTotal();
    }))
    expensesContainer.addEventListener('delete', ev => {
      this.expenses.splice(ev.detail.index, 1);
      this.updateTotal();
    });
  }

  updateTotal() {
    this.total = sumArray(this.incomes) - sumArray(this.expenses);
    this.totalColor = this.total >= 0 ? 'green' : 'red';
    this.indexedExpenses = this.expenses.map((number, index) => ({ index, number }));
    this.indexedIncomes = this.incomes.map((number, index) => ({ index, number }));
  }
}

window.customElements.define('my-app', MyApp);
