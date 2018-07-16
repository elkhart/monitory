import React, { Component } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import isFunction from 'lodash/isFunction';
import { compose } from 'redux';
import withSubscription from '../hoc/withSubscription';
import withSingleViewValue from '../hoc/withSingleViewValue';
import withColor from '../hoc/withColor';
import withShowWhen from '../hoc/withShowWhen';
import UpdatedAt from '../styled/UpdatedAt';
import Title from '../styled/Title';
import StyledCard from '../styled/StyledCard';


const FailedBuildSteps = styled.ul`
  font-size:1rem;
`;


class List extends Component {
  static formatDate(date) {
    if (!date) {
      return '';
    }
    return format(date, 'HH:mm');
  }

  render() {
    const {
      alert,
      current,
      last,
      backgroundColor,
      fontColorLight,
      fontColor,
      viewValue = [],
      lastUpdated,
      cols,
      rows,
    } = this.props;

    const isAlert = isFunction(alert) ? alert({ current, last }) : alert;
    return (
      <StyledCard style={{ backgroundColor, color: fontColor }} alert={isAlert} cols={cols} rows={rows}>
        <Title style={{ color: fontColorLight }}>{this.props.title}</Title>
        <FailedBuildSteps>
          {viewValue.map(step => <li key={step}>{step}</li>)}
        </FailedBuildSteps>
        <UpdatedAt style={{ color: fontColorLight }}>
            Last updated at: {List.formatDate(lastUpdated)}
        </UpdatedAt>
      </StyledCard>);
  }
}


export default compose(
  withSubscription,
  withSingleViewValue,
  withColor,
  withShowWhen,
)(List);

