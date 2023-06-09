import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


export class ZipCodeComponent extends LitElement {

  static properties = {
    data: { type: Object },
    txtdata: {type: string}
  };

  async load() {
    try {
     const userAction = async () => {
  const response = await fetch('https://api.zippopotam.us/us/90210');
  const myJson = await response.json(); //extract JSON from the http response  
  alert(myJson);
  
}
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
      ${this.myJson}       
      </div>
    `;
  }
}

customElements.define('zip-itt', ZipCodeComponent);
