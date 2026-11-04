const subjectProfiles = [
  {
    matches: ["mathematics", "math"],
    vocabulary: "Numerator: the number of equal parts being considered. Denominator: the total equal parts. Estimate: a useful approximate answer.",
    concepts: [
      "Represent a problem with numbers, diagrams, or a number line before choosing an operation.",
      "Keep place value and units consistent. Estimate first, calculate carefully, then check whether the result is reasonable.",
      "Show each step so another learner can follow the method and find an arithmetic error."
    ],
    example: "A class has 24 learners arranged equally in 4 groups. Calculate 24 ÷ 4 = 6 learners per group. Check by multiplying: 6 × 4 = 24.",
    activity: "Choose a measurement or sharing problem from the resource. Write the known values, select an operation, show the calculation, and check the result using the inverse operation.",
    questions: "Which operation or representation fits the problem? What estimate can you make first? How can you verify the final answer?",
    answers: "A complete response names the operation, shows the working, includes the correct unit where needed, and uses an estimate or inverse operation as a check."
  },
  {
    matches: ["physics"],
    vocabulary: "Force: a push or pull. Energy: the capacity to cause change. Observation: information gathered with the senses or an instrument.",
    concepts: [
      "Describe a physical event using measurable quantities such as distance, time, temperature, or sound.",
      "Separate what is observed from what is inferred, and record measurements with units.",
      "In a fair test, change one factor at a time while keeping other conditions as steady as possible."
    ],
    example: "To compare how far a toy car travels on two surfaces, use the same car, starting point, and ramp height. Measure each distance several times and compare the results.",
    activity: "Plan a safe investigation related to the resource. State a question, identify what you will change and measure, list what must stay the same, and record results in a table.",
    questions: "What is the evidence? Which factor changed? Which quantities should be measured, and what units are appropriate?",
    answers: "A sound explanation links a measured result to the question, identifies controlled conditions, and avoids claiming more than the observations show."
  },
  {
    matches: ["chemistry"],
    vocabulary: "Matter: material that has mass and occupies space. Mixture: substances together without becoming a new substance. Variable: a factor that can change.",
    concepts: [
      "Describe materials by observable properties such as state, colour, texture, or solubility.",
      "Distinguish a physical change, where material identity remains, from evidence that a new substance may have formed.",
      "Use only teacher-approved materials and follow instructions; never taste or directly handle unknown substances."
    ],
    example: "Sand and water form a mixture. Letting the sand settle and carefully filtering the liquid separates the insoluble sand from the water.",
    activity: "Choose a safe separation or materials example from the resource. Predict what will happen, describe the steps, record observations, and explain whether the materials can be recovered.",
    questions: "What properties help identify the materials? Is the change reversible? What evidence supports your conclusion?",
    answers: "A good answer names the observed property or separation method and supports its conclusion with recorded evidence."
  },
  {
    matches: ["biology"],
    vocabulary: "Organism: a living thing. Habitat: the place where an organism lives. Adaptation: a feature that helps an organism survive.",
    concepts: [
      "Living things carry out life processes, grow, and respond to their surroundings.",
      "A habitat supplies resources such as food, water, shelter, and space; organisms depend on these resources.",
      "An adaptation is useful in a particular environment, and changes to a habitat can affect the organisms living there."
    ],
    example: "A cactus has a thick stem that stores water and a waxy surface that reduces water loss. These features help it survive in a dry habitat.",
    activity: "Select one organism mentioned in the resource. Draw or describe its habitat, identify two needs, and explain how one body feature or behaviour helps it meet those needs.",
    questions: "What does the organism need from its habitat? Which feature supports survival? What might happen if one resource becomes scarce?",
    answers: "A complete response connects a named feature to a specific need or environmental condition and explains the relationship."
  },
  {
    matches: ["science"],
    vocabulary: "Observation: information collected directly. Prediction: a reasoned statement about what may happen. Evidence: observations or measurements used to support an explanation.",
    concepts: [
      "Science uses questions, observations, and repeatable investigations to build explanations.",
      "A fair comparison changes one factor at a time and records results in a clear table or labelled diagram.",
      "Conclusions should match the evidence. Repeating a test can help reveal unusual results or measurement errors."
    ],
    example: "To test whether light affects seedling growth, keep the seed type, water, container, and observation period the same. Change light exposure and measure growth regularly.",
    activity: "Turn one topic in the resource into a testable question. Write a prediction, list the materials, identify the changed and measured factors, and sketch a results table.",
    questions: "What is being investigated? Which conditions must remain the same? What observation would support or challenge the prediction?",
    answers: "A strong investigation changes one factor, measures a relevant outcome, keeps other conditions consistent, and bases its conclusion on results."
  },
  {
    matches: ["english"],
    vocabulary: "Main idea: what a passage is mostly about. Inference: a conclusion supported by clues. Evidence: a word, detail, or sentence that supports an answer.",
    concepts: [
      "Read once for the overall meaning, then read again to locate details, unfamiliar words, and clues to the author's purpose.",
      "A complete written response answers the question directly and supports the answer with evidence from the passage.",
      "Plan writing for its audience: organize ideas, use clear sentences and punctuation, then reread and revise."
    ],
    example: "If a character carries an umbrella and shakes rain from a coat, infer that the weather is wet. The umbrella and coat are clues that support the inference.",
    activity: "Choose a paragraph from the resource. Write its main idea in one sentence, identify two supporting details, and use one new word in an original sentence.",
    questions: "What is the main idea? Which detail supports it? What can be inferred, and which words provide the evidence?",
    answers: "Answers should be clear, use complete sentences where appropriate, and point to relevant words or details rather than relying on an unsupported guess."
  },
  {
    matches: ["hindi", "telugu", "language"],
    vocabulary: "Context: the surrounding words and ideas that clarify meaning. Sentence: words arranged to express a complete thought. Revision: checking and improving written work.",
    concepts: [
      "Read a passage for its central idea, then notice how word choice, sentence structure, and context shape meaning.",
      "Use grammar rules to make relationships between words clear; check agreement, spelling, and punctuation.",
      "When writing a summary, keep the important ideas and express them in your own concise words."
    ],
    example: "Read a short paragraph twice: first to identify its topic, then to underline words that explain the topic. Use those clues to write a two-sentence summary.",
    activity: "Choose a lesson or poem from the resource. Note its central idea, explain two important words from context, and write a short response using correct sentence structure.",
    questions: "What is the central idea? Which words or lines support it? How does the grammar or word choice make the meaning clear?",
    answers: "A good response stays connected to the passage, explains its evidence, and uses clear, correctly structured sentences."
  },
  {
    matches: ["geography"],
    vocabulary: "Direction: a way of describing position or movement. Scale: the relationship between a map distance and real distance. Legend: symbols and their meanings on a map.",
    concepts: [
      "Maps use titles, symbols, directions, and scale to represent places; consult the legend before interpreting a symbol.",
      "Location can be described using direction and, where available, a grid or coordinates.",
      "Physical features and human activities influence one another, so explanations should use evidence from maps or observations."
    ],
    example: "If a map scale says 1 cm represents 5 km, a route measuring 3 cm represents 15 km. Multiply the map distance by the scale value.",
    activity: "Sketch a simple map of a familiar area. Add a title, north arrow, three symbols, and a legend; use direction words to describe one route.",
    questions: "What does the map title tell you? What does a symbol mean? How can the scale or direction help answer the question?",
    answers: "Use the legend and scale accurately, include direction when describing location, and refer to a specific map feature as evidence."
  },
  {
    matches: ["history"],
    vocabulary: "Chronology: events arranged in time order. Primary source: evidence created during the time being studied. Secondary source: a later account or interpretation.",
    concepts: [
      "Historians ask who created a source, when it was made, and what purpose or point of view it may reflect.",
      "A timeline helps compare sequence and duration, but events also need context about people, place, and causes.",
      "Use more than one reliable source when possible; different accounts can reveal different perspectives."
    ],
    example: "When studying an old letter, note its date and author, identify what it says directly, and distinguish those details from your interpretation of why it was written.",
    activity: "Select an event or source named in the resource. Record its date or period, identify the source type, and write one supported observation and one question for further research.",
    questions: "Who created the source and when? What does it show directly? Which perspective may be missing?",
    answers: "A careful answer separates source evidence from interpretation and explains why the source is useful or limited."
  },
  {
    matches: ["civics", "political science"],
    vocabulary: "Rule of law: everyone is subject to the law. Rights: freedoms or protections people are entitled to. Responsibility: a duty to act with consideration for others.",
    concepts: [
      "A community uses agreed rules and institutions to support safety, fairness, and cooperation.",
      "Rights and responsibilities work together: exercising a right should respect the rights of other people.",
      "Public decisions affect communities; listening to different viewpoints helps people participate responsibly."
    ],
    example: "A classroom discussion can protect everyone's right to speak by using a shared rule: listen without interruption and allow each person a turn.",
    activity: "Choose a community issue from the resource. List the people affected, one right or responsibility involved, and a fair action that could help.",
    questions: "Who is affected by the decision? Which right or responsibility matters? How could different viewpoints be heard?",
    answers: "A reasoned response identifies the people affected, applies a relevant principle, and proposes a respectful, fair action."
  },
  {
    matches: ["economics"],
    vocabulary: "Need: something essential. Want: something people would like to have. Opportunity cost: the next-best option given up when a choice is made.",
    concepts: [
      "Resources such as time, money, and materials are limited, so people make choices about how to use them.",
      "Every choice has benefits and costs; comparing alternatives helps explain a decision.",
      "Goods and services meet needs or wants, and people, businesses, and communities depend on one another."
    ],
    example: "If a learner has one hour for either reading or a game, choosing reading means giving up the game for that hour. The game is the opportunity cost.",
    activity: "Plan a small class activity with a limited budget or time. List two options, compare their benefits and costs, and explain the choice.",
    questions: "Which resource is limited? What alternatives are available? What is the next-best option given up?",
    answers: "A complete answer names the constraint, compares choices, and correctly identifies the next-best alternative as the opportunity cost."
  },
  {
    matches: ["social science", "social studies"],
    vocabulary: "Community: people connected by place or shared activity. Evidence: information used to support a claim. Perspective: a way of viewing an issue shaped by experience.",
    concepts: [
      "Social sciences examine people, places, institutions, and how they change over time.",
      "Use maps, records, observations, and examples to support a claim instead of relying on an unsupported opinion.",
      "A community issue may affect different groups in different ways; consider multiple perspectives."
    ],
    example: "To understand why a town market is located near a road, consider access, nearby homes, transport, and the needs of buyers and sellers.",
    activity: "Pick a place, event, or community topic from the resource. Write one claim, support it with two details, and note one perspective that could add more context.",
    questions: "Who or what is being studied? Which details support your claim? Whose perspective should also be considered?",
    answers: "A strong response makes a clear claim, cites relevant details, and acknowledges that another perspective may add context."
  },
  {
    matches: ["computer", "information technology", "ict"],
    vocabulary: "File: saved information with a name. Folder: a container used to organize files. Backup: an extra copy kept in a separate location.",
    concepts: [
      "A computer system uses input, processing, storage, and output to work with information.",
      "Save work with a clear filename in an organized folder, and make a backup before important changes.",
      "Protect personal information: use trusted sources, keep passwords private, and ask an adult before opening unfamiliar files or links."
    ],
    example: "To prepare a class document, enter the text, review formatting, save it in the correct class folder with a descriptive name, and reopen it to confirm it was saved.",
    activity: "Create a short document or workflow related to the resource. List the input, the steps performed, the saved output, and one safe file-management practice.",
    questions: "What is the input and output? Where should the file be saved? How can you check that the work is safe and complete?",
    answers: "A complete response describes the steps in order, uses a clear file location and name, and includes a sensible privacy or backup practice."
  }
];

