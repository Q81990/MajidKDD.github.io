/*
    Media Player Plugin
    This PlugIn can be used to show videos on the form plugin
*/

import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


// define the component
export class OneOne extends LitElement {
  
  static properties = {
    videosrc: {type: String}   
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Media iFrame',
      fallbackDisableSubmit: false,
      groupName: 'Media Player',
      version: '1.2',
      properties: {
        videosrc: {
          type: 'string',
          title: 'Media Source',
          description: 'Importend Youtube embeded link is needed (e.g https://www.youtube.com/embed/vpKcM4MxPzc)'
        }
        
      }
    };
  }


  checkAdress() {
     
     if(this.videosrc) {
         
      
      return html`
                
            
            <iframe
                src="${this.videosrc}
            ></iframe>
      `;
    
    }
    else {      
      return html`
        <p>OK please enter a source </p>  
      `;   
    }
  }     
  

  
  constructor() {
    super();
    this.checkAdress(); 
    
  }


  headerTemplate() {
    return html` <link rel="stylesheet" href="https://cdn.plyr.io/3.7.3/plyr.css">
                  
                
                `;
  }

  footerTemplate() {
    return html` </div> `;
  }
  

  

  render() {        

    
    return html`       
        
           ${this.headerTemplate()}
           ${this.checkAdress()} 
          
          
      
    `;     

  }
  
}

// registering the web component
const elementName = 'one-one';
customElements.define(elementName, OneOne);
