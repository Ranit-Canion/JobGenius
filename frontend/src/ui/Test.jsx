function Test() {
  const education = [
    {
      degree: "Bachelors in Fine Arts",
      college: "Modern College",
      start: "2012",
      end: "2014",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      icon: "M",
    },
    {
      degree: "Computer Science",
      college: "Harvard University",
      start: "2008",
      end: "2012",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      icon: "H",
    },
  ];

  return (
    <div className="relative border-l-2 border-red-200 ml-5">
      {education.map((edu, idx) => (
        <div key={idx} className="mb-10 ml-5">
          {/* Circle icon */}
          <div className="absolute -left-7 flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full font-bold">
            {edu.icon}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
              {edu.start} - {edu.end}
            </span>
            <p className="text-red-500 mt-1">{edu.college}</p>
            <p className="mt-2 text-gray-600 text-sm">{edu.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Test;
