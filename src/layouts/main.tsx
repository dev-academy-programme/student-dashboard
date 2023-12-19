interface Props {
  title: string
  children: React.ReactNode
}

function Layout({ title, children }: Props) {
  return (
    <html>
      <header>
        <title>{title}</title>
        <link rel="stylesheet" href="/output.css" />
        <script
          src="https://unpkg.com/htmx.org@1.9.4"
          integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV"
          crossOrigin="anonymous"
        ></script>
      </header>
      <body hx-boost="true" className="text-slate-100">
        <div className="bg-slate-900 min-h-screen min-w-fit">{children}</div>
      </body>
    </html>
  )
}

export default Layout
