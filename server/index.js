import app from "./src/app.js";
import "dotenv/config";
import dbConnection from "./src/utils/db.js";



// ✅ Load environment variables safely
const PORT = process.env.PORT || 5000;

await dbConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
