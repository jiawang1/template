import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

class ExamplePage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'example/getName' });
  }
  render() {
    return <span>Hello {this.props.name} </span>;
  }
}

ExamplePage.propTypes = {
  name: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(({ example: { name } }) => ({ name }))(ExamplePage);
