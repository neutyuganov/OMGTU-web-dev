import styles from './Header.module.css';
import Nav from '../Nav/Nav';

function Header({ articleCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>React Blog</h1>
          <span className={styles.counter}>{articleCount} статей</span>
        </div>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
