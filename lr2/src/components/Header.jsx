function Header({ title, userName }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {userName && (
        <span className="user-badge">Привет, {userName}</span>
      )}
    </header>
  )
}

export default Header
