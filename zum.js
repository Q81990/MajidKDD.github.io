import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


export class ZipCodeComponent extends LitElement {

  static properties = {
    data: { type: Object },
  };

  constructor() {
    super();
    this.data = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.load();
  }

  async load() {
    try {
      const response = await fetch('https://api.zippopotam.us/us/90210');
      const jsonData = await response.json();
      this.data = jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`
      <div>
        <!-- Render your data here -->
        ${this.data
          ? html`
              <p>City: ${this.data.places[0].place name}</p>
              <p>State: ${this.data.places[0].state}</p>
              <!-- Add other desired data fields here -->
            `
          : html`<p>Loading...</p>`}
      </div>
    `;
  }
}

customElements.define('zip-it', ZipCodeComponent);
