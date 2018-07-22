import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import isFunction from 'lodash/isFunction';

const getGraphColorFromProps = ({ graphColor }) => graphColor;
const AbsoluteContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index:0;
  .ct-series-a .ct-area{
    fill: ${getGraphColorFromProps};
  }
  .ct-series-a .ct-line {
    stroke: ${getGraphColorFromProps};
  }
  
`;


const BackgroundChart = (props) => {
  const {
    current,
    last,
    graph,
    graphColor,
  } = props;
  if (!graph) {
    return null;
  }
  const graphColorValue = isFunction(graphColor) ? graphColor({ current, last }) : graphColor;
  const data = graph && graph({ current, last });
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
    <AbsoluteContainer graphColor={graphColorValue}>
      <ChartistGraph data={series} type="Line" options={options} style={{ height: '100%' }} />
    </AbsoluteContainer>);
};


export default BackgroundChart;

BackgroundChart.propTypes = {
  graph: PropTypes.func,
  graphColor: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.string,
  ]),
  current: PropTypes.any,
  last: PropTypes.any,
};
BackgroundChart.defaultProps = {
  graphColor: 'rgba(0,0,0,0.3)',
};