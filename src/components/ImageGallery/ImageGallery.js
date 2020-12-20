import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

function ImageGallery({ images, toggleModal }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
