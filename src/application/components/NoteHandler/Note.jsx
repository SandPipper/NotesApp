import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      editInit: false,
    };

    this.startUpdateNote = this.startUpdateNote.bind(this);
    this.finishUpdateNote = this.finishUpdateNote.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleInput = this.handleInput.bind(this);
  };

  startUpdateNote(evt) {
    if (this.state.editInit) return;
    this.setState({
      value: evt.target.textContent,
      editInit: !this.state.editInit,
    });
  };

  finishUpdateNote() {
    let { note } = this.props;
    note.message = this.state.value;
    this.props.updateNote(note);
    this.resetState();
  };

  handleInput(evt) {
    this.setState({ value: evt.target.value });
  };

  resetState() {
    this.setState({
      value: '',
      editInit: !this.state.editInit,
    });
  };

  render() {
    const { note } = this.props;
    const { value, editInit } = this.state;

    return(
      <div className='message'>
      <div className='message-content'>
        <div className='message-body' onClick={this.startUpdateNote}>
          {editInit ? <input value={value} onChange={this.handleInput}></input> : note.message}
        </div>
        <div className='message-date'>{note.timestamp.toString()}</div>
      </div>
        <div className='message-footer'>
          {editInit ? <div>
              <button onClick={this.resetState}>Cancel</button>
              <button onClick={this.finishUpdateNote}>Edit</button>
            </div> : 
            <button onClick={() => this.props.removeNote(Note)}>Remove</button>}
        </div>
      </div>
    );
  };
};