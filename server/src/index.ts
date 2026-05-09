import "dotenv/config";
import app from "./app";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`✅ Server is running on http://${HOST}:${PORT}`));
