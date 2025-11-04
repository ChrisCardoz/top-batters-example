import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "@material/web/checkbox/checkbox.js";

@customElement("top-batters-example")
export class TopBattersExample extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell,
        Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      color: #222;
      line-height: 1.4;
    }
    header {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 8px;
    }
    tr {
      border: 1px solid #000;
      padding: 8px 0;
    }
    tr:nth-child(even) {
      background-color: #f5f5f5;
    }
  `;

  @state()
  private declare batters: Array<{ name: string; avg: number }>;

  constructor() {
    super();
    this.batters = [
      { name: "Luis Arraez", avg: 0.354 },
      { name: "Freddie Freeman", avg: 0.331 },
      { name: "Ronald Acuña Jr.", avg: 0.328 },
    ];
  }

  render() {
    return html`
      <header>Top Batters Example</header>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>BA</th>
          </tr>
        </thead>
        <tbody>
          ${this.batters.map(
            (b) => html`
              <tr>
                <td><md-checkbox checked></md-checkbox></td>
                <td>${b.name}</td>
                <td class="avg">${b.avg.toFixed(3)}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "top-batters-example": TopBattersExample;
  }
}
