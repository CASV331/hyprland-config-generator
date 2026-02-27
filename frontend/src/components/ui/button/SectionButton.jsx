export default function SectionButton({ value, isActive, onClick, children }) {
    return (
        <div className="w-full">
            <button className={`flex items-center justify-between w-full p-4 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors duration-200 ${isActive ? "bg-gray-700" : "bg-gray-800"}`} onClick={onClick}>
                <span className="text-gray-300">{value}</span>
                <img src="arrow-down.svg" className={`size-8 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-96" : "max-h-0"}`}>
                <div className="mt-1 p-3 bg-gray-800 border border-gray-600 border-t-0 rounded-b-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}