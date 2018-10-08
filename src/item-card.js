import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class ItemCard extends PolymerElement {
    static get template() {
        return html`
        <style include="shared-styles"></style>
        <div class="card">Hola</div>
        `;
    }
}

window.customElements.define('item-card', ItemCard);