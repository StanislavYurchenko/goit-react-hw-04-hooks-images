import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, src, alt, onClick }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={styles.image}
        data-id={id}
        data-name="image"
      />
    </li>
  );
}
ImageGalleryItem.defaultProps = {
  alt: 'photo',
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
