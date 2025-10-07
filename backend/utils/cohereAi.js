// COHERE

export const generateDescription10 = catchAsync(async (req, res, next) => {
  const { title, skills, location, experienceLevel } = req.body;
  if (!title || !skills || !location || !experienceLevel) {
    next(
      new AppError(
        "Please provide all required title,skills,location,experience-level",
        400
      )
    );
  }
  /*
  const prompt = `Write a job description in HTML format with the following structure:
- Each section must be wrapped in a <div> with class names:
  • <div class="job-description"> for the job description paragraph
  • <div class="key-responsibilities"> for the responsibilities list
  • <div class="skills-requirements"> for the skills list

Structure:
<div class="job-description">
  <h3>Job Description</h3>
  <p>Short paragraph</p>
</div>

<div class="key-responsibilities">
  <h3>Key Responsibilities</h3>
  <ul><li>...</li></ul>
</div>

<div class="skills-requirements">
  <h3>Skills & Requirements</h3>
  <ul><li>...</li></ul>
</div>

Job Title: ${title}
Location: ${location}
Skills: ${skills.join(", ")}
Experience Level: ${experienceLevel}
Respond ONLY with valid HTML. Do not include markdown, comments, or explanations.`;
*/
  const prompt = `Write a job description in HTML format with these three sections:
<h2>Job Description</h2>
A short paragraph.

<h2>Key Responsibilities</h2>
<ul><li>...</li></ul>

<h2>Skills & Requirements</h2>
<ul><li>...</li></ul>

Job Title: ${title}
Location: ${location}
Skills: ${skills.join(", ")}
Experience Level: ${experienceLevel}

Respond ONLY with valid HTML.`;

  const promptnew = `Write a professional job description in valid HTML format. Your output must include the following three clearly structured sections:

<h2>Job Description</h2>
Write a short and engaging paragraph that describes the overall role, mission, and purpose of the job.

<h2>Key Responsibilities</h2>
Provide at least 4–6 bullet points inside a <ul><li>...</li></ul> list that describe the main duties and day-to-day tasks expected from the candidate. Be specific and use action verbs.

<h2>Skills & Requirements</h2>
Provide at least 4–6 bullet points inside a <ul><li>...</li></ul> list that outline the essential skills, qualifications, tools, and experience needed for the role.

Use natural and professional language. Do not skip or shorten any section. Respond ONLY with clean and well-formatted HTML.

Job Title: ${title}  
Location: ${location}  
Skills: ${skills.join(", ")}  
Experience Level: ${experienceLevel}

Respond ONLY with valid HTML.`;

  // try {
  const response = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command",
      prompt,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  // console.log("Cohere returned:", data);

  const text = data.generations?.[0]?.text?.trim() || "";
  res.status(response.ok ? 200 : 500).json({ content: text });
});
