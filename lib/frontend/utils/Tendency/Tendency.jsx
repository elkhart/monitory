import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import { ThemeConsumer } from './../Theme';
import SubContainer from './styled/SubContainer';
import StyledArrow from './styled/StyledArrow';


class Tendency extends Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0, last: 0 };
  }

  static defaultRotation(viewValue, last) {
    return viewValue - last > 0 ? '-45deg' : '45deg';
  }

  componentWillReceiveProps() {
    this.setState(({ last }, { viewValue, current, withTendency }) => {
      const isTendencyCalculationProvided = isFunction(withTendency);
      return {
        rotation: isTendencyCalculationProvided ?
          withTendency(current, last) : Tendency.defaultRotation(viewValue, last),
        last: isTendencyCalculationProvided ? current : viewValue,

      };
    });
  }

  render() {
    const { withTendency } = this.props;
    if (!withTendency) {
      return null;
    }
    return (
      <ThemeConsumer>
        {theme => (
          <SubContainer>
            <StyledArrow rotation={this.state.rotation} color={theme.fontColor} />
          </SubContainer>
        )}
      </ThemeConsumer>);
  }
}

export default Tendency;