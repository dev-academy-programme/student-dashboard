interface Props {
  title: string
}

function Layout({ title }: Props) {
  return (
    <html>
      <header>
        <title>{title}</title>
        <link rel="stylesheet" href="/styles/output.css" />
        <script
          src="https://unpkg.com/htmx.org@1.9.4"
          integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV"
          crossOrigin="anonymous"
        ></script>
      </header>
      <body hx-boost="true">
        <div className="bg-slate-900 text-slate-50 min-h-screen min-w-fit">
          <slot />
        </div>
      </body>
    </html>
  )
}

export default Layout
