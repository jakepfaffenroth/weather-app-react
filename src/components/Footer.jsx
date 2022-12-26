const Footer = ({ isDevMode }) => {
  return (
    <footer className="text-center text-sm text-gray-700 mb-8">
      <p>Made by Jake Pfaffenroth in Bellingham, Washington</p>
      {isDevMode ? (
        <p className="text-red-500 absolute top-0 mx-auto">
          DEMO MODE -- STATIC WEATHER DATA
        </p>
      ) : (
        ""
      )}
    </footer>
  );
};

export default Footer;
