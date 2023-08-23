import { css, html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class snowSrviceControl extends LitElement {
  static properties = {
     incidentData: { type: Object },
    incnum: { type: Array },
    callerid: { type: String },
    selectedOption: { type: String },
    selectedSysId: { type: String },
    outcome: { type: String }  // Change outcome type to String
  };

  static getMetaConfig() {
    return {
      controlName: 'SNow Control Srvc',
      fallbackDisableSubmit: false,
      version: '1.3',
      properties: {
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          description: 'Type the Incident number here'
        },
                callerid: {
          type: 'string',
          title: 'CallerID',
          description: 'Type the Caller ID here'
        },        
      },
      events: ["ntx-value-change"],
    };
  }

  async load() {
    const snowvar = 'https://dev160993.service-now.com/api/now/table/incident?number=' + this.callerid;
    const response = await fetch(snowvar, { method: "GET", headers: { "Authorization": "Basic YWRtaW46dmJKYWRASCpUNlc5" } });
    if (response.ok) {
      const myJson = await response.json();
      const result = myJson.result;
      return myJson;
    } else {
      return [];
    }
  }

  constructor() {
    super();
    this.incnum = [];
    this.selectedOption = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    //this.callerid = 'David.Miller';
    //this.incnum = await this.load();
    this.incidentData = await this.load();
  }


  renderTable() {
    if (!this.incidentData) {
      return html`<b>Loadin.....</b>`;
    }

    const incident = this.incidentData.result[0];
    this._handleClick(incident);
    return html`
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(incident).map(([field, value]) => html`
            <tr>
              <td>${field}</td>
              <td>${value}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
  render() {
    return this.renderTable(); // Render the HTML table directly
  }

  _handleClick(e) {
   const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail:e,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
    console.log(e);
  }


}

const elementName = 'snowsrvc-control';
customElements.define(elementName, snowSrviceControl);
