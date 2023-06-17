import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class abnControl extends LitElement {
  
  static properties = {
    videoUrl: {type: String},
  };
  
  // return a promise for contract changes.
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
  
  
  renderCountry(country) {
    this.videoUrl =  html `  <div>Country: ${country}</div>  `;
  }
  
  
  async load() {
  const response = await fetch('https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByABN?searchString=67129119731&includeHistoricalDetails=N&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417');
  const myJson = await response;
    const countryPromise = Promise.resolve(myJson);
  const country = await countryPromise;
  //this.country = country;    
    return country;
    //html `  <div>Country: ${country}</div>  `;
  }
  
 
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
         this.videoUrl = await this.load();
        //await this.load();
    }
  
 render() {
    return html`<button onclick="load()">Click abn</button><p>"${this.videoUrl}" </p>`;
 }
//  render() {
//    return html`   <div>    <b>Country:</b>   </div>   `;
//  }     

}

// registering the web component
const elementName = 'abn-control';
customElements.define(elementName, abnControl);
