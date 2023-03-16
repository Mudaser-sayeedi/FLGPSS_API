import { createServer } from "http";
import { Text } from "./components/utils.js";
import { app } from "./express.js";

const server = createServer(app);

const PORT = 8080;

server.listen(PORT, () => {
  // console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
  Text(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
