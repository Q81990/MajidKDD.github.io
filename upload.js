import { LitElement, html } from 'lit-element';

class ImageUpload extends LitElement {
  static get properties() {
    return {
      imageUrl: { type: String }
    };
  }

  constructor() {
    super();
    this.imageUrl = '';
  }

  render() {
    return html`
      <div>
        <input type="text" placeholder="Enter image URL" @change="${this.handleUrlChange}">
        <img src="${this.imageUrl}" alt="Uploaded image">
      </div>
    `;
  }

  handleUrlChange(e) {
    const imageUrl = e.target.value;
    if (imageUrl !== '') {
      this.imageUrl = imageUrl;
    }
  }
}

customElements.define('image-upload', ImageUpload);
