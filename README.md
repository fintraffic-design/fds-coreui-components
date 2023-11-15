# coreui-components
Fintraffic Design System's Core UI Components. Work heavily in progress.

Work is being done at Fintraffic Raide to get some basic web components added to this repository in the near future. After we've achieved some **good enough** baseline, we'll revisit governing and contribution guidelines and processes for the Design System's technical implementation.

# Storybook
https://fintraffic-design.github.io/coreui-components

# Code style guide

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
Source code of this program is licensed under the [EUPL v1.2] (/LICENCE-EUPL.txt)
