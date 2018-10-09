/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import './transactions-container.js'
import './transactions-input.js'

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
      <transactions-container id="incomes" color="blue" data={{indexedIncomes}}></transactions-container>
      <transactions-container id="expenses" color="red" data={{indexedExpenses}}></transactions-container>
      <number-card 
        number="{{total}}"
        style="
          width: 100px;
          display: block;"
        color="{{totalColor}}"
      ></number-card>
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
    this.total = this.incomes.reduce((x, y) => x + y, 0) - this.expenses.reduce((x, y) => x + y, 0);
    this.totalColor = this.total >= 0 ? 'green' : 'red';
    this.indexedExpenses = this.expenses.map((number, index) => ({ index, number }));
    this.indexedIncomes = this.incomes.map((number, index) => ({ index, number }));
  }
}

window.customElements.define('my-app', MyApp);
