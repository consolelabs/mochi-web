export default function Input({ value, setValue }: any) {
  return (
    <div className="flex overflow-hidden flex-col rounded-lg border border-gray-200">
      <div className="flex flex-col items-center py-2">
        <input
          className="text-2xl text-center outline-none"
          value={value ? `$${value} USD` : ''}
          onChange={(e) => setValue(e.target.value.replaceAll(/\D*/g, ''))}
          placeholder="$0 USD"
        />
        <span className="mt-1 text-xs font-normal text-gray-400 font-text">
          ~0.0000 ETH
        </span>
      </div>
      <div className="flex mt-1 border-t border-gray-200">
        {['$1', '$2', '$5'].map((b) => {
          return (
            <button
              key={b}
              type="button"
              onClick={() => setValue(b.replaceAll(/\D*/g, ''))}
              className="flex-1 py-1 px-4 text-sm border-r border-gray-200 hover:bg-gray-100 font-text"
            >
              {b}
            </button>
          )
        })}
      </div>
    </div>
  )
}
