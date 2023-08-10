import { css, html, LitElement, styleMap, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class ABNControlz123 extends LitElement {

  static properties = {
    videoUrl: { type: String },
    tableData: { type: Array },  // New property to store table data
  };

  static getMetaConfig() {
    return {
      controlName: 'ABN Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        videoUrl: {
          type: 'string',
          title: 'ABN URL',
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
    
    const searchResults = xmlDoc.querySelectorAll('searchResultsRecord');
    const tableData = Array.from(searchResults).map(result => {
      const abn = result.querySelector('identifierValue').textContent;
      const name = result.querySelector('organisationName').textContent;
      const type = result.querySelector('identifierStatus').textContent;
      const stateCode = result.querySelector('stateCode').textContent;
      const postcode = result.querySelector('postcode').textContent;
      const location = stateCode ? `${stateCode}, ${postcode}` : '';
      return { abn, name, type, location };
    });
    
    return tableData;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.tableData = await this.load();
  }

  renderTable() {
    const rows = this.tableData.map(row => html`
      <tr>
        <td>${row.abn}</td>
        <td>${row.name}</td>
        <td>${row.type}</td>
        <td>${row.location}</td>
      </tr>
    `);

    return html`
      <table>
        <thead>
          <tr>
            <th>ABN</th>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  render() {
    return html`
      <div>
        <h2>ABN Data:</h2>
        ${this.renderTable()}
      </div>
    `;
  }
}

customElements.define('abn-controlzz123', ABNControlz123);
