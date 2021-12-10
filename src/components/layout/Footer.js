
import logo from '../Files/blackLogo.png'; // with import

function Footer(){
    return (
        
<div className="container" >
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      <img src={logo} className="bi me-2" width="70" aria-label="Bootstrap"></img>
      </a>
      <span className="text-muted">&copy; 2021 Company, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a href="https://www.facebook.com/daniel.ilchev2000"><i className="fab fa-facebook fa-2x"></i></a></li>
      <li className="ms-3"><a href="https://twitter.com/DanielIlchev_47"><i className="fab fa-twitter fa-2x"></i></a></li>
      <li className="ms-3"><a href="https://www.instagram.com/daniel_ilchev/"><i className="fab fa-instagram fa-2x"></i></a></li>
    </ul>
  </footer>
</div>
    );
}
export default Footer;