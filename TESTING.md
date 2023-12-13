# Manually testing usage via npm with your local changes

## Testing with npm link

You can use [npm link](https://docs.npmjs.com/cli/commands/npm-link) to quickly test your local changes or a specific commit/branch version (the version in your git working tree) of these components in your application project.

In the directory of this repository, run:

```shell
npm link
```

Then in your application project directory, run:
```shell
npm link @fintraffic-design/coreui-components
```

If you aren't seeing the latest changes, you may need to rerun these after something changes.

When using `npm link` there may be some behavioural differences compared to how the published npm package actually works when installed due to which files are actually included in a published npm package (and which are not). For avoiding these issues and testing the package exactly as if it was installed from npm registry you may use the `npm pack` method described in the following section.

For more info see: https://docs.npmjs.com/cli/commands/npm-link

## Testing with npm pack

You can use [npm pack](https://docs.npmjs.com/cli/commands/npm-pack) command to create a tarball that contains the package (with the same contents that would be published to npm if you were to run `npm publish`).

This tarball can then be installed directly into a test project with `npm install ../path/to/file.tgz` to verify that everything would still work if the package was to be published to npm and installed from npm in its current state.

Testing with `npm pack` is especially useful when making configuration changes that affect publishing or importing behaviour (for example editing `files` or `main` fields in `package.json` or editing `.npmignore` files).