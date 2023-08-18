import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  describe,
  test,
  assert,
  clearStore,
  afterAll,
} from 'matchstick-as/assembly';

import { createLaunchedEvent } from './fixtures';
import { STATISTICS_ENTITY_ID } from '../../src/mapping/Escrow';
import { handleLaunched } from '../../src/mapping/EscrowFactory';

const factoryAddressString = '0x92a2eef7ff696bcef98957a0189872680600a958';
const factoryAddress = Address.fromString(factoryAddressString);
const launcherAddressString = '0x92a2eef7ff696bcef98957a0189872680600a959';
const launcherAddress = Address.fromString(launcherAddressString);
const tokenAddressString = '0xd979105297fb0eee83f7433fc09279cb5b94ffc4';
const tokenAddress = Address.fromString(tokenAddressString);
const escrow1AddressString = '0xd979105297fb0eee83f7433fc09279cb5b94ffc6';
const escrow1Address = Address.fromString(escrow1AddressString);
const escrow2AddressString = '0xd979105297fb0eee83f7433fc09279cb5b94ffc7';
const escrow2Address = Address.fromString(escrow2AddressString);

describe('EscrowFactory', () => {
  afterAll(() => {
    clearStore();
  });

  test('Should properly handle Launched event', () => {
    const data1 = createLaunchedEvent(
      factoryAddress,
      launcherAddress,
      tokenAddress,
      escrow1Address,
      BigInt.fromI32(10)
    );
    const data2 = createLaunchedEvent(
      factoryAddress,
      launcherAddress,
      tokenAddress,
      escrow2Address,
      BigInt.fromI32(11)
    );

    handleLaunched(data1);
    handleLaunched(data2);

    // Escrow 1
    assert.fieldEquals(
      'Escrow',
      escrow1AddressString,
      'address',
      escrow1AddressString
    );
    assert.fieldEquals(
      'Escrow',
      escrow1AddressString,
      'token',
      tokenAddressString
    );
    assert.fieldEquals(
      'Escrow',
      escrow1AddressString,
      'factoryAddress',
      factoryAddressString
    );
    assert.fieldEquals(
      'Escrow',
      escrow1AddressString,
      'launcher',
      launcherAddressString
    );
    assert.fieldEquals('Escrow', escrow1AddressString, 'balance', '0');
    assert.fieldEquals('Escrow', escrow1AddressString, 'amountPaid', '0');
    assert.fieldEquals(
      'Escrow',
      escrow1AddressString,
      'totalFundedAmount',
      '0'
    );
    assert.fieldEquals('Escrow', escrow1AddressString, 'status', 'Launched');
    assert.fieldEquals('Escrow', escrow1AddressString, 'count', '1');

    // Escrow 2
    assert.fieldEquals(
      'Escrow',
      escrow2AddressString,
      'address',
      escrow2AddressString
    );
    assert.fieldEquals(
      'Escrow',
      escrow2AddressString,
      'token',
      tokenAddressString
    );
    assert.fieldEquals(
      'Escrow',
      escrow2AddressString,
      'factoryAddress',
      factoryAddressString
    );
    assert.fieldEquals(
      'Escrow',
      escrow2AddressString,
      'launcher',
      launcherAddressString
    );
    assert.fieldEquals('Escrow', escrow2AddressString, 'balance', '0');
    assert.fieldEquals('Escrow', escrow2AddressString, 'amountPaid', '0');
    assert.fieldEquals(
      'Escrow',
      escrow2AddressString,
      'totalFundedAmount',
      '0'
    );
    assert.fieldEquals('Escrow', escrow2AddressString, 'status', 'Launched');
    assert.fieldEquals('Escrow', escrow2AddressString, 'count', '2');

    // Stats Entity
    assert.fieldEquals(
      'EscrowStatistics',
      STATISTICS_ENTITY_ID,
      'totalEscrowCount',
      '2'
    );

    // Leader
    assert.fieldEquals(
      'Leader',
      launcherAddressString,
      'amountJobsLaunched',
      '2'
    );
  });
});
