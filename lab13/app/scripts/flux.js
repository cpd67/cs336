import $ from 'jquery';
import { createStore } from 'redux';

import { API_URL, POLL_INTERVAL } from './global';

let StoreTools = {
    // TODO - Useful utility functions for the state representation
}

let ActionTools = {
  loadingComments: function() {
    return {
      type: 'LOADING_COMMENTS'
    };
  },

  loadedComments: function(comments) {
    return {
      type: 'LOADED_COMMENTS',
      comments: comments
    };
  },

  addComment: function(comment) {
    return {
      type: 'ADD_COMMENT',
      comment: comment
    };
  },

  editComment: function(id, comment) {
    return {
      type: 'EDIT_COMMENT',
      id: id,
      comment: comment
    };
  },

  deleteComment: function(id, comment) {
    return {
      type: 'DELETE_COMMENT',
      id: id,
      comment: comment
    };
  }
}

let Reducers = {
  loadingComments: function() {
    $.ajax({
      url: API_URL,
      dataType: 'json',
      cache: false,
    })
      .done(function(result) {
        store.dispatch(ActionTools.loadedComments(result));
      }.bind(this))
       .fail(function(xhr, status, errorThrown) {
         console.error(this.props.url, status, errorThrown.toString());
       }.bind(this));
  },

  addComment: function(action) {
    $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: action.comment,
    })
      .done(function(result){
        // Do nothing; the comment is optimistially displayed
        // already and will refresh on the next poll.
      }.bind(this))
       .fail(function(xhr, status, errorThrown) {
         console.error(API_URL, status, errorThrown.toString());
      }.bind(this));
    },

  editComment: function(action) {
    $.ajax({
      url: API_URL + "/" + action.id,
      dataType: 'json',
      type: 'PUT',
      data: action.comment
    })
      .done(function(comments){
        // Do nothing; the comment is optimistially displayed
        // already and will refresh on the next poll.
      }.bind(this))
       .fail(function(xhr, status, errorThrown) {
         console.error(API_URL, status, errorThrown.toString());
      }.bind(this));
    },

    deleteComment: function(action) {
      $.ajax({
        url: API_URL + "/" + this.props.params.id,
        type: 'DELETE',
        contentType:'application/json',
      })
        .done(function(comments){
          //Do nothing
        }.bind(this))
        .fail(function(xhr, status, errorThrown) {
          console.error(API_URL, status, errorThrown.toString());
        }.bind(this));
    }
}

function commentsApp(state, action) {
  switch (action.type) {
    case 'LOADING_COMMENTS':
      Reducers.loadedComments();
      return state;
    case 'LOADED_COMMENTS':
      return { data: action.comments};
    case 'ADD_COMMENT':
      Reducers.addComment(action);
      return state;
    case 'EDIT_COMMENT':
      Reducers.editComment(action);
      return state;
    case 'DELETE_COMMENT':
      Reducers.deleteComment(action);
      return state;
    default:
      return state;
  }
}

let defaultState = {
  data: []
};

let store = createStore(commentsApp, defaultState);

module.exports = { StoreTools, ActionTools, store }
