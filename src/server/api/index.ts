import cors from "cors";
import express from "express";
import { OPEN_COLLECTIVE_API_KEY } from "~/constants";
import { requestGraphQL } from "~/utils/request";
import { sponsorsQuery } from "./sponsorsQuery";

const SPONSORS_URL = "https://api.opencollective.com/graphql/v2";
const ONE_HOUR = 60 * 60;

export const api = express();

api.get("/api/sponsors", cors(), async (req, res) => {
  const { age } = req.query;
  const json = await requestGraphQL(SPONSORS_URL, sponsorsQuery, {
    "Api-Key": OPEN_COLLECTIVE_API_KEY,
  });
  res
    .header(
      "cache-control",
      `public, max-age=${(typeof age === "string" && age) || ONE_HOUR}`,
    )
    .send(json);
});
