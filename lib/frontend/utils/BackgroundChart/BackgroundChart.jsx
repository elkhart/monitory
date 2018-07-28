import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import isFunction from 'lodash/isFunction';
import { ThemeConsumer } from './../Theme';
import AbsoluteContainer from './styled/AbsoluteContainer';


const BackgroundChart = (props) => {
  const {
    current,
    graph,
    graphColor,
  } = props;
  if (!graph) {
    return null;
  }
  const graphColorValue = isFunction(graphColor) ? graphColor(current) : graphColor;
  const data = graph && graph(current);
  const series = {
    series: [data],

  };
  const options = {
    fullWidth: true,
    showArea: true,
    showPoint: false,
    lineSmooth: false,
    axisX: {
      offset: 0,
      showLabel: false,
      showGrid: false,
    },
    axisY: {
      offset: 0,
      showLabel: false,
      showGrid: false,
    },
  };
  return (
    <ThemeConsumer>
      {theme => (
        <AbsoluteContainer graphColor={graphColorValue || theme.graphColor}>
          <ChartistGraph data={series} type="Line" options={options} style={{ height: '100%' }} />
        </AbsoluteContainer>)}
    </ThemeConsumer>);
};


export default BackgroundChart;

BackgroundChart.propTypes = {
  graph: PropTypes.func,
  graphColor: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.string,
  ]),
  current: PropTypes.any,
};
BackgroundChart.defaultProps = {
};