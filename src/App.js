import { LitElement, html, css } from 'lit'
import './components/getData'
export class App extends LitElement {
  static properties = {
    characters: { type: Array },
  }
  static styles = css`
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    .item {
      border: 4px solid black;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    img {
      heigth: 40px;
    }
  `
  constructor() {
    super()
    this.characters = []
    this.addEventListener('DataApi', event => {
      this.characters = event.detail.data
      //console.log(event.detail.data)
    })
  }

  tableTemplate() {
    return html`
      <section class="container">
        ${this.characters.map(
          c => html`
            <div class="item">
              <p>${c.name}</p>
              <p>${c.house}</p>
              <p>${c.patronus}</p>
              <p>
                <img
                  src="${c.image.length > 1
                    ? c.image
                    : 'https://ik.imagekit.io/hpapi/harry.jpg'}"
                  height="200"
                />
              </p>
            </div>
          `
        )}
      </section>
    `
  }
  render() {
    return html`
      <get-data url="https://hp-api.onrender.com/api/characters"></get-data>
      <h2>Personajes</h2>
      <div>
        <input type="text" @change=${this.handleFilter} />
      </div>
      <div>
        <label>Selecciona la casa</label>
        <select>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
        </select>
      </div>
      ${this.tableTemplate()}
    `
  }
  handleFilter(e) {
    console.log(e.target.value)
    const text = e.target.value
    this.characters = this.characters.filter(c => c.name.includes(text))
  }
  handleSelect(e) {
    console.log(e)
  }
}
customElements.define('my-app', App)
