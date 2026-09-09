import styles from './App.module.css';
import Header from './components/Header/Header';
import ArticleList from './components/ArticleList/ArticleList';
import articles from './data/articles';

function App() {
  return (
    <div className={styles.app}>
      <Header articleCount={articles.length} />
      <main>
        <ArticleList />
      </main>
    </div>
  );
}

export default App;
