import { css, html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class snowAddressz extends LitElement {

  static styles = css`
    .selcls {
      background: #A0CFCF;
      height: 75px;
      width: 250px;
      border: solid 8px #517B97;
      border-radius: 33px;
      padding: 20px;
      color: #fff;
    }
.expandable_input{   
   border: 2px solid #ddd;   
 }
  `;

  static properties = {
    incnum: { type: String },
    callerid: { type: String },
    selectedOption: { type: String },
    selectedSysId: { type: String },
    outcome: { type: String }  // Change outcome type to String
  };

  static getMetaConfig() {
    return {
      controlName: 'SNow Controlzz33',
      fallbackDisableSubmit: false,
      version: '1.3',
      properties: {
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          description: 'Type the Incident number here'
        },
selectedSysId: {
          type: 'string',
          title: 'Record SysID',
          description: 'Type the SYSID number here'
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
const snowvar = 'https://dev160993.service-now.com/api/now/table/incident?sysparm_fields='+this.callerid+'&sys_id='+this.selectedSysId;   const response = await fetch(snowvar, { method: "GET", headers: { "Authorization": "Basic YWRtaW46dmJKYWRASCpUNlc5" } });
    if (response.ok) {
      const myJson = await response.json();
      const result = myJson.result;
      return result;
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
    this.incnum = await this.load();
  }

  render() {
  if (!this.incnum) {
    return html``;
  }

  const address = this.incnum[0].u_addressaddress;
_handleClick(address);
  return html`
    <label for="addressTextBox">Address:</label>
    <input
      id="addressTextBox"
      type="text"
      .value="${address}"     
    />
  `;
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


const elementName = 'snow-adrz';
customElements.define(elementName, snowAddressz);
