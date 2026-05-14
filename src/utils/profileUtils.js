export const baseColor = "#7a8f2a";
export const warningColor = "#fcb353";
export const dangerColor = "#f46565";

export const calculateProfileCompletion = ({ user, workerProfile: wpParam, availability: avParam }) => {
  if (!user) return 0;

  const workerProfile = wpParam ?? user.workerProfile ?? {};
  const availability = avParam ?? user.availability ?? [];

  // EMPLOYER LOGIC
  if (user.role === "employer" || user.role === "admin") {
    const fields = [
      "name",
      "email",
      "profile_photo",
      "whatsapp",
      "gender",
      "lookingFor"
    ];

    let total = fields.length;
    let filled = 0;

    fields.forEach(field => {
      if (user[field] !== null && user[field] !== "" && user[field] !== undefined) {
        filled++;
      }
    });

    return Math.round((filled / total) * 100);
  }

  // WORKER LOGIC
  let total = 0;
  let filled = 0;

  // Fields that should come from user object
  const userFields = ["name", "email", "whatsapp", "profile_photo", "gender"];

  // Fields that should come from workerProfile
  const workerFields = [
    "location", "age", "education", "language", "religion",
    "marital_status", "description", "experience", "title",
    "part_time_salary", "full_time_salary", "hourly_rate",
    "monthly_rate", "city", "service_radius_km",
  ];

  userFields.forEach(field => {
    total++;
    if (user?.[field] !== null && user?.[field] !== "" && user?.[field] !== undefined) {
      filled++;
    }
  });

  workerFields.forEach(field => {
    total++;
    if (workerProfile?.[field] !== null && workerProfile?.[field] !== "" && workerProfile?.[field] !== undefined) {
      filled++;
    }
  });

  // Availability
  total += 1;
  if (availability && availability.length) {
    filled++;
  }

  return Math.round((filled / total) * 100);
};

export const getProgressColor = (progress) => {
  if (progress < 40) {
    return dangerColor;
  } else if (progress < 80) {
    return warningColor;
  }
  return baseColor;
};
