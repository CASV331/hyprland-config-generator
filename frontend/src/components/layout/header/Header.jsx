function header() {
  return (
    <header className="header bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="header__title">HyprWeb, rice demo</h1>
      <div className="w-10 border-blue-200 border-2 rounded-full cursor-pointer">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20H12.01" stroke="oklch(88.2% 0.059 254.128)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 9C7 7.87439 7.37194 6.83566 7.99963 6C8.91184 4.78555 10.3642 4 12 4C14.7614 4 17 6.23858 17 9C17 11.4212 15.279 13.4405 12.9936 13.9013C12.4522 14.0104 12 14.4477 12 15V15V16" stroke="oklch(88.2% 0.059 254.128)" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
      </div>
    </header>
  );
}

export default header;