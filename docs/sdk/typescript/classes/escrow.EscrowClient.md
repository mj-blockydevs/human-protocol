[@human-protocol/sdk](../README.md) / [Modules](../modules.md) / [escrow](../modules/escrow.md) / EscrowClient

# Class: EscrowClient

[escrow](../modules/escrow.md).EscrowClient

## Introduction

This client enables to perform actions on Escrow contracts and obtain information from both the contracts and subgraph.

Internally, the SDK will use one network or another according to the network ID of the `signerOrProvider`.
To use this client, it is recommended to initialize it using the static `build` method.

```ts
static async build(signerOrProvider: Signer | Provider);
```

A `Signer` or a `Provider` should be passed depending on the use case of this module:

- **Signer**: when the user wants to use this model in order to send transactions caling the contract functions.
- **Provider**: when the user wants to use this model in order to get information from the contracts or subgraph.

## Installation

### npm
```bash
npm install @human-protocol/sdk
```

### yarn
```bash
yarn install @human-protocol/sdk
```

## Code example

### Signer

**Using private key(backend)**

```ts
import { EscrowClient } from '@human-protocol/sdk';
import { Wallet, providers } from 'ethers';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);
```

**Using Wagmi(frontend)**

```ts
import { useSigner, useChainId } from 'wagmi';
import { EscrowClient } from '@human-protocol/sdk';

const { data: signer } = useSigner();
const escrowClient = await EscrowClient.build(signer);
```

### Provider

```ts
import { EscrowClient } from '@human-protocol/sdk';
import { providers } from 'ethers';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(provider);
```

## Hierarchy

- [`BaseEthersClient`](base.BaseEthersClient.md)

  ↳ **`EscrowClient`**

## Table of contents

### Constructors

