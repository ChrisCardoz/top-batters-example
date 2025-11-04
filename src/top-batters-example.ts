import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

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
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      max-width: 520px;
    }
    li {
      padding: 8px 12px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    li:last-child {
      border-bottom: 0;
    }
    .avg {
      font-variant-numeric: tabular-nums;
      color: #444;
      font-weight: 600;
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
      <ul>
        ${this.batters.map(
          (b) => html`
            <li>
              <span>${b.name}</span>
              <span class="avg">${b.avg.toFixed(3)}</span>
            </li>
          `
        )}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "top-batters-example": TopBattersExample;
  }
}
