function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          © 2024 Rick and Morty Wiki | Data from{' '}
          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300"
          >
            The Rick and Morty API
          </a>
        </p>
        <p className="text-gray-500 text-sm mt-2">
          SE 3355 - Web Programming Midterm Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;