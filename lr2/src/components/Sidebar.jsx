function Sidebar({ items }) {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
