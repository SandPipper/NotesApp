import React, { Component } from 'react';
import CategorieContainer from '../components/CategorieHandler';
import NoteForm from '../components/NoteHandler/NoteForm.jsx'
import Header from '../components/Header.jsx';

export default class Root extends Component {
  render() {
    return <div className='main-content'>
              <Header />
              <NoteForm />
              <CategorieContainer />
        </div>;
  }
}
