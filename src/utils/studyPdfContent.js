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
    matches: ["physics", "physical science"],
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

const topicProfiles = [
  {
    matches: ["fraction", "decimal"],
    topics: ["fractions and decimals"],
    concepts: [
      "A fraction represents equal parts of a whole; its denominator names the total equal parts and its numerator counts the selected parts.",
      "Equivalent fractions name the same value. To compare or add fractions, use equivalent forms with a common denominator.",
      "A decimal uses place value to show tenths, hundredths, and smaller parts. Align decimal points when adding or subtracting."
    ],
    example: "Three quarters is 3/4 = 0.75. To add 1/4 + 2/4, keep the common denominator and add the numerators: 3/4.",
    activity: "Draw a shape divided into equal parts, shade a fraction, write its equivalent decimal when possible, and explain how the diagram supports your answer.",
    questions: "What does the denominator count? How can equivalent fractions help compare values? Which decimal place represents hundredths?",
    answers: "Check that parts are equal, preserve the value when making equivalent fractions, and align decimal place values."
  },
  {
    matches: ["algebra", "equation", "variable"],
    topics: ["algebra and equations"],
    concepts: [
      "A variable is a symbol for a number. An algebraic expression combines numbers, variables, and operations.",
      "An equation states that two expressions have equal value. Keep the equality balanced by performing the same operation on both sides.",
      "Substitute a proposed value into the original expression or equation to check it."
    ],
    example: "Solve x + 5 = 12 by subtracting 5 from both sides: x = 7. Check: 7 + 5 = 12.",
    activity: "Translate a short word problem into an expression or equation. Define the variable, solve one step at a time, then substitute your answer to check.",
    questions: "What does the variable represent? Which operation undoes the one applied to it? Does the answer make the original equation true?",
    answers: "Show equivalent operations on both sides and verify the value in the original equation."
  },
  {
    matches: ["geometry", "angle", "triangle", "quadrilateral", "symmetry"],
    topics: ["geometry and shapes"],
    concepts: [
      "Describe shapes by their sides, vertices, angles, and symmetry rather than by appearance alone.",
      "Angles are measured in degrees. A straight angle is 180 degrees and a full turn is 360 degrees.",
      "Use known properties, labelled diagrams, and measured information to justify a geometric conclusion."
    ],
    example: "The angles in a triangle total 180°. If two angles are 50° and 60°, the third angle is 180° - 50° - 60° = 70°.",
    activity: "Draw and label a triangle or quadrilateral from the resource. Mark its known sides and angles and use a shape property to find one unknown.",
    questions: "Which shape property applies? What information is given? Can a labelled sketch help organize the calculation?",
    answers: "Use a named property, show the calculation, and include degree symbols for angle measures."
  },
  {
    matches: ["mensuration", "area", "perimeter", "volume"],
    topics: ["measurement, area, and perimeter"],
    concepts: [
      "Perimeter is the total distance around a two-dimensional shape; add its side lengths using consistent units.",
      "Area measures the surface covered and is expressed in square units. For a rectangle, area = length × width.",
      "Volume measures space occupied and uses cubic units. Label the dimensions and units in every calculation."
    ],
    example: "A rectangle 8 cm long and 3 cm wide has perimeter 2 × (8 + 3) = 22 cm and area 8 × 3 = 24 cm².",
    activity: "Measure or sketch a rectangle relevant to the resource. Calculate its perimeter and area, and explain why the units differ.",
    questions: "Are you finding distance around, surface covered, or space occupied? Which units match that measurement?",
    answers: "Choose the matching formula, substitute dimensions with consistent units, and label the result in linear, square, or cubic units."
  },
  {
    matches: ["magnet"],
    topics: ["magnets and magnetic forces"],
    concepts: [
      "A magnet has north and south poles. Like poles repel, while unlike poles attract.",
      "Magnetic force can act without direct contact; not every metal is attracted to a magnet.",
      "A fair comparison tests materials separately and records whether each is attracted."
    ],
    example: "Bring the north pole of one magnet near the north pole of another: they repel. Bringing north near south produces attraction.",
    activity: "Make a safe table of familiar materials and predict which a magnet will attract. Test only teacher-approved items and record observations.",
    questions: "Which poles are facing? Is the material magnetic? What observation supports the prediction?",
    answers: "Use pole names accurately and distinguish observation from prediction; attraction to a magnet is not a property of all metals."
  },
  {
    matches: ["motion", "measurement of length", "speed", "distance"],
    topics: ["motion and measurement"],
    concepts: [
      "Describe motion by comparing an object's position over time.",
      "Measure length from the zero mark of a suitable instrument and record the correct unit.",
      "For a steady journey, average speed is distance divided by time; use compatible units."
    ],
    example: "A learner walks 60 metres in 30 seconds. Average speed = 60 ÷ 30 = 2 metres per second.",
    activity: "Measure a short, safe journey and its duration. Record distance and time with units, calculate average speed if appropriate, and identify one source of measurement error.",
    questions: "What changed position? Which distance and time units are used? How could repeated measurements improve reliability?",
    answers: "State the measured distance and time, keep units consistent, and describe observations rather than guessing."
  },
  {
    matches: ["force", "laws of motion", "work and energy", "kinetic energy", "potential energy"],
    topics: ["force, motion, and energy"],
    concepts: [
      "A force is a push or pull that can change an object's motion or shape. Forces are measured in newtons.",
      "An object's motion depends on the combined effect of forces; balanced forces do not change its motion, while unbalanced forces do.",
      "Energy can be transferred or transformed. Work is done when a force causes displacement in its direction."
    ],
    example: "A 2 N force moves a box 3 m in the same direction. Work done = force × distance = 2 × 3 = 6 J.",
    activity: "Choose a movement example from the resource. Identify the forces, describe whether they are balanced, and state what evidence shows a change in motion.",
    questions: "Which forces act on the object? Are they balanced? What energy transfer or work is taking place?",
    answers: "Name the forces and direction, use the correct unit, and connect the net force to the observed motion."
  },
  {
    matches: ["sound", "vibration", "frequency", "amplitude"],
    topics: ["sound and vibrations"],
    concepts: [
      "Sound is produced by vibrations and travels through a medium as a wave; it cannot travel through a vacuum.",
      "Frequency relates to pitch, while amplitude relates to loudness. They describe different features of a sound wave.",
      "Sound can reflect from surfaces. Use safe listening levels and never place objects in the ear."
    ],
    example: "A tighter string usually vibrates faster and produces a higher pitch. A stronger pluck increases vibration amplitude and makes the sound louder.",
    activity: "Compare two safe sound sources. Describe the vibration you observe or infer and distinguish differences in pitch from differences in loudness.",
    questions: "What is vibrating? How does frequency relate to pitch? What property relates to loudness?",
    answers: "Explain sound using vibrations and distinguish frequency/pitch from amplitude/loudness."
  },
  {
    matches: ["electricity", "electric circuit", "current", "conductor", "insulator"],
    topics: ["electric circuits"],
    concepts: [
      "An electric circuit needs a complete conducting path for current to flow from a power source and back.",
      "A switch opens or closes the path. Conductors allow charge to move more easily; insulators resist this movement.",
      "Use only low-voltage classroom equipment under teacher supervision. Never experiment with mains electricity."
    ],
    example: "In a simple cell-lamp circuit, connect both lamp terminals to the cell's opposite terminals in a closed loop; an open switch breaks the loop and the lamp goes out.",
    activity: "Draw a labelled circuit using a cell, wires, a switch, and a lamp. Mark the closed path and predict what happens when the switch opens.",
    questions: "Is there a complete path? Which part is the source? What changes when the switch is open?",
    answers: "Show a complete circuit path, label components, and explain that an open path stops current in the simple circuit."
  },
  {
    matches: ["chemistry", "chemical", "elements", "compounds", "atoms", "molecules"],
    topics: ["materials and chemical substances"],
    concepts: [
      "An element contains one kind of atom; a compound contains elements chemically combined in a fixed ratio.",
      "A mixture contains substances physically combined, so its parts may often be separated by physical methods.",
      "Represent substances with correct names or symbols and distinguish observations from explanations about particles."
    ],
    example: "Salt dissolved in water forms a solution, which is a mixture. Evaporating the water can recover salt; the salt and water have not become a new compound.",
    activity: "Classify examples from the resource as elements, compounds, or mixtures. Give one reason for each classification and a possible separation method for a mixture.",
    questions: "Are substances chemically combined or physically mixed? Can the parts be separated physically? What evidence supports the classification?",
    answers: "Use the definitions consistently and do not confuse dissolving or mixing with chemical combination."
  },
  {
    matches: ["habitat", "adaptation", "living creatures", "living world", "organism", "plant reproduction"],
    topics: ["organisms, habitats, and adaptations"],
    concepts: [
      "Organisms need resources such as water, nutrients, air, shelter, and space to survive.",
      "A habitat supplies these resources, and organisms interact with both living and non-living parts of the environment.",
      "An adaptation is a feature or behaviour that helps an organism survive or reproduce in its environment."
    ],
    example: "A fish has gills that take oxygen from water. This structure is suited to its aquatic habitat, unlike lungs used to take oxygen from air.",
    activity: "Choose an organism from the resource, name its habitat, and explain how one feature supports a particular need in that habitat.",
    questions: "Which resources does the habitat provide? What feature helps the organism? How might a habitat change affect it?",
    answers: "Connect a specific feature to a specific environmental condition or survival need."
  },
  {
    matches: ["water", "states of matter", "separation"],
    topics: ["water, states of matter, and separation"],
    concepts: [
      "Water can exist as solid ice, liquid water, and water vapour. Heating and cooling cause changes of state.",
      "Evaporation changes liquid into vapour; condensation changes vapour into liquid. The water cycle connects these processes.",
      "Mixtures can be separated using physical properties such as particle size, settling, filtration, or evaporation."
    ],
    example: "Mud in water can settle, then be filtered to remove insoluble particles. Dissolved salt passes through a filter and can be recovered by evaporating the water.",
    activity: "Choose a safe mixture and explain which physical property can separate its parts. Draw the steps and state what remains after each step.",
    questions: "Is the material dissolved or insoluble? Would settling, filtration, or evaporation work? What changes state?",
    answers: "Match each separation method to the material property and explain that physical separation does not necessarily create a new substance."
  },
  {
    matches: ["nutrition", "food", "digestion", "respiration", "circulation"],
    topics: ["nutrition and life processes"],
    concepts: [
      "A balanced diet provides energy and nutrients needed for growth, repair, and normal body functions.",
      "Digestion breaks food into substances the body can absorb; the circulatory system transports materials around the body.",
      "Respiration releases usable energy from food in cells. It is different from breathing, which moves air in and out of the lungs."
    ],
    example: "After food is digested and absorbed, blood carries nutrients to body cells. Cells use nutrients and oxygen during respiration to release energy.",
    activity: "Trace one food item from a meal through digestion and explain how nutrients reach cells. Use arrows and label each step.",
    questions: "Which nutrients does food supply? How are nutrients transported? How is cellular respiration different from breathing?",
    answers: "Keep digestion, transport, breathing, and cellular respiration distinct, and describe how the processes support the body."
  },
  {
    matches: ["light", "mirror", "lens", "shadow"],
    topics: ["light and reflection"],
    concepts: [
      "Light travels from a source and can be reflected, absorbed, or transmitted by materials.",
      "A plane mirror produces an image that appears the same size and the same distance behind the mirror as the object is in front.",
      "Shadows form when an opaque object blocks light; their size and direction depend on the positions of the source and object."
    ],
    example: "Move a torch closer to an opaque object while keeping a screen behind it. The shadow usually becomes larger because the object blocks a wider spread of rays.",
    activity: "Draw a light source, object, and screen. Add arrows for the light path and describe what changes when one object is moved.",
    questions: "Where is the light source? Which material blocks or reflects light? How does changing distance affect the shadow or image?",
    answers: "Use a labelled ray or position diagram and relate the observed image or shadow to the path of light."
  },
  {
    matches: ["heat", "temperature"],
    topics: ["heat and temperature"],
    concepts: [
      "Temperature describes how hot or cold something is; heat is energy transferred because of a temperature difference.",
      "Heat moves from warmer regions to cooler regions and can transfer by conduction, convection, or radiation.",
      "Use a suitable thermometer and record its scale and units; never use unsafe hot materials in an investigation."
    ],
    example: "A metal spoon left in warm water becomes warmer as energy transfers through the spoon by conduction.",
    activity: "Compare how two safe materials feel after being in the same room. Predict which transfers heat faster, then plan a teacher-approved measurement.",
    questions: "Which object is warmer? In which direction does energy transfer? Is the example conduction, convection, or radiation?",
    answers: "Distinguish heat transfer from temperature and identify the transfer method using evidence about the material or movement."
  },
  {
    matches: ["grammar", "tense", "parts of speech", "sentence", "punctuation"],
    topics: ["grammar and sentence structure"],
    concepts: [
      "A complete sentence expresses a complete thought and usually contains a subject and a verb.",
      "Verb tense signals when an action occurs; keep tense consistent unless the meaning requires a change.",
      "Punctuation and word order help readers understand how ideas relate. Revise by checking agreement, spelling, and clarity."
    ],
    example: "Present: “She writes a letter.” Past: “She wrote a letter.” The verb changes to show when the action happened.",
    activity: "Choose a sentence from the resource. Identify its subject and verb, rewrite it in another tense, and check punctuation and agreement.",
    questions: "Who or what is the subject? What action does the verb show? Does the tense match the time in the sentence?",
    answers: "Use the appropriate verb form, preserve the sentence's meaning, and check that punctuation supports clear reading."
  },
  {
    matches: ["history", "civilisation", "civilization", "empire", "revolt", "nationalism"],
    topics: ["history and historical evidence"],
    concepts: [
      "Place events in chronological order and connect them to their time, location, and historical context.",
      "A source provides evidence, but its author, purpose, audience, and perspective affect how it should be interpreted.",
      "Explain causes and consequences with evidence; avoid treating a complex event as having only one cause."
    ],
    example: "When examining an account of a revolt, separate what the source directly reports from later explanations of its causes and effects.",
    activity: "Create a short timeline for an event in the resource. Add two dated details and one supported explanation of a cause or consequence.",
    questions: "When and where did the event occur? What evidence supports the explanation? Which perspectives might be missing?",
    answers: "Support claims with a dated source or detail and distinguish the event itself from an interpretation of its meaning."
  },
  {
    matches: ["map", "earth", "continent", "ocean", "landform", "climate", "geography"],
    topics: ["maps, places, and physical geography"],
    concepts: [
      "Use a map title, compass direction, legend, and scale to interpret the information shown.",
      "Physical features such as rivers, mountains, and plains influence settlement, movement, and livelihoods.",
      "Describe spatial patterns with evidence from locations or map symbols instead of relying on general impressions."
    ],
    example: "On a map, first use the legend to identify a river symbol, then use the scale to estimate distance and the compass to describe its direction from a town.",
    activity: "Sketch a labelled map related to the resource. Include a title, north arrow, legend, and two locations, then describe their relative direction.",
    questions: "What does the legend show? How does the scale help? Which physical feature could influence life in this place?",
    answers: "Refer to a labelled feature and use direction or scale correctly when explaining location."
  },
  {
    matches: ["democracy", "government", "civics", "federalism", "rights", "constitution", "local government"],
    topics: ["civics, government, and participation"],
    concepts: [
      "Democratic institutions let people participate in decisions through agreed rules and accountable representatives.",
      "A constitution or legal framework defines powers and protects rights; different levels of government may have different responsibilities.",
      "Responsible participation includes listening to viewpoints, using evidence, and respecting the rights of others."
    ],
    example: "A local council may address a neighbourhood issue such as waste collection. Residents can share evidence and concerns through appropriate public channels.",
    activity: "Identify one institution or right from the resource. Describe its role, who it serves, and one respectful way people can participate.",
    questions: "Who makes or carries out the decision? Which right or responsibility applies? How can citizens participate?",
    answers: "Name the relevant institution or principle and explain its role with a concrete example."
  },
  {
    matches: ["economics", "development", "poverty", "money and credit", "sectors", "globalization", "globalisation"],
    topics: ["economics and development"],
    concepts: [
      "Economic choices involve limited resources, alternative uses, and benefits and costs.",
      "Income, education, health, and access to services can all contribute to how development is assessed.",
      "Markets, credit, employment, and public services affect people differently; use examples and evidence when evaluating outcomes."
    ],
    example: "A family comparing two loans should check the interest rate, repayment schedule, and total amount repaid, not only the amount received.",
    activity: "Choose an economic idea in the resource. Define it, give a local or classroom example, and explain who benefits and what trade-off may arise.",
    questions: "What resource or choice is involved? Who is affected? Which evidence would help compare the possible outcomes?",
    answers: "Explain the economic term accurately, identify affected people, and support the conclusion with a comparison or example."
  },
  {
    matches: ["computer", "internet", "cyber", "email", "html", "database", "word processing", "ms word"],
    topics: ["computer skills and digital safety"],
    concepts: [
      "A computer processes input according to instructions and can store, retrieve, and present information.",
      "Organize files with descriptive names and folders; save changes and keep a separate backup of important work.",
      "Protect privacy online: do not share passwords or personal details, check sources, and ask a trusted adult about suspicious messages."
    ],
    example: "Before opening an email attachment, check whether you expected it and who sent it. If unsure, do not open it; ask a trusted adult to verify it.",
    activity: "Complete one safe task from the resource and list its input, steps, and saved result. Add one privacy or file-management practice.",
    questions: "What information is being processed? Where is the file saved? What should you check before sharing or opening a link?",
    answers: "Describe the digital steps in order, protect private information, and use a clear file name and safe storage location."
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
  const topicText = `${resourceTitle} ${focus}`.toLowerCase();
  const topicProfile = topicProfiles.find((topic) =>
    topic.matches.some((match) => topicText.includes(match))
  );
  const selectedTopic = topicProfile?.topics.join(", ");
  const concepts = topicProfile?.concepts || profile.concepts;

  return [
    {
      heading: "Resource focus",
      content: [
        focus
          ? `This guide expands the ${subject} topics${selectedTopic ? ` (${selectedTopic})` : ""} in ${resourceTitle}: ${focus}`
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
      heading: selectedTopic ? `Core concepts: ${selectedTopic}` : "Core subject concepts",
      content: concepts.join("\n")
    },
    {
      heading: "Worked example",
      content: [
        topicProfile?.example || profile.example,
        "Study the steps and identify the evidence or check that makes the explanation reliable."
      ].join("\n")
    },
    {
      heading: "Apply and review",
      content: [
        topicProfile?.activity || profile.activity,
        `Check your understanding: ${topicProfile?.questions || profile.questions}`,
        `Review guide: ${topicProfile?.answers || profile.answers}`
      ].join("\n")
    }
  ].map((section, index) => ({
    ...section,
    pageBreakBefore: index === 3 || index === 5
  }));
};