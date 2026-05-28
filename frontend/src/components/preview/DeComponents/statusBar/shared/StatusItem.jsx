export function StatusItem({ children }) {
    return (
        <div
            className="
            flex
            items-center
            gap-1
            px-2
            py-1
            rounded-md
            transition-colors
            "
        >
            {children}
        </div>
    )
}