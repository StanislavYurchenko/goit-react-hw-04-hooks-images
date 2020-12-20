import { useReducer, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from './App.module.css';
import CustomLoader from '../CustomLoader/CustomLoader';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import pixabayApiRequest from '../../utils/pixabayApi/pixabayApI';

const initialState = {
  userQuery: '',
  images: [],
  page: 1,
  isLoading: false,
  image: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setImage':
      return { ...state, image: action.payload };
    case 'setIsLoading':
      return { ...state, isLoading: action.payload };
    case 'addImages':
      return { ...state, images: [...state.images, ...action.payload] };
    case 'addPage':
      return { ...state, page: state.page + action.payload };
    case 'formSubmit':
      return { ...state, page: 1, images: [], userQuery: action.payload };

    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userQuery, images, page, isLoading, image } = state;

  useEffect(() => {
    const request = () => {
      dispatch({ type: 'setIsLoading', payload: true });

      pixabayApiRequest(userQuery, page)
        .then(newImages => dispatch({ type: 'addImages', payload: newImages }))
        .finally(dispatch({ type: 'setIsLoading', payload: false }));
    };

    request(userQuery);
  }, [userQuery, page]);

  useEffect(() => {
    scrollToButton();
  }, [images]);

  useEffect(() => {
    const closeModal = event => {
      if (event.code === 'Escape') {
        window.removeEventListener('keydown', closeModal);
        dispatch({ type: 'setImage', payload: null });
      }
    };

    image && window.addEventListener('keydown', closeModal);
  }, [image]);

  const onLoadMore = () => {
    dispatch({ type: 'addPage', payload: 1 });
  };

  const searchFormSubmit = searchInput => {
    dispatch({ type: 'formSubmit', payload: searchInput });
  };

  const scrollToButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = event => {
    const { name, id } = event.target.dataset;

    const image = images.find(image => Number.parseInt(id) === image.id);

    if (name === 'image') dispatch({ type: 'setImage', payload: image });
    if (name === 'overlay') dispatch({ type: 'setImage', payload: null });
  };

  return (
    <div className={styles.App}>
      <Searchbar searchFormSubmit={searchFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {isLoading && <CustomLoader />}
      {images.length > 0 && !isLoading && <Button onClick={onLoadMore} />}
      {images.length === 0 && !isLoading && <div>Nothing found</div>}
      {image && <Modal image={image} onClick={toggleModal} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
