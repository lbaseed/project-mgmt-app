import logo from "./assets/logo.png"

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-8">
      <div className="continer">
        <a href="/" className="navbar-brand">
          <div className="d-flex">
            <img src={logo} className="mr-2" alt="Project MGMT Logo" />
            <div>ProjectMGMT App</div>
          </div>
        </a>
      </div>
    </nav>
  )
}
