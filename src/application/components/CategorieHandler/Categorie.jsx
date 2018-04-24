import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NoteContainer from '../NoteHandler';

export default class Categorie extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    notes: PropTypes.array.isRequired,
    addCategorie: PropTypes.func.isRequired,
    removeCategorie: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      editInit: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.startUpdateMessage = this.startUpdateMessage.bind(this);
    this.resetState = this.resetState.bind(this);
    this.addCategorie = this.props.addCategorie.bind(this);
    //this.removeCategorie = this.props.removeCategorie.bind(this);

  };

  handleInput(evt) {
    this.setState({ value: evt.target.value });
  };

  startUpdateMessage(evt) {
    if (this.state.editInit) return;
    this.setState({
      value: evt.target.textContent,
      editInit: !this.state.editInit,
    });
  };

  resetState() {
    this.setState({
      value: '',
      editInit: !this.state.editInit,
    });
  };

  render() {
    const { title, notes } = this.props;
    const { editInit } = this.state;
    console.log('test', title);
    return(
      <div className='message'>
      <div className='message-content'>
        <div className='categorie-head' onClick={this.startUpdateMessage}>
        <button className='close-button' onClick={() => this.props.removeCategorie(title)}>X</button>
          {editInit ? <input value={value} onChange={this.handleInput}></input> : title }
        </div>
      </div>
      <div className='categorie-body'>
        <NoteContainer />
      </div>
        <div className='message-footer'>
          {editInit ? <div>
              <button onClick={this.resetState}>Cancel</button>
              <button onClick={this.finishUpdateMessage}>Edit</button>
            </div> : null
            }
        </div>
      </div>
    );
  };

};