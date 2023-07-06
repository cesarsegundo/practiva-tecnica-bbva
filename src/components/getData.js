import { LitElement } from 'lit'
export class GetData extends LitElement {
  static properties = {
    url: { type: String },
  }
  constructor() {
    super()
  }
  firstUpdated() {
    this.getData()
  }
  sendData(data) {
    this.dispatchEvent(
      new CustomEvent('DataApi', {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    )
  }
  getData() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => this.sendData(data))
  }
}
customElements.define('get-data', GetData)
