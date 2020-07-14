import React from 'react';

export default () => {
  return (
    <footer className="footer">
      <div className="container">
        <nav>
          <ul>
            <li>
              <a href="/">Caravan Team</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          &copy;
          {new Date().getFullYear()}, Designed by
          <a style={{ color: "#2CA8FF" }} href="/">CaravanTeam</a>. Coded by
          <a style={{ color: "#2CA8FF" }} href="/">Mand</a>.
        </div>
      </div>
    </footer>
  );
};
