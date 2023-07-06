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
      margin-top: 1rem;
    }
    .item {
      border: 4px solid black;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    span {
      font-weight: bold;
      color: #02243f;
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
              <p>Nombre: <span>${c.name}</span></p>
              <p>Casa: <span>${c.house}</span></p>
              <p>Patronus: <span>${c.patronus}</span></p>
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
      <h2>Personajes saga Harry Potter</h2>
      <div>
        <input
          type="text"
          @input=${this.handleFilter}
          placeholder="Filtrar por nombre..."
        />
        <select @change="${this.handleSelect}">
          <option value="Gryffindor">Filtrar por casa...</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
        </select>
        <button @click=${this.clearFilters}>Limpiar filtros</button>
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
    console.log(e.target.value)
    const house = e.target.value
    this.characters = this.characters.filter(c => c.house.includes(house))
  }
  clearFilters() {
    location.reload()
  }
}
customElements.define('my-app', App)
