
// ==============================
// 🧩 Helper Functions
// ==============================

export const isProductionEnv = (origin = "") => {
  const allowedOrigins = [
    "https://joingavel.com",
    "https://www.joingavel.com",
    "https://gavelbackend.duckdns.org",
    "https://gavel-frontend.vercel.app",
    "https://gavel-frontend-ot269fd8s-clientworkaccess-2804s-projects.vercel.app",
  ];

  // ✅ Always treat Vercel / production as secure
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

  if (!origin) return isVercel;
  return allowedOrigins.some((allowed) => origin.includes(allowed)) || isVercel;
};

export const validateFields = (fields, res) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === '') {
      res.status(400).json({ message: `${key} is required.` });
      return false;
    }
  }
  return true;
};



