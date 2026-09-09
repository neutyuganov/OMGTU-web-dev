import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>React Blog</h1>
        <nav className={styles.nav}>
          <a href="#" className={styles.link}>Главная</a>
          <a href="#" className={styles.link}>Статьи</a>
          <a href="#" className={styles.link}>О нас</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
