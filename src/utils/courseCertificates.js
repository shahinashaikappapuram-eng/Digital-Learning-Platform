const courseMeta = {
  math: { subject: "Mathematics", iconBg: "#2563eb", certCode: "MAT" },
  science: { subject: "Science", iconBg: "#10b981", certCode: "SCI" },
  physical_science: { subject: "Physical Science", iconBg: "#059669", certCode: "PSC" },
  biology: { subject: "Biology", iconBg: "#10b981", certCode: "BIO" },
  english: { subject: "English", iconBg: "#8b5cf6", certCode: "ENG" },
  hindi: { subject: "Hindi", iconBg: "#e11d48", certCode: "HIN" },
  telugu: { subject: "Telugu", iconBg: "#0284c7", certCode: "TEL" },
  social: { subject: "Social Science", iconBg: "#ea580c", certCode: "SOC" },
  history: { subject: "History", iconBg: "#d97706", certCode: "HIS" },
  geography: { subject: "Geography", iconBg: "#0d9488", certCode: "GEO" },
  civics: { subject: "Civics", iconBg: "#4f46e5", certCode: "CIV" },
  economics: { subject: "Economics", iconBg: "#ea580c", certCode: "ECO" },
  computer_basics: { subject: "Computer Basics", iconBg: "#06b6d4", certCode: "COM" }
};

const readableCourseName = (courseId) =>
  courseId.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (date) => {
  if (!date) return "Recently Completed";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? String(date)
    : parsedDate.toLocaleDateString();
};

export const buildCourseCertificates = (user) => {
  const completedUnitsByCourse = user.completedUnitsByCourse || {};
  const courseUnitCounts = user.courseUnitCounts || {};
  const completionDates = user.courseUnitCompletionDates || {};

  return Object.entries(completedUnitsByCourse)
    .filter(([, units]) => Array.isArray(units) && units.length > 0)
    .map(([courseId, units]) => {
      const info = courseMeta[courseId] || {
        subject: readableCourseName(courseId),
        iconBg: "#2563eb",
        certCode: courseId.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase() || "CRS"
      };
      const totalUnits = Math.max(Number(courseUnitCounts[courseId]) || units.length, units.length);
      const completedUnits = units.slice(0, totalUnits);
      const isCourseComplete = completedUnits.length >= totalUnits;
      const unitDates = completionDates[courseId] || {};
      const latestDate = Object.values(unitDates).sort().at(-1);
      const learnerTag = String(user.id || "STUDENT").replace(/[^a-z0-9]/gi, "").slice(-6);

      return {
        id: `cert-${courseId}`,
        subject: info.subject,
        chapter: isCourseComplete
          ? `All ${totalUnits} units completed`
          : `${completedUnits.length} of ${totalUnits} units completed: ${completedUnits.join(", ")}`,
        completedUnits,
        totalUnits,
        isCourseComplete,
        date: formatDate(latestDate),
        score: `${Math.round((completedUnits.length / totalUnits) * 100)}%`,
        rating: isCourseComplete ? "Course Complete" : "Unit Complete",
        ratingBg: isCourseComplete ? "#dcfce7" : "#dbeafe",
        ratingColor: isCourseComplete ? "#15803d" : "#1d4ed8",
        iconBg: info.iconBg,
        certId: `NAB-${info.certCode}-${learnerTag}`
      };
    });
};

export const getCertificateCompletionText = (certificate) =>
  certificate.isCourseComplete
    ? `For successfully completing all ${certificate.totalUnits} units of ${certificate.subject}.`
    : `For successfully completing ${certificate.completedUnits.length} of ${certificate.totalUnits} units in ${certificate.subject}: ${certificate.completedUnits.join(", ")}.`;
