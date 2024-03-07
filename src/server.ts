import dotenv from "dotenv";
import express from "express";
import axios from "axios";

dotenv.config();

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.get("/", async (req: express.Request, res: express.Response) => {
  const url = process.env.URL!;
  const username = process.env.USERNAMEAPI!;
  const password = process.env.PASSWORDAPI!;

  try {
    const response = await axios.get(url, {
      auth: {
        username: username,
        password: password,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("An error occurred while trying to fetch the data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