- [constructor](escrow.EscrowClient.md#constructor)

### Properties

- [escrowFactoryContract](escrow.EscrowClient.md#escrowfactorycontract)
- [gasPriceMultiplier](escrow.EscrowClient.md#gaspricemultiplier)
- [networkData](escrow.EscrowClient.md#networkdata)
- [signerOrProvider](escrow.EscrowClient.md#signerorprovider)

### Methods

- [abort](escrow.EscrowClient.md#abort)
- [addTrustedHandlers](escrow.EscrowClient.md#addtrustedhandlers)
- [bulkPayOut](escrow.EscrowClient.md#bulkpayout)
- [cancel](escrow.EscrowClient.md#cancel)
- [complete](escrow.EscrowClient.md#complete)
- [createAndSetupEscrow](escrow.EscrowClient.md#createandsetupescrow)
- [createEscrow](escrow.EscrowClient.md#createescrow)
- [fund](escrow.EscrowClient.md#fund)
- [gasPriceOptions](escrow.EscrowClient.md#gaspriceoptions)
- [getBalance](escrow.EscrowClient.md#getbalance)
- [getEscrowContract](escrow.EscrowClient.md#getescrowcontract)
- [getExchangeOracleAddress](escrow.EscrowClient.md#getexchangeoracleaddress)
- [getFactoryAddress](escrow.EscrowClient.md#getfactoryaddress)
- [getIntermediateResultsUrl](escrow.EscrowClient.md#getintermediateresultsurl)
- [getJobLauncherAddress](escrow.EscrowClient.md#getjoblauncheraddress)
- [getManifestHash](escrow.EscrowClient.md#getmanifesthash)
- [getManifestUrl](escrow.EscrowClient.md#getmanifesturl)
- [getRecordingOracleAddress](escrow.EscrowClient.md#getrecordingoracleaddress)
- [getReputationOracleAddress](escrow.EscrowClient.md#getreputationoracleaddress)
- [getResultsUrl](escrow.EscrowClient.md#getresultsurl)
- [getStatus](escrow.EscrowClient.md#getstatus)
- [getTokenAddress](escrow.EscrowClient.md#gettokenaddress)
- [setup](escrow.EscrowClient.md#setup)
- [storeResults](escrow.EscrowClient.md#storeresults)
- [build](escrow.EscrowClient.md#build)

## Constructors

### constructor

• **new EscrowClient**(`signerOrProvider`, `networkData`, `gasPriceMultiplier?`)

**EscrowClient constructor**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signerOrProvider` | `Signer` \| `Provider` | The Signer or Provider object to interact with the Ethereum network |
| `networkData` | `NetworkData` | - |
| `gasPriceMultiplier?` | `number` | The multiplier to apply to the gas price |

#### Overrides

[BaseEthersClient](base.BaseEthersClient.md).[constructor](base.BaseEthersClient.md#constructor)

#### Defined in

[escrow.ts:130](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L130)

## Properties

### escrowFactoryContract

• `Private` **escrowFactoryContract**: `EscrowFactory`

#### Defined in

[escrow.ts:121](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L121)

___

### gasPriceMultiplier

• `Protected` `Optional` **gasPriceMultiplier**: `number`

#### Inherited from

[BaseEthersClient](base.BaseEthersClient.md).[gasPriceMultiplier](base.BaseEthersClient.md#gaspricemultiplier)

#### Defined in

[base.ts:14](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/base.ts#L14)

___

### networkData

• **networkData**: `NetworkData`

#### Inherited from

[BaseEthersClient](base.BaseEthersClient.md).[networkData](base.BaseEthersClient.md#networkdata)

#### Defined in

[base.ts:15](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/base.ts#L15)

___

### signerOrProvider

• `Protected` **signerOrProvider**: `Signer` \| `Provider`

#### Inherited from

[BaseEthersClient](base.BaseEthersClient.md).[signerOrProvider](base.BaseEthersClient.md#signerorprovider)

#### Defined in

[base.ts:13](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/base.ts#L13)

## Methods

### abort

▸ **abort**(`escrowAddress`): `Promise`<`void`\>

This function cancels the specified escrow, sends the balance to the canceler and selfdestructs the escrow contract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

> Only Job Launcher or trusted handler can call it.

```ts
import { Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

await escrowClient.abort('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:835](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L835)

___

### addTrustedHandlers

▸ **addTrustedHandlers**(`escrowAddress`, `trustedHandlers`): `Promise`<`void`\>

This function sets the status of an escrow to completed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |
| `trustedHandlers` | `string`[] | Array of addresses of trusted handlers to add. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

> Only Job Launcher or trusted handler can call it.

```ts
import { Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

const trustedHandlers = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266']
await escrowClient.addTrustedHandlers('0x62dD51230A30401C455c8398d06F85e4EaB6309f', trustedHandlers);
```

#### Defined in

[escrow.ts:884](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L884)

___

### bulkPayOut

▸ **bulkPayOut**(`escrowAddress`, `recipients`, `amounts`, `finalResultsUrl`, `finalResultsHash`): `Promise`<`void`\>

This function pays out the amounts specified to the workers and sets the URL of the final results file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Escrow address to payout. |
| `recipients` | `string`[] | Array of recipient addresses. |
| `amounts` | `BigNumber`[] | Array of amounts the recipients will receive. |
| `finalResultsUrl` | `string` | Final results file url. |
| `finalResultsHash` | `string` | Final results file hash. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

> Only Reputation Oracle or a trusted handler can call it.

```ts
import { ethers, Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

const recipients = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
const amounts = [ethers.utils.parseUnits(5, 'ether'), ethers.utils.parseUnits(10, 'ether')];
const resultsUrl = 'http://localhost/results.json';
const resultsHash'b5dad76bf6772c0f07fd5e048f6e75a5f86ee079';

await escrowClient.bulkPayOut('0x62dD51230A30401C455c8398d06F85e4EaB6309f', recipients, amounts, resultsUrl, resultsHash);
```

#### Defined in

[escrow.ts:655](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L655)

___

### cancel

▸ **cancel**(`escrowAddress`): `Promise`<`EscrowCancel`\>

This function cancels the specified escrow and sends the balance to the canceler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow to cancel. |

#### Returns

`Promise`<`EscrowCancel`\>

Returns the escrow cancellation data including transaction hash and refunded amount. Throws error if any.

**Code example**

> Only Job Launcher or a trusted handler can call it.

```ts
import { ethers, Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

await escrowClient.cancel('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:757](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L757)

___

### complete

▸ **complete**(`escrowAddress`): `Promise`<`void`\>

This function sets the status of an escrow to completed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

> Only Recording Oracle or a trusted handler can call it.

```ts
import { Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

await escrowClient.complete('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:599](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L599)

___

### createAndSetupEscrow

▸ **createAndSetupEscrow**(`tokenAddress`, `trustedHandlers`, `jobRequesterId`, `escrowConfig`): `Promise`<`string`\>

This function creates and sets up an escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenAddress` | `string` | Token address to use for pay outs. |
| `trustedHandlers` | `string`[] | Array of addresses that can perform actions on the contract. |
| `jobRequesterId` | `string` | Job Requester Id |
| `escrowConfig` | `IEscrowConfig` | Configuration object with escrow settings. |

#### Returns

`Promise`<`string`\>

Returns the address of the escrow created.

**Code example**

```ts
import { ethers, Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

const tokenAddress = '0x0376D26246Eb35FF4F9924cF13E6C05fd0bD7Fb4';
const trustedHandlers = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
const jobRequesterId = "job-requester-id";

const escrowConfig = {
   recordingOracle: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
   reputationOracle: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
   exchangeOracle: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
   recordingOracleFee: BigNumber.from('10'),
   reputationOracleFee: BigNumber.from('10'),
   exchangeOracleFee: BigNumber.from('10'),
   manifestUrl: 'htttp://localhost/manifest.json',
   manifestHash: 'b5dad76bf6772c0f07fd5e048f6e75a5f86ee079',
};

const escrowAddress = await escrowClient.createAndSetupEscrow(tokenAddress, trustedHandlers, jobRequesterId, escrowConfig);
```

#### Defined in

[escrow.ts:427](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L427)

___

### createEscrow

▸ **createEscrow**(`tokenAddress`, `trustedHandlers`, `jobRequesterId`): `Promise`<`string`\>

This function creates an escrow contract that uses the token passed to pay oracle fees and reward workers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenAddress` | `string` | Token address to use for pay outs. |
| `trustedHandlers` | `string`[] | Array of addresses that can perform actions on the contract. |
| `jobRequesterId` | `string` | Job Requester Id |

#### Returns

`Promise`<`string`\>

Return the address of the escrow created.

**Code example**

> Need to have available stake.

```ts
import { Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

const tokenAddress = '0x0376D26246Eb35FF4F9924cF13E6C05fd0bD7Fb4';
const trustedHandlers = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
const jobRequesterId = "job-requester-id";
const escrowAddress = await escrowClient.createEscrow(tokenAddress, trustedHandlers, jobRequesterId);
```

#### Defined in

[escrow.ts:222](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L222)

___

### fund

▸ **fund**(`escrowAddress`, `amount`): `Promise`<`void`\>

This function adds funds of the chosen token to the escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow to fund. |
| `amount` | `BigNumber` | Amount to be added as funds. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

```ts
import { ethers, Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

const amount = ethers.utils.parseUnits(5, 'ether'); //convert from ETH to WEI
await escrowClient.fund('0x62dD51230A30401C455c8398d06F85e4EaB6309f', amount);
```

#### Defined in

[escrow.ts:474](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L474)

___

### gasPriceOptions

▸ `Protected` **gasPriceOptions**(): `Promise`<`Partial`<`Overrides`\>\>

Adjust the gas price, and return as an option to be passed to a transaction

#### Returns

`Promise`<`Partial`<`Overrides`\>\>

Returns the gas price options

#### Inherited from

[BaseEthersClient](base.BaseEthersClient.md).[gasPriceOptions](base.BaseEthersClient.md#gaspriceoptions)

#### Defined in

[base.ts:39](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/base.ts#L39)

___

### getBalance

▸ **getBalance**(`escrowAddress`): `Promise`<`BigNumber`\>

This function returns the balance for a specified escrow address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`BigNumber`\>

Balance of the escrow in the token used to fund it.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const balance = await escrowClient.getBalance('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:938](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L938)

___

### getEscrowContract

▸ `Private` **getEscrowContract**(`escrowAddress`): `Escrow`

Connects to the escrow contract

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Escrow address to connect to |

#### Returns

`Escrow`

#### Defined in

[escrow.ts:183](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L183)

___

### getExchangeOracleAddress

▸ **getExchangeOracleAddress**(`escrowAddress`): `Promise`<`string`\>

This function returns the exchange oracle address for a given escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Address of the Exchange Oracle.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const oracleAddress = await escrowClient.getExchangeOracleAddress('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1318](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1318)

___

### getFactoryAddress

▸ **getFactoryAddress**(`escrowAddress`): `Promise`<`string`\>

This function returns the escrow factory address for a given escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Address of the escrow factory.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const factoryAddress = await escrowClient.getFactoryAddress('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1356](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1356)

___

### getIntermediateResultsUrl

▸ **getIntermediateResultsUrl**(`escrowAddress`): `Promise`<`string`\>

This function returns the intermediate results file URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Url of the file that store results from Recording Oracle.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const intemediateResultsUrl = await escrowClient.getIntermediateResultsUrl('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1090](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1090)

___

### getJobLauncherAddress

▸ **getJobLauncherAddress**(`escrowAddress`): `Promise`<`string`\>

This function returns the job launcher address for a given escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Address of the Job Launcher.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const jobLauncherAddress = await escrowClient.getJobLauncherAddress('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1242](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1242)

___

### getManifestHash

▸ **getManifestHash**(`escrowAddress`): `Promise`<`string`\>

This function returns the manifest file hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Hash of the manifest file content.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const manifestHash = await escrowClient.getManifestHash('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:976](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L976)

___

### getManifestUrl

▸ **getManifestUrl**(`escrowAddress`): `Promise`<`string`\>

This function returns the manifest file URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Url of the manifest.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const manifestUrl = await escrowClient.getManifestUrl('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1014](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1014)

___

### getRecordingOracleAddress

▸ **getRecordingOracleAddress**(`escrowAddress`): `Promise`<`string`\>

This function returns the recording oracle address for a given escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Address of the Recording Oracle.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const oracleAddress = await escrowClient.getRecordingOracleAddress('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1204](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1204)

___

### getReputationOracleAddress

▸ **getReputationOracleAddress**(`escrowAddress`): `Promise`<`string`\>

This function returns the reputation oracle address for a given escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Address of the Reputation Oracle.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const oracleAddress = await escrowClient.getReputationOracleAddress('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1280](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1280)

___

### getResultsUrl

▸ **getResultsUrl**(`escrowAddress`): `Promise`<`string`\>

This function returns the results file URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Results file url.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const resultsUrl = await escrowClient.getResultsUrl('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1052](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1052)

___

### getStatus

▸ **getStatus**(`escrowAddress`): `Promise`<`EscrowStatus`\>

This function returns the current status of the escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`EscrowStatus`\>

Current status of the escrow.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const status = await escrowClient.getStatus('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1166](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1166)

___

### getTokenAddress

▸ **getTokenAddress**(`escrowAddress`): `Promise`<`string`\>

This function returns the token address used for funding the escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |

#### Returns

`Promise`<`string`\>

Address of the token used to fund the escrow.

**Code example**

```ts
import { providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';

const provider = new providers.JsonRpcProvider(rpcUrl);
const escrowClient = await EscrowClient.build(signer);

const tokenAddress = await escrowClient.getTokenAddress('0x62dD51230A30401C455c8398d06F85e4EaB6309f');
```

#### Defined in

[escrow.ts:1128](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L1128)

___

### setup

▸ **setup**(`escrowAddress`, `escrowConfig`): `Promise`<`void`\>

This function sets up the parameters of the escrow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow to set up. |
| `escrowConfig` | `IEscrowConfig` | Escrow configuration parameters. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

> Only Job Launcher or a trusted handler can call it.

```ts
import { Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

const escrowAddress = '0x62dD51230A30401C455c8398d06F85e4EaB6309f';
const escrowConfig = {
   recordingOracle: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
   reputationOracle: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
   exchangeOracle: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
   recordingOracleFee: BigNumber.from('10'),
   reputationOracleFee: BigNumber.from('10'),
   exchangeOracleFee: BigNumber.from('10'),
   manifestUrl: 'htttp://localhost/manifest.json',
   manifestHash: 'b5dad76bf6772c0f07fd5e048f6e75a5f86ee079',
};
await escrowClient.setup(escrowAddress, escrowConfig);
```

#### Defined in

[escrow.ts:301](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L301)

___

### storeResults

▸ **storeResults**(`escrowAddress`, `url`, `hash`): `Promise`<`void`\>

This function stores the results url and hash.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escrowAddress` | `string` | Address of the escrow. |
| `url` | `string` | Results file url. |
| `hash` | `string` | Results file hash. |

#### Returns

`Promise`<`void`\>

Returns void if successful. Throws error if any.

**Code example**

> Only Recording Oracle or a trusted handler can call it.

```ts
import { ethers, Wallet, providers } from 'ethers';
import { EscrowClient } from '@human-protocol/sdk';

const rpcUrl = 'YOUR_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY'

const provider = new providers.JsonRpcProvider(rpcUrl);
const signer = new Wallet(privateKey, provider);
const escrowClient = await EscrowClient.build(signer);

await storeResults.storeResults('0x62dD51230A30401C455c8398d06F85e4EaB6309f', 'http://localhost/results.json', 'b5dad76bf6772c0f07fd5e048f6e75a5f86ee079');
```

#### Defined in

[escrow.ts:535](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L535)

___

### build

▸ `Static` **build**(`signerOrProvider`, `gasPriceMultiplier?`): `Promise`<[`EscrowClient`](escrow.EscrowClient.md)\>

Creates an instance of EscrowClient from a Signer or Provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signerOrProvider` | `Signer` \| `Provider` | The Signer or Provider object to interact with the Ethereum network |
| `gasPriceMultiplier?` | `number` | The multiplier to apply to the gas price |

#### Returns

`Promise`<[`EscrowClient`](escrow.EscrowClient.md)\>

An instance of EscrowClient

**`Throws`**

Thrown if the provider does not exist for the provided Signer

**`Throws`**

Thrown if the network's chainId is not supported

#### Defined in

[escrow.ts:153](https://github.com/humanprotocol/human-protocol/blob/fe3befbd/packages/sdk/typescript/human-protocol-sdk/src/escrow.ts#L153)