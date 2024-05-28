import "../theme/hot.css";
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

import { LitElement, css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";


// import reset from "./tailwind-reset";
// import { cva } from "class-variance-authority";

// const toolbarStyle = cva(
//   "some-css-var",
//   {
//     variants: {
//       someProperty: {
//         true: "some-css-var",
//         false: "some-css-var",
//       },
//     },
//   },
// );

export class Toolbar extends LitElement {
  @property() name = "hot-toolbar";

  /** Change the position of the tooltips relative to buttons. */
  @property({ type: String, attribute: "tooltip-position" }) tooltipPosition = "top";

  static styles = [
    css`
      @unocss-placeholder;
    `,
    // unsafeCSS(reset),
  ];

  // class=${toolbarStyle({
  //   someProperty: this.someProperty,
  // })}
  protected render() {
    return html`
      <div class="button-group-toolbar">
        ${this.renderButtonGroup('History', [
          { content: 'Undo', icon: 'arrow-counterclockwise', label: 'Undo', action: this.undo },
          { content: 'Redo', icon: 'arrow-clockwise', label: 'Redo', action: this.redo }
        ])}
        ${this.renderButtonGroup('Formatting', [
          { content: 'Bold', icon: 'type-bold', label: 'Bold', action: this.bold },
          { content: 'Italic', icon: 'type-italic', label: 'Italic', action: this.italic },
          { content: 'Underline', icon: 'type-underline', label: 'Underline', action: this.underline }
        ])}
        ${this.renderButtonGroup('Alignment', [
          { content: 'Align Left', icon: 'justify-left', label: 'Align Left', action: this.alignLeft },
          { content: 'Align Center', icon: 'justify', label: 'Align Center', action: this.alignCenter },
          { content: 'Align Right', icon: 'justify-right', label: 'Align Right', action: this.alignRight }
        ])}
      </div>
    `;
  }

  private renderButtonGroup(label: string, buttons: Array<{ content: string, icon: string, label: string, action?: (e: MouseEvent) => void }>) {
    return html`
      <sl-button-group label=${label}>
        ${buttons.map(button => this.renderButton(button))}
      </sl-button-group>
    `;
  }

  private renderButton({ content, icon, label, action }: { content: string, icon: string, label: string, action?: (e: MouseEvent) => void }) {
    return html`
      <sl-tooltip content=${content} placement="${this.tooltipPosition}">
        <sl-button @click=${action ?? (() => {})}><sl-icon name=${icon} label=${label}></sl-icon></sl-button>
      </sl-tooltip>
    `;
  }

  private readonly undo = (e: MouseEvent) => {
    // As the original event is also named 'click'
    // stop propagation of the original event
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-undo-click"));
  }

  private readonly redo = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-redo-click"));
  }

  private readonly bold = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-bold-click"));
  }

  private readonly italic = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-italic-click"));
  }

  private readonly underline = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-underline-click"));
  }

  private readonly alignLeft = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-leftalign-click"));
  }

  private readonly alignCenter = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-centeralign-click"));
  }

  private readonly alignRight = (e: MouseEvent) => {
    e.stopPropagation();
    this.dispatchEvent(new Event("hot-rightalign-click"));
  }
}

export default Toolbar;

// Define web component
customElements.define("hot-toolbar", Toolbar);
