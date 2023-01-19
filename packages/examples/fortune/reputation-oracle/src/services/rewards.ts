import Web3 from 'web3';

export interface FortuneEntry {
  worker: string;
  fortune: string;
}

export interface ReputationEntry {
  workerAddress: string;
  reputation: number;
}

export function filterAddressesToReward(
  web3: Web3,
  addressFortunesEntries: FortuneEntry[]
) {
  const filteredResults: FortuneEntry[] = [];
  const reputationValues: ReputationEntry[] = [];
  const tmpHashMap: Record<string, boolean> = {};

  addressFortunesEntries.forEach((fortuneEntry) => {
    const { worker, fortune } = fortuneEntry;
    if (tmpHashMap[fortune]) {
      reputationValues.push({ workerAddress: worker, reputation: -1 });
      return;
    }

    tmpHashMap[fortune] = true;
    filteredResults.push(fortuneEntry);
    reputationValues.push({ workerAddress: worker, reputation: 1 });
  });
  const workerAddresses = filteredResults
    .map((fortune: { worker: string }) => fortune.worker)
    .map(web3.utils.toChecksumAddress);
  return { workerAddresses, reputationValues };
}
