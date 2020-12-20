import PropTypes from 'prop-types';
import styles from './Modal.module.css';

function Modal({ image, onClick }) {
  return (
    <div className={styles.Overlay} onClick={onClick} data-name="overlay">
      <div className={styles.Modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}

Modal.defaultProps = {
  image: {
    alt: 'photo',
  },
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};

export default Modal;
