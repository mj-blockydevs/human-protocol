import { Grid } from '@mui/material';
import * as React from 'react';
import { CardTextBlock } from 'src/components/Cards';
import useHMTData from 'src/hooks/useHMTData';
import { useTokenStats, useTotalSupply } from 'src/state/token/hooks';

export const TokenView: React.FC = (): React.ReactElement => {
  const data = useHMTData();
  const tokenStats = useTokenStats();
  const totalSupply = Number(useTotalSupply());

  return (
    <Grid container spacing={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}>
      <Grid item xs={12} sm={4}>
        <CardTextBlock
          title="Price"
          value={data?.currentPriceInUSD}
          format="$0,0.00"
          changes={data?.priceChangePercentage24h}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardTextBlock
          title="Amount of transfers"
          value={tokenStats.totalTransferEventCount}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardTextBlock title="Holders" value={tokenStats.holders} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardTextBlock
          title="Circulating Supply"
          value={data?.circulatingSupply}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardTextBlock
          title="Total Supply"
          value={totalSupply}
          format={
            totalSupply >= Number('1e+18')
              ? '0,0e+0'
              : totalSupply >= Number('1e+9')
              ? '0a'
              : '0,0'
          }
        />
      </Grid>
    </Grid>
  );
};
