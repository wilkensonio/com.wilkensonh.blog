import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white/5 py-2">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          © {currentYear} Kadeeno Pulse. All rights reserved.
        </p>
        <p className="home__subscribe-text px-5">
          By subscribing to this newsletter you agree to the{" "}
          <Link to="/privacy-policy" className="home__privacy-policy-link">
            Privacy Policy
          </Link>
          and{" "}
          <Link to="/term-of-use" className="home__term-of-use-link">
            Term of use
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
