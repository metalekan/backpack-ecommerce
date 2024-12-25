// import { HiSearch, HiSearchCircle } from "react-icons/hi";
// import { GiSaucepan } from "react-icons/gi";
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 lg:p-8">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 text-purple-900 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-purple-700 rounded-full">
          {/* <GiSaucepan className="animate-spin" /> */}
        </div>
      </div>
    </div>
  );
};

export default Loader;