const findProfile = (subject) => {
  const normalized = String(subject || "").toLowerCase();
  const priorityMatches = ["social science", "social studies", "computer", "information technology", "ict"];
  const priorityProfile = subjectProfiles.find((profile) =>
    priorityMatches.some((match) => normalized.includes(match) && profile.matches.includes(match))
  );
  if (priorityProfile) return priorityProfile;

  return subjectProfiles.find((profile) =>
    profile.matches.some((match) => normalized.includes(match))
  ) || subjectProfiles.find((profile) => profile.matches.includes("social studies"));
};

export const buildStudyPdfSections = ({ subject, title, summary }) => {
  const profile = findProfile(subject);
  const focus = String(summary || "").trim();
  const resourceTitle = String(title || "this resource").trim();

  return [
    {
      heading: "Resource focus",
      content: [
        focus
          ? `This guide expands the subject focus provided for ${resourceTitle}: ${focus}`
          : `This guide develops the main ideas in ${resourceTitle}.`,
        "Use the explanations and activities alongside your class materials. Write answers in your own words and check them against the evidence or method shown."
      ].join("\n")
    },
    {
      heading: "Learning goals",
      content: [
        `Identify the main ideas and vocabulary connected with ${subject}.`,
        "Explain one idea using a clear example, diagram, calculation, or piece of evidence.",
        "Apply what you learned to a new question and check whether your reasoning is supported."
      ].join("\n")
    },
    {
      heading: "Essential vocabulary",
      content: profile.vocabulary
    },
    {
      heading: "Core subject concepts",
      content: profile.concepts.join("\n")
    },
    {
      heading: "Worked example",
      content: [
        profile.example,
        "Study the steps and identify the evidence or check that makes the explanation reliable."
      ].join("\n")
    },
    {
      heading: "Apply and review",
      content: [
        profile.activity,
        `Check your understanding: ${profile.questions}`,
        `Review guide: ${profile.answers}`
      ].join("\n")
    }
  ].map((section, index) => ({
    ...section,
    pageBreakBefore: index === 3 || index === 5
  }));
};