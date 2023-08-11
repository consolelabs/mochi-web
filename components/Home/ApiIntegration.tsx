export default function ApiIntegration() {
  return (
    <section className="bg-[#26272B] py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/5 justify-center items-start flex flex-col">
            <h2 className="font-medium text-4xl sm:text-5xl mb-4 sm:mb-6 text-[#D1D3D6] font-heading tracking-[-0.5px]">
              A fully integrated suite of{' '}
              <span className="text-[#5CD97D] font-normal">APIs</span>
            </h2>
            <div>
              <a
                target="blank"
                href="https://docs.mochi.gg"
                className="inline-flex rounded-full overflow-hidden bg-white px-4 py-[10px] font-normal hover:bg-gray-200 transition-all duration-300 ease-in-out mr-auto"
              >
                Read the docs
              </a>
            </div>
          </div>
          <div>
            <img
              src="/home/api.png"
              alt="api integration"
              className="w-full flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
