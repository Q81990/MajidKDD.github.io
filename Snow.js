import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class snowControl extends LitElement {
  
  static properties = {
    incnum: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Snow Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          // isValueField: true,
          description: 'Type the Inncident number here'
        }
      }
    };
  }
  
  
  renderCountry(country) {
    this.incnum =  html `  <div>Country: ${country}</div>  `;
  }
  
  
  async load() {
 //   const abnvar = 'https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByABN?searchString='+this.videoUrl+'&includeHistoricalDetails=N&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417';
 //const abnvar =   'https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2017?name='+this.videoUrl+'&legalName=&tradingName=&businessName=&activeABNsOnly=&NSW=&SA=&ACT=&postcode=&VIC=&WA=&NT=&QLD=&TAS=&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417&searchWidth=&minimumScore=&maxSearchResults=';
 // const response = await fetch(abnvar);

        const response = await fetch('https://dev160993.service-now.com/api/now/table/incident?sysparm_fields=number&caller_id=majid',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW46dmJKYWRASCpUNlc5',  
                'Content-Type': 'application/json',
            }
        });

    const myJson = await response.text();
    const countryPromise = Promise.resolve(myJson);
  
       // const parser = new DOMParser();
       // const xmlDoc = parser.parseFromString(myJson, 'text/xml');
        //const xpathResult = xmlDoc.getElementsByTagName("organisationName")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("effectiveFrom")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("ASICNumber")[0].childNodes[0].nodeValue;
        //  const xpathResult = xmlDoc.getElementsByTagName("organisationName")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("score")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("identifierValue")[0].childNodes[0].nodeValue;
    const country = await myJson;    //xpathResult; 
    return country;
    //html `  <div>Country: ${country}</div>  `;  
  }
  
 
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
         this.incnum = await this.load();
        //await this.load();
    }
  
 render() {
    return html`Snow Data:<p>"${this.incnum}" </p>`;
 }
//  render() {
//    return html`   <div>    <b>Country:</b>   </div>   `;
//  }     

}

// registering the web component
const elementName = 'snow-control';
customElements.define(elementName, snowControl);
