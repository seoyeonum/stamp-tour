import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="logo">
      <img src="logo.png" alt="Logo" className="nav__logo" />
    </Link>
  );
}

export default Logo;
