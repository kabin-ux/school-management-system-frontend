
const RequestDemo = () => {
    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-5xl mx-auto bg-[#F3F0FF] rounded-[50px] p-8 md:p-16 border-8 border-white shadow-xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#2D3142] mb-4">Request A Demo Video</h2>
                    <p className="text-gray-500 text-sm max-w-lg mx-auto">
                        Select a convenient date and time to schedule a personalized walkthrough with our product experts and explore our digital ecosystem.
                    </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    {/* School Name */}
                    <div className="relative border border-gray-400 rounded-xl p-2 px-4 focus-within:border-[#5D3FD3]">
                        <label className="absolute -top-3 left-4 bg-[#F3F0FF] px-2 text-sm text-gray-600 font-medium">School name</label>
                        <input
                            type="text"
                            placeholder="ABCXYZ Secondary Boarding School"
                            className="w-full bg-transparent outline-none py-2 text-sm text-gray-700 placeholder:text-gray-300"
                        />
                    </div>

                    {/* Location */}
                    <div className="relative border border-gray-400 rounded-xl p-2 px-4 focus-within:border-[#5D3FD3]">
                        <label className="absolute -top-3 left-4 bg-[#F3F0FF] px-2 text-sm text-gray-600 font-medium">Location</label>
                        <input
                            type="text"
                            placeholder="Enter the location of the school"
                            className="w-full bg-transparent outline-none py-2 text-sm text-gray-700 placeholder:text-gray-300"
                        />
                    </div>

                    {/* Select Date */}
                    <div className="relative border border-gray-400 rounded-xl p-2 px-4 focus-within:border-[#5D3FD3]">
                        <label className="absolute -top-3 left-4 bg-[#F3F0FF] px-2 text-sm text-gray-600 font-medium">Select Date</label>
                        <input
                            type="text"
                            placeholder="YYYY - MM - DD"
                            className="w-full bg-transparent outline-none py-2 text-sm text-gray-700 placeholder:text-gray-300"
                        />
                    </div>

                    {/* Time and AM/PM Group */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 relative border border-gray-400 rounded-xl p-2 px-4 focus-within:border-[#5D3FD3]">
                            <label className="absolute -top-3 left-4 bg-[#F3F0FF] px-2 text-sm text-gray-600 font-medium">Time</label>
                            <input
                                type="text"
                                placeholder="00 : 00"
                                className="w-full bg-transparent outline-none py-2 text-sm text-gray-700 placeholder:text-gray-300"
                            />
                        </div>
                        <div className="relative border border-gray-400 rounded-xl p-2 px-4 focus-within:border-[#5D3FD3]">
                            <label className="absolute -top-3 left-2 bg-[#F3F0FF] px-2 text-[10px] text-gray-600 font-medium uppercase">Am-Pm</label>
                            <select className="w-full bg-transparent outline-none py-2 text-sm text-gray-700 appearance-none">
                                <option>AM</option>
                                <option>PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Email - Full Width */}
                    <div className="md:col-span-2 relative border border-gray-400 rounded-xl p-2 px-4 focus-within:border-[#5D3FD3]">
                        <label className="absolute -top-3 left-4 bg-[#F3F0FF] px-2 text-sm text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="adamjoe987@gmail.com"
                            className="w-full bg-transparent outline-none py-2 text-sm text-gray-700 placeholder:text-gray-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#5D3FD3] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#4b32b1] transition-colors tracking-widest uppercase text-sm"
                        >
                            Request A Demo
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RequestDemo;