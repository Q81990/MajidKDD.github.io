import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class abnControl extends LitElement {
  
  static properties = {
    abnName: {type: String},
    APIKey:  {type: String},
    Platform:{type: String} 
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'ABN Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
      outcome: {        
         title: 'abnName',
         type: 'string',
         description: 'Type the abnName'   
         isValueField: true
          },
        APIKey: {
          type: 'string',
          title: 'APIKey',
          description: 'Provide APIKey'
        },       
        Platform: {
          title: 'Platform',
          type: 'string',
        	enum: ['AUS', 'NZ'],
          showAsRadio: false,
          verticalLayout: true,
          defaultValue: 'AUS',
          description: 'Choose your Platform (AUS now only is supported)'
        }         
     };
  }

 
  renderCountry(country) {
    this.abnName =  html `  <div>Country: ${country}</div>  `;
  }
  
  
  async load() {
 //   const abnvar = 'https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByABN?searchString='+this.abnName+'&includeHistoricalDetails=N&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417';
 const abnvar =   'https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2017?name='+this.abnName+'&legalName=&tradingName=&businessName=&activeABNsOnly=&NSW=&SA=&ACT=&postcode=&VIC=&WA=&NT=&QLD=&TAS=&authenticationGuid='+this.APIKey+'&searchWidth=&minimumScore=&maxSearchResults=';
  const response = await fetch(abnvar);
    const myJson = await response.text();
    const countryPromise = Promise.resolve(myJson);
  
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(myJson, 'text/xml');
        //const xpathResult = xmlDoc.getElementsByTagName("organisationName")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("effectiveFrom")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("ASICNumber")[0].childNodes[0].nodeValue;
          const xpathResult = xmlDoc.getElementsByTagName("organisationName")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("score")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("identifierValue")[0].childNodes[0].nodeValue;
    const country = await xpathResult; 
    return country;
    //html `  <div>Country: ${country}</div>  `;  
  }
  
 
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
         this.abnName = await this.load();
        //await this.load();
    }
  
 render() {
    return html`ABN Data:<p>"${this.abnName}" </p>`;
 }
//  render() {
//    return html`   <div>    <b>Country:</b>   </div>   `;
//  }     

}

// registering the web component
const elementName = 'abn-testcontrol';
customElements.define(elementName, abnControl);
