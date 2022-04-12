import { TEAM } from "~constants/team";

export const Team = () => (
  <div className="mr-12 border-gradient lg:mr-0">
    <div className="bg-white border-gradient-entry" />
    <div className="relative p-9 lg:p-12">
      <h3 className="mb-6 text-2xl font-bold text-center">
        <span className="text-transparent uppercase bg-clip-text bg-gradient-to-r from-mochi-300 to-mochi-600">
          Our Builders
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((ppl) => (
          <div key={ppl.name}>
            <img
              src={ppl.image}
              alt={ppl.name}
              className="block w-16 h-16 mx-auto mb-4 rounded-xl"
            />
            <div className="font-medium text-center truncate text-mochi-600">
              {ppl.name}
            </div>
            <p className="text-sm text-center text-gray-500 truncate">
              {ppl.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
