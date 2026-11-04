const normalizeProof = (answer) =>
  answer
    .toLowerCase()
    .replace(/√\s*3|sqrt\s*\(?\s*3\)?/g, "sqrt3")
    .replace(/²/g, "^2")
    .replace(/\s+/g, " ");

const isValidIrrationalityProof = (answer) => {
  const proof = normalizeProof(answer);
  const assumesRational = /\b(?:assume|suppose)\b/.test(proof) &&
    /\bsqrt3\b/.test(proof) &&
    /\brational\b/.test(proof);
  const definesFraction =
    /\bsqrt3\s*=\s*[a-z]\s*\/\s*[a-z]\b|\b[a-z]\s*\/\s*[a-z]\s*=\s*sqrt3|\b[pa]\s*\/\s*[qb]\b/.test(proof);
  const assumesLowestTerms = /\b(?:coprime|relatively prime|lowest terms)\b|gcd\s*\([^)]*\)\s*=\s*1/.test(proof);
  const derivesSquareEquation = /3\s*[a-z]\s*\^?\s*2\s*=\s*[a-z]\s*\^?\s*2|[a-z]\s*\^?\s*2\s*=\s*3\s*[a-z]\s*\^?\s*2/.test(proof);
  const derivesBothDivisible =
    /3\s*(?:divides?\s+|\|\s*)[pa]\s*(?:,|and)\s*[qb]\b|[pa]\s*(?:,|and)\s*[qb]\s+are\s+(?:both\s+)?divisible\s+by\s+3/.test(proof);
  const derivesNumeratorDivisible = derivesBothDivisible ||
    /3\s*(?:divides?\s+|\|\s*)[pa]\b|[pa]\s+(?:is\s+)?divisible\s+by\s+3/.test(proof);
  const derivesDenominatorDivisible = derivesBothDivisible ||
    /3\s*(?:divides?\s+|\|\s*)[qb]\b|[qb]\s+(?:is\s+)?divisible\s+by\s+3/.test(proof);
  const reachesContradiction = /\b(?:contradict\w*|impossible)\b/.test(proof);

  return (
    assumesRational &&
    definesFraction &&
    assumesLowestTerms &&
    derivesSquareEquation &&
    derivesNumeratorDivisible &&
    derivesDenominatorDivisible &&
    reachesContradiction
  );
};

const isCorrectTrigonometryAnswer = (answer) => {
  const normalized = answer
    .toLowerCase()
    .replace(/°/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(?:the )?(?:answer|value) (?:is|=) /, "")
    .replace(/^=\s*/, "")
    .replace(/[.!?]+$/, "");

  return /^(?:1|1\.0+)$/.test(normalized) ||
    (/sin\s*30/.test(normalized) && /(?:=|equals|is)\s*1(?:\.0+)?$/.test(normalized));
};

export const gradeClass10MathAssignment = (answers) => {
  const questionResults = [
    isValidIrrationalityProof(answers[0] || ""),
    isCorrectTrigonometryAnswer(answers[1] || ""),
  ];
  const passed = questionResults.every(Boolean);

  return {
    passed,
    score: passed ? 2 : 0,
    maxScore: 2,
    questionResults,
  };
};
