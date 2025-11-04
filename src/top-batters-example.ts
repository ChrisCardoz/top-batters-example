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
    tbody tr {
      cursor: pointer;
    }
    tbody tr.selected {
      background: #eef2ff;
    }
    th.num,
    td.num,
    th.avg,
    td.avg,
    th.obp,
    td.obp,
    th.slg,
    td.slg,
    th.rwar,
    td.rwar {
      text-align: right;
      font-variant-numeric: tabular-nums;
      color: #374151;
      font-weight: 600;
      width: 1%;
      white-space: nowrap;
    }
    th.select,
    td.select {
      width: 1%;
      text-align: center;
      white-space: nowrap;
    }
  `;

  @state()
  private declare batters: Array<{
    name: string;
    avg: number;
    obp: number;
    slg: number;
    rWar: number;
  }>;
  @state()
  private declare selected: Set<string>;

  constructor() {
    super();
    this.batters = [
      { name: "Aaron Judge", avg: 0.331, obp: 0.457, slg: 0.688, rWar: 9.7 },
      { name: "Bo Bichette", avg: 0.311, obp: 0.357, slg: 0.483, rWar: 3.5 },
      { name: "Jacob Wilson", avg: 0.311, obp: 0.355, slg: 0.444, rWar: 3.0 },
      {
        name: "George Springer",
        avg: 0.304,
        obp: 0.399,
        slg: 0.56,
        rWar: 4.8,
      },
      { name: "Jeremy Peña", avg: 0.304, obp: 0.363, slg: 0.477, rWar: 5.6 },
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
      <table aria-label="Top batters: AVG, OBP, SLG, and WAR">
        <thead>
          <tr>
            <th scope="col" class="select">Select</th>
            <th scope="col">Name</th>
            <th scope="col" class="num avg">AVG</th>
            <th scope="col" class="num obp">OBP</th>
            <th scope="col" class="num slg">SLG</th>
            <th scope="col" class="num slg">OPS</th>
            <th scope="col" class="num rwar">rWAR</th>
          </tr>
        </thead>
        <tbody>
          ${this.batters.map((b) => {
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
                <td class="num avg">${b.avg.toFixed(3)}</td>
                <td class="num obp">${b.obp.toFixed(3)}</td>
                <td class="num slg">${b.slg.toFixed(3)}</td>
                <td class="num ops">${(b.obp + b.slg).toFixed(3)}</td>
                <td class="num rwar">${b.rWar.toFixed(1)}</td>
              </tr>
            `;
          })}
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
