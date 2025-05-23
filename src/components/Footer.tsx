function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white/5 py-12">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          © {currentYear} Kadeeno Pulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
