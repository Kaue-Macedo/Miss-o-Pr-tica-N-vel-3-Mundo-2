import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">Home</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/LivroLista">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/LivroDados">Novo</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;