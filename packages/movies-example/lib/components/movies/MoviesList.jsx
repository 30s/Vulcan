/* 

List of movies. 
Wrapped with the "withList" and "withCurrentUser" containers.

*/

import React, { PropTypes, Component } from 'react';
import { withList, withCurrentUser, Loading } from 'meteor/nova:core';

import Movies from '../../modules/movies/collection.js';
import MoviesItem from './MoviesItem.jsx';
import MoviesNewForm from './MoviesNewForm.jsx';
import AccountsForm from '../AccountsForm.jsx';

const MoviesList = ({results, currentUser, loading, loadMore, count, totalCount}) => 
  
  <div style={{maxWidth: '500px', margin: 'auto'}}>

    {/* user accounts */}

    <AccountsForm />

    {loading ? 

      <Loading /> :

      <div className="movies">
        
        {/* new document form */}

        <MoviesNewForm />

        {/* documents list */}

        {results.map(movie => <MoviesItem key={movie._id} movie={movie} currentUser={currentUser} />)}
        
        {/* load more */}

        {totalCount > results.length ?
          <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
          <p>No more items.</p>
        }

      </div>
    }

  </div>

const options = {
  collection: Movies,
  fragmentName: 'MoviesItemFragment',
};

export default withList(options)(withCurrentUser(MoviesList))