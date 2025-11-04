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
      margin-bottom: 12px;
    }
    table {
      width: 100%;
      max-width: 640px;
      border-collapse: separate;
      border-spacing: 0;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    thead th {
      background: #f9fafb;
      color: #111827;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
      padding: 10px 12px;
    }
    tbody td {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
    }
    tbody tr:last-child td {
      border-bottom: 0;
    }
    tbody tr:nth-child(even) {
      background: #fcfcfd;
    }
    tbody tr:hover {
      background: #f8fafc;
    }
    tbody tr { cursor: pointer; }
    tbody tr.selected { background: #eef2ff; }
    th.avg, td.avg {
      text-align: right;
      font-variant-numeric: tabular-nums;
      color: #374151;
      font-weight: 600;
      width: 1%;
      white-space: nowrap;
    }
    th.select, td.select {
      width: 1%;
      text-align: center;
      white-space: nowrap;
    }
  `;

  @state()
  private declare batters: Array<{ name: string; avg: number }>;
  @state()
  private declare selected: Set<string>;

  constructor() {
    super();
    this.batters = [
      { name: "Luis Arraez", avg: 0.354 },
      { name: "Freddie Freeman", avg: 0.331 },
      { name: "Ronald Acuña Jr.", avg: 0.328 },
    ];
    this.selected = new Set();
  }

  private toggle(name: string) {
    const next = new Set(this.selected);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    this.selected = next;
  }

  private setChecked(name: string, checked: boolean) {
    const next = new Set(this.selected);
    if (checked) next.add(name);
    else next.delete(name);
    this.selected = next;
  }

  render() {
    return html`
      <header>Top Batters Example</header>
      <table aria-label="Top batters by batting average">
        <thead>
          <tr>
            <th scope="col" class="select">Select</th>
            <th scope="col">Name</th>
            <th scope="col" class="avg">AVG</th>
          </tr>
        </thead>
        <tbody>
          ${this.batters.map(
            (b) => {
              const checked = this.selected.has(b.name);
              return html`
                <tr
                  class=${checked ? "selected" : ""}
                  @click=${() => this.toggle(b.name)}
                >
                  <td class="select">
                    <md-checkbox
                      .checked=${checked}
                      @change=${(e: Event) => {
                        e.stopPropagation();
                        const target = e.currentTarget as any;
                        this.setChecked(b.name, !!target.checked);
                      }}
                      @click=${(e: Event) => e.stopPropagation()}
                    ></md-checkbox>
                  </td>
                  <td>${b.name}</td>
                  <td class="avg">${b.avg.toFixed(3)}</td>
                </tr>
              `;
            }
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
