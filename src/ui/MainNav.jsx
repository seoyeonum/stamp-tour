import { Link } from 'react-router-dom';

function MainNav() {
  return (
    <ul className="nav__links">
      <li className="nav__item">
        <Link className="nav__link" to="/about">
          ABOUT
        </Link>
      </li>
      <li className="nav__item">
        <Link className="nav__link" to="/plans">
          PLANS
        </Link>
      </li>
      <li className="nav__item">
        <Link className="nav__link" to="/tours">
          TOURS
        </Link>
      </li>
    </ul>
  );
}

export default MainNav;
