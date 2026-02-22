export default function SectionButton({ value, isActive, onClick }) {
    return (
        <button className={`flex items-center justify-between w-full p-4 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors duration-200 ${isActive ? "bg-gray-700" : "bg-gray-800"}`} onClick={onClick}>
            <span className="text-gray-300">{value}</span>
            <img src="arrow-down.svg" className="size-8" />
        </button>

    )
}