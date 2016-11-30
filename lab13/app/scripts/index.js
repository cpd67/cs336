/** Copied over from the Facebook tutorial, as for some reason my old one
    was not working correctly.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Redirect, browserHistory } from 'react-router';

import CommentBox from './CommentBox.js';
import CommentEdit from './commentEdit.js';

import '../css/base.css';

import { StoreTools } from './flux';

StoreTools.startLoadingComments();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={CommentBox}/>
    <Route path="/:id" component={CommentEdit}/>
  </Router>
), document.getElementById('content'));
