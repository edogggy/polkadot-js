# @polkadot/extension

[![Greenkeeper badge](https://badges.greenkeeper.io/polkadot-js/extension.svg)](https://greenkeeper.io/)

A very simple scaffolding browser extension that injects a [@polkadot/api](https://github.com/polkadot-js/api) Signer into a page, along with any associated accounts, allowing for use by any dapp. This is an extensible POC implementation of a Polkadot/Substrate browser signer.

As it stands, it does one thing: it _only_ manages accounts and allows the signing of transactions with those accounts. It does not inject providers for use by dapps at this early point, nor does it perform wallet functions where it constructs and submits txs to the network.

# Running

Currently is not packaged since it is under heavy development. As such you need to build it yourself. To use -

1. Build via `yarn build` or `yarn watch`
2. Add the extension under `chrome://extensions/`
  - ensure you have the Development flag set
  - "Load unpacked" and point to `packages/extension/build`
  - if developing, after making changes - refresh the extension
3. When visiting `http://localhost:3000` or `https://polkadot.js.org/apps/` it will inject the extension (the manifest currently only lists these 2 endpoints)

Once added, you can create an account (via a generated seed) or import via an existing seed. The UI, when loaded, will show these accounts as `<account name> (extension)`

## Technical

The extension injects `injectedWeb3` into the global `window` object, exposing the following:

```js
// a version that identifies the actual injection version (future-use)
type Version = 0;

// an interface describing an account
interface Account {
  readonly address: string; // ss-58 encoded address
  readonly name?: string; // optional name for display
}

// exposes accounts
interface Accounts {
  get: () => Promise<Array<Account>>;
}

// a signer that communicates with the extension via sendMessage
interface Signer extends SignerInterface {
  // no specific signer extensions
}

interface Injected {
  readonly accounts: Accounts;
  readonly signer: Signer;
  readonly version: Version;
}
```

The app can use all or any of these, depending on needs. To instantiate the `@polkadot/api` with the provider (app does not have it's own) and the signer (allowing the extension to sign messages) can be done via -

```js
import { ApiPromise } from '@polkadot/api';

const { signer } = window.injectedWeb3;
const api = await Api.create({ signer });
```
