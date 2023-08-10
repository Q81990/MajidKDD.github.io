import { css, html, LitElement, styleMap, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class abnControl extends LitElement {

  static properties = {
    videoUrl: { type: String },
    identifierValues: { type: Array },
  };

  static getMetaConfig() {
    return {
      controlName: 'abn Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        videoUrl: {
          type: 'string',
          title: 'abnURL',
          description: 'Type the YouTube URL here'
        }
      }
    };
  }

  async load() {
    const abnvar = 'https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2017?name=' + this.videoUrl + '&legalName=&tradingName=&businessName=&activeABNsOnly=&NSW=&SA=&ACT=&postcode=&VIC=&WA=&NT=&QLD=&TAS=&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417&searchWidth=&minimumScore=&maxSearchResults=';
    const response = await fetch(abnvar);
    const myJson = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(myJson, 'text/xml');
    const identifierNodes = xmlDoc.getElementsByTagName("identifierValue");
    const identifierValues = [];
    for (const node of identifierNodes) {
      identifierValues.push(node.childNodes[0].nodeValue);
    }
    return identifierValues;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.identifierValues = await this.load();
  }

  renderDropdown() {
    const options = this.identifierValues.map(value => html`<option value="${value}">${value}</option>`);
    return html`
      <select>
        <option value="">Select Identifier</option>
        ${options}
      </select>
    `;
  }

  render() {
    return html`
      <p>ABN Data:</p>
      ${this.renderDropdown()}
    `;
  }
}

const elementName = 'abn-controls';
customElements.define(elementName, abnControl);
