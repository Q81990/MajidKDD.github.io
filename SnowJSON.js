//ver 5
import { css, html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class snowJsonControl extends LitElement {

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
    incnum: { type: Array },
    callerid: { type: String },
    selectedOption: { type: String },
    selectedSysId: { type: String },
    outcome: { type: String }  // Change outcome type to String
  };

  static getMetaConfig() {
    return {
      controlName: 'SNow ControJSON',
      fallbackDisableSubmit: false,
      version: '1.3',
      properties: {         
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          description: 'Type the Incident number here'
        },
                outcome: {
            type: 'string',
            title: 'outcome',
            isValueField: true,
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
    //const snowvar = 'https://dev83014.service-now.com/api/now/table/incident?sysparm_fields=number,short_description,sys_id&caller_id=' + this.callerid;
   const snowvar =  'https://dev83014.service-now.com/api/now/table/alm_asset?asset_tag=P1000479';
    const response = await fetch(snowvar, { method: "GET", headers: { "Authorization": "Basic QWRtaW46UU1iblRvOXAlMSFL" } });   
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
    this.outcome = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    //this.callerid = 'David.Miller';
    this.incnum = await this.load();
     // Set incnumJson property with the JSON representation of incnum
    this.outcome = JSON.stringify(this.incnum, null, 2);
  }

render() {
  this.outcome = JSON.stringify(this.incnum, null, 2);
   return html`
    <label for="selectedValue">JSON Description (JavaScript Variable):</label>
    <textarea id="selectedValue" class="expandable_input">${this.outcome}</textarea>     
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

  handleDropdownChange(event) {
    const selectedOption = event.target.value;
    const selectedOptionInput = this.shadowRoot.querySelector("#selectedValue");
    selectedOptionInput.style.width = (selectedOption.length + 1) + "ch";
    selectedOptionInput.value = selectedOption;

    const selectedOptionElement = event.target.selectedOptions[0];
    const selectedSysId = selectedOptionElement.getAttribute("data-sysid");
    this.selectedSysId = selectedSysId;
    const optionTextInput = this.shadowRoot.querySelector("#optiontext");
    optionTextInput.value = selectedSysId;
    
    this._handleClick(selectedSysId);
  }


  
  handleInput(event) {
    const inputElement = event.target;
    this.selectedOption = inputElement.value;
    inputElement.style.width = (inputElement.value.length + 1) + "ch";
    expandElementHeight(inputElement);
  }
}

function expandElementHeight(element) {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
}

const elementName = 'snow-jsonctrl';
customElements.define(elementName, snowJsonControl);
