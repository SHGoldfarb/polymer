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
    this.total = 0;
  }

  static get template() {
    return html`
      <transactions-container id="incomes" color="blue" data={{incomes}}></transactions-container>
      <transactions-container id="expenses" color="red" data={{expenses}}></transactions-container>
      <div>{{total}}</div>
    `;
  }

  ready() {
    super.ready();
    this.updateTotal()
    this.shadowRoot.querySelector('#incomes').addEventListener('newTransaction', (ev => {
      const value = parseInt(ev.detail.value);
      this.push('incomes', value);
      this.updateTotal();
    }))
    this.shadowRoot.querySelector('#expenses').addEventListener('newTransaction', (ev => {
      const value = parseInt(ev.detail.value);
      this.push('expenses', value);
      this.updateTotal();
    }))
  }

  updateTotal() {
    this.total = this.incomes.reduce((x, y) => x + y) - this.expenses.reduce((x, y) => x + y);
  }
}

window.customElements.define('my-app', MyApp);
