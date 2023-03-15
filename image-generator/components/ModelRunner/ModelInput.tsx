
export default function ModelInput() {
  return (
    <div>
      <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="company-website" className="block text-sm font-medium leading-6 text-gray-900">
              Website
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                http://
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="www.example.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}