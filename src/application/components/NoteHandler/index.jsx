import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Note from './Note.jsx';
import { addNoteAction, removeNoteAction, updateNoteAction } from '../../services/Notes/aids/actions';


class MessageContainer extends Component {
    static propTypes = {
      messages: PropTypes.array.isRequired,
      addMessageAction: PropTypes.func.isReqired,
      removeMessageAction: PropTypes.func.isRequired,
      updateMessageAction: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.renderMessage = this.renderMessage.bind(this);
    };

    renderMessage() {
        const { notes } = this.props;
        return (
          notes.map(note => 
            <Note 
              note={note} 
              key={note.id} 
              removeNote={this.props.removeNoteAction} 
              updateNote={this.props.updateNoteAction}
              handleInput={this.handleInput}
            />
          )
        );
    };

    render() {
        const { notes } = this.props;
        return(
          <div id='messages-container'>
            {notes.length > 0 ? this.renderMessage() : null}
          </div>
        )
    }

}

const mapStateToProps = (state) => ({
  notes: state.notes
});

const mapDispatchToProps = {
  addNoteAction,
  removeNoteAction,
  updateNoteAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageContainer);