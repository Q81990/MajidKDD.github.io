import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZipCodeElement extends LitElement {
  
   static properties = {
    zipCode: {type: String}     
  };
  
  
  
  constructor() {
    super();
    this.zipCode = '';
    this.responseData = null;
  }

 

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchZipCodeData();
  }

  async fetchZipCodeData() {
    const url = 'https://api.zippopotam.us/us/90210';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.responseData = data;
      this.requestUpdate(); // Refresh the component to reflect the updated data
    } catch (error) {
      console.error('Error fetching zip code data:', error);
    }
  }

  render() {
    return html`
      <div>
        <h1>Zip Code Data</h1>
        ${this.responseData
          ? html`
              <p>City: ${this.responseData.places[0].place name}</p>
              <p>State: ${this.responseData.places[0]['state abbreviation']}</p>
            `
          : html`<p>Loading...</p>`}
      </div>
    `;
  }
}

customElements.define('zip-code-element', ZipCodeElement);
