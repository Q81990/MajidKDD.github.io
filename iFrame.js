/*
    Media Player Plugin
    This PlugIn can be used to show videos on the form plugin
*/

import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


// define the component
export class MediaPlayerPlugIn extends LitElement {
  
  static properties = {
    videosrc: {type: String}, 
    Platform: {type: String}   
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Media Player',
      fallbackDisableSubmit: false,
      groupName: 'Media Player',
      version: '1.2',
      properties: {
        videosrc: {
          type: 'string',
          title: 'Media Source',
          description: 'Importend Youtube embeded link is needed (e.g https://www.youtube.com/embed/vpKcM4MxPzc)'
        },       
        Platform: {
          title: 'Platform',
          type: 'string',
        	enum: ['YouTube', 'Vimeo'],
          showAsRadio: false,
          verticalLayout: true,
          defaultValue: 'YouTube',
          description: 'Choose your Platform (YouTube is supported)'
        }         
        
      }
    };
  }


  checkAdress() {
     
     if(this.videosrc) {
         
      
      return html`
                
            
            <iframe id="ntxFormContainer-f8b4ec53-cd09-4fe2-85b6-a5e5a66326cd" scrolling="no" style="width:100%; border:none;" height="100%"
                src="${this.videosrc}
            ></iframe>            
             

      `;
    
    }
    else {      
      return html`
        <p>ok Please enter a source </p>  
      `;   
    }
  }     
  

  
  constructor() {
    super();
    this.checkAdress(); 
    
  }


  headerTemplate() {
    return html` <link rel="stylesheet" href="https://cdn.plyr.io/3.7.3/plyr.css">                  
                  <script src="https://ntx-apacsuccess.workflowcloud.com/embedform/iframe/ntx-embed-iframe.js" data-id="ntxFormContainer-f8b4ec53-cd09-4fe2-85b6-a5e5a66326cd"></script>   
                
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
const elementName = 'mediaplayer-plugin';
customElements.define(elementName, MediaPlayerPlugIn);
