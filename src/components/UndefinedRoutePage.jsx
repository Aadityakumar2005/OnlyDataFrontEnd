import { Link, useNavigate } from "react-router-dom";

const UndefinedRoutePage = () => {

  const navigate = useNavigate();

  const handleClick = () =>{
      navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        onClick={handleClick}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 focus:ring-4 focus:ring-blue-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default UndefinedRoutePage;