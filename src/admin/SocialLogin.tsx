const SocialLogin = () => {
  return (
    <div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="w-full bg-gradient-to-t from-blue-800 via-slate-400 to-purple-500 px-4 py-2 rounded-lg text-white
            "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.58 8 8 8 4.42 0 8-3.58 8-8s-3.58-8-8-8zM12 16l4-4m0 0l-4-4m4 4H8"></path>
          </svg>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
