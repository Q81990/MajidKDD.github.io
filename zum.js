import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


export class ZipCodeComponent extends LitElement {

  static properties = {
    data: { type: Object },
    txtdata: {type: string}
  };

  async load() {
    try {
      const response = await fetch('https://api.zippopotam.us/us/90210',
      {
                method: 'GET',
                headers: {                    
                    'Content-Type': 'application/json'
                }
            }
        );
      const jsonData = await response.json();
      const rawjsonData = await response.text();
      this.data = jsonData;
      this.txtdata = rawjsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  constructor() {
    super();
    this.data = null;
    this.txtdata = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.load();
  }
  render() {
    return html`
      <div>
      ${this.txtdata}
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
