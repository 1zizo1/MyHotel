export type Props = {
    page: number
    pages: number
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, pages, onPageChange }: Props) {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);

    }

    return (
        <div className="flex justify-center mt-6">
        <ul className="flex space-x-2">
            {pageNumbers.map((number) => (
                <li key={number}>
                    <button
                        aria-label={`Go to page ${number}`}
                        onClick={() => onPageChange(number)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${
                            page === number
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } ${
                            page === number
                                ? "scale-105"
                                : "hover:scale-105"
                        }`}
                    >
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    </div>
    )
}
