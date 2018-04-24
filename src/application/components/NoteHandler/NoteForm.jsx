import React, { Component } from 'react';

export default class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.addNote = this.addNote.bind(this);
    };

    handleInput(evt) {
        this.setState({ value: evt.target.value });
      };

    addNote(evt) {
        evt.preventDefault();
        const { value } = this.state;
        if (value.length > 0) {
          this.props.addMessageToStore(value);
          this.setState({
              value: '',
          });
        }
    };

    render() {
        const { value } = this.state;
        return(
            <div id='message-form'>
                <form>
                    <input type='text' value={value} onChange={this.handleInput} placeholder='Write your note'/>
                    <button onClick={this.addMessage}>Submit</button>
                </form>
            </div>
        )
    }

}