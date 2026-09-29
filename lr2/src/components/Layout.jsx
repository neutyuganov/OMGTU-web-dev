function Layout({ siteTitle, children }) {
  return (
    <div className="layout" aria-label={`Макет сайта: ${siteTitle}`}>
      {children}
    </div>
  )
}

export default Layout
