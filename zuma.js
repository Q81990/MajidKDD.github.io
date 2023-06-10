import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyButton extends LitElement {
  static styles = css`
    button {
      padding: 8px 16px;
      background-color: #4caf50;
      color: white;
      border: none;
      cursor: pointer;
    }
  `;

  async userAction() {
    const response = await fetch('https://api.zippopotam.us/us/90210');
    const myJson = await response.text();
    alert(myJson);
  }
  constructor() {
    super();
  }
  
  render() {
    return html`
      <button @click=${this.userAction}>Click me</button>
    `;
  }
}
customElements.define('my-button', MyButton);
