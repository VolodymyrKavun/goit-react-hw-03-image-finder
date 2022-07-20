import React, { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import {
  SearchbarSt,
  SearchFormSt,
  SearchFormButtonSt,
  SearchFormInputSt,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query === '') {
      alert('Ведіт щось в пошук.');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <SearchbarSt>
          <SearchFormSt onSubmit={this.handleSubmit}>
            <SearchFormButtonSt type="submit">
              <FiSearch size="16px" />
            </SearchFormButtonSt>

            <SearchFormInputSt
              type="text"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
              onChange={this.handleInput}
            />
          </SearchFormSt>
        </SearchbarSt>
      </>
    );
  }
}

export default Searchbar;
