import React from 'react';
import last from 'lodash/last';
import { ThemeProvider, themes, Card, Dashboard, List } from './../../frontend';

export default function () {
  return (
    <ThemeProvider value={themes.dark}>
      <Dashboard cols={6} title="MEIN Dashboard">
        <List job="teamcity" title="Failed Teamcity Jobs" rows={1} cols={2} />
        <Card
          job="example3"
          title="Fooo"
          withTendency={(current, last) => `${0.5 * Math.PI * (last - current) / (last + current)}rad`}
        />
        <Card
          job="series1"
          title="Fooo"
          value={(current = []) => last(current)}
          graph={(current = []) => current}
          cols={3}
          withTendency
        />
      </Dashboard>
      <Dashboard cols={6} title="MEIN zweites Dashboard">
        <Card job="example1" title="Fooo" value={(current = {}) => current.randomNumber} />
        <Card job="example2" title="Fooo" value={(current = {}) => current.randomNumber} />
      </Dashboard>
    </ThemeProvider>
  );
}
