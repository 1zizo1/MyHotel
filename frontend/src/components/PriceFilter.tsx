type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-bold text-gray-700 mb-3">Max Price</h4>
      <select
        className="p-3 border border-gray-300 rounded-lg w-full text-gray-600 hover:border-blue-400 transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option key={price} value={price}>
            ${price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
