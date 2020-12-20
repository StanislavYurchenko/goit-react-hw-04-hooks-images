import Loader from 'react-loader-spinner';
import styles from './CustomLoader.module.css';

function CustomLoader() {
  return (
    <Loader
      type="ThreeDots"
      color="#00BFFF"
      height={100}
      width={100}
      className={styles.Loader}
    />
  );
}

export default CustomLoader;
