const dotenv = require("dotenv");
dotenv.config();
const ethers = require("ethers");
const express = require("express");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");
const app = express();
const sql = neon(`${process.env.DATABASE_URL}`);

app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/nfts/:address", async (req, res) => {
  const walletAddress = req.params.address;
  try {
    const nfts = await sql(
      "SELECT tokenId, nftAddress, blockNumber, transactionHash, walletAddress FROM transactions WHERE walletAddress = $1",
      [walletAddress]
    );
    res.json({ walletAddress, nfts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
