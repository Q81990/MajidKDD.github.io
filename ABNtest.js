import { html,LitElement,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class abnControltest extends LitElement {
  static properties = {
    abnName: {type: String},
    APIKey:  {type: String},
    Platform:{type: String} 
  };

 static getMetaConfig() {
    return {
      controlName: 'ABN Control',
      fallbackDisableSubmit: false,
      groupName: 'ABN NZBN',
      version: '1.2',
      properties: { 
        outcome: {
          title: 'abnName',
          type: 'string',
        	description: 'Insert ABN name',
          isValueField: true
        },        
      },
    };
  }

 render() {
    return html`ABN Data:<p>"${this.abnName}" </p>`;
 }
  
}
const elementName = 'abn-testcontrol';
customElements.define(elementName, abnControltest);
