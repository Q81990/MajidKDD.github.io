import { LitElement, html } from 'lit';

class ImageControl extends LitElement {
  static get properties() {
    return {
      imageUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.imageUrl = '';
  }

  render() {
    return html`
      <label for="file-upload">Upload Image:</label>
      <input id="file-upload" type="file" @change=${this.handleFileSelected} accept="image/*">
      ${this.imageUrl !== '' ? html`<img src=${this.imageUrl} alt="Uploaded Image">` : ''}
    `;
  }

  async handleFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
      body: formData,
    });
    const json = await response.json();
    this.imageUrl = `https://drive.google.com/thumbnail?id=${json.id}&sz=w500-h500`;
  }
}

customElements.define('image-control', ImageControl);
