# coreui-components
Fintraffic Design System's Core UI Components. Work heavily in progress.

Work is being done at Fintraffic Raide to get some basic web components added to this repository in the near future. After we've achieved some **good enough** baseline, we'll revisit governing and contribution guidelines and processes for the Design System's technical implementation.

# Storybook
https://fintraffic-design.github.io/fds-coreui-components


# Install

```shell
npm i --save @fintraffic/fds-coreui-components
```

# Usage

Usage as a native web component.

Import and register a specific component.

```js
import '@fintraffic/fds-coreui-components/dist/define/fds-button.js';
```

Import and register all components.

```js
import '@fintraffic/fds-coreui-components/dist/define/all.js';
```

Extend a component.

```js
import { FdsButton } from '@fintraffic/fds-coreui-components';
class MyButton extends FdsButton { /* ... */ }
customElements.define('my-button', MyButton);
```

## React wrappers

Usage of React component wrappers.

Import and register a specific React component.
This will also register the web component and the components used internally by it.

```js
import { FdsButton } from '@fintraffic/fds-coreui-components/dist/react/button.js'
```

> NOTE: when using React, make sure to import from the `dist/react` path to get the React components. Your IDE auto imports will probably try to import the web component by default from `@fintraffic/fds-coreui-components` so if you use auto imports to add these, you will probably need to manually fix the import paths.

You can also import any of the React components from `@fintraffic/fds-coreui-components/dist/react/index.js` but this will cause all of the components to be loaded and registered (not just the ones you import).

```js
import {
  FdsButton,
  FdsInput,
} from '@fintraffic/fds-coreui-components/dist/react/index.js'
```

# Code style guide

* Implementation should follow the [component publishing](https://open-wc.org/guides/developing-components/publishing/) guidelines from Open Web Components.

* Web component code should be ordered as follows:
  - Imports
  - TypeScript definitions
  - Lit-component
    - Constructor (only when required)
    - Reactive properties (```@property```, ```@state```)
    - Override-methods
    - Render-method
    - Helper-methods
    - CSS

  ><b>Reasoning:</b> With this order we aim to have the most functionally essential logic of the component featured most prominently. For this reason, the CSS (static variable) has been moved to the end, contrary to common OOP-practices. 
  Otherwise, it is generally desired to maintain the same order of structure in components, so that even unfamiliar code is a little easier to read when you know how it is structured.

* Class properties that update the component's inner state, should have the ```private``` access modifier, or ```protected``` if there is a good reason for it.

* Use the ```function``` keyword when declaring functions.

* Naming practises:
  - Use underscore (```_```) for private and protected properties, e.g. ```@state() private _enabled = true```

* Prettier is used for code formatting.
  - Settings are found in ```.prettierc.json```.
  - Usage (two options):
    - Plugin: Install and enable the Prettier VSCode/IntelliJ -plugin and ensure that the "format on save" -option is enabled for your IDE.
    - No plugin: Run at project root ```npx prettier -w src/```

* Always write and update the <b>JSDocs</b>!

# Licencing
Copyright © Fintraffic 2023
Source code of this program is licensed under the [EUPL v1.2](./LICENCE)
