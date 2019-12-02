import React, { Component } from 'react';
import MainTable from '../components/organisms/MainTable';


class MainTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      naming: '',
    };

    this.inputAct = this.inputAct.bind(this);
  }

  inputAct(e, i) {
    console.log(e);
    console.log(i);
    // eslint-disable-next-line no-unused-vars
    const { naming } = this.state;
    this.setState({ naming: e });
  }

  render() {
    return (
      <MainTable actionInput={this.inputAct} />
    );
  }
}

export default MainTableContainer;
