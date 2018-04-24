import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export default class Header extends Component {
  render(){
    return(
      <header id='header'>
      <div>Notes</div>
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/notes'>Notes</Link></li>
        </ul>
      </header>
    )
  }
}