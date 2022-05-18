import { RankChart, Title } from '@djagger/echartsx';
import { Container } from '@mui/material';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useContext } from 'react';
import CollectionsContext from '../context';
import { CollectionHistoryRankData, useCollectionHistoryRank } from '../hooks/data';
import { useDimensionTabs } from '../hooks/useTabs';
import { withRemote } from '../hooks/withRemote';

use(CanvasRenderer);

function countNames (data: CollectionHistoryRankData[]): number {
  const set = new Set()
  data.forEach(item => set.add(item.repo_name))
  return set.size
}

export default function HistoryRankSection() {
  const { collection } = useContext(CollectionsContext);

  const { dimension, tabs } = useDimensionTabs();
  const asyncData = useCollectionHistoryRank(collection.id, dimension.key);

  return (
    <Container>
      {tabs}
      <br />
      {withRemote(
        asyncData,
        data => (
          <RankChart
            theme="dark"
            renderer="canvas"
            data={data.data}
            height={countNames(data.data) * 48 + 128}

            fields={{ name: 'repo_name', time: 'event_year', value: 'total', rank: 'rank' }}
          >
            <Title>Title</Title>
          </RankChart>
        ),
      )}
    </Container>
  );
}

