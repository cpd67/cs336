/** Copied over from the Facebook tutorial, as for some reason my old one
    was not working correctly.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import { Router, Route, Redirect, browserHistory } from 'react-router';

import '../css/base.css';

import CommentBox from './CommentBox.js';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={CommentBox}/>
  </Router>
), document.getElementById('content'));
