import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Searchbar.module.css';

function Searchbar({ searchFormSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const onChange = event => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const formReset = () => {
    setSearchInput('');
  };

  const onSubmit = event => {
    event.preventDefault();

    const normalizedSearchInput = searchInput.trim();
    if (normalizedSearchInput === '') {
      toast.error('Enter query');
      return;
    }
    searchFormSubmit(normalizedSearchInput);
    formReset();
  };

  return (
    <header className={styles['Searchbar']}>
      <form className={styles['SearchForm']} onSubmit={onSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          name="searchInput"
          value={searchInput}
          onChange={onChange}
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  searchFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
