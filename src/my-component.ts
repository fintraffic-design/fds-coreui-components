import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TemplateResult } from 'lit-html';

@customElement('my-component')
export class MyComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
    }
  `

  @property() name: string = 'World';
  @property() count: number = 0;

  override render(): TemplateResult {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this.onClick}>
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  };

  private onClick(): void {
    this.count++;
    console.log('click', this.count);
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  sayHello(name: string): string {
    console.log('sayHello');
    return `Hello, ${name}`;
  }
}
