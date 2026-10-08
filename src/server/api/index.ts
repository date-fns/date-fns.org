import cors from "cors";
import express from "express";
import { OPEN_COLLECTIVE_API_KEY } from "~/constants";
import { requestGraphQL, requestJSON } from "~/utils/request";
import type { ContributorsFetchResponse } from "~/utils/useContributors";
import { sponsorsQuery } from "./sponsorsQuery";

const SPONSORS_URL = "https://api.opencollective.com/graphql/v2";
const CONTRIBUTORS_URL = "https://api.github.com/repos/date-fns/date-fns/contributors";
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

api.get("/api/contributors", cors(), async (req, res, next) => {
  const { age } = req.query;
  const contributors: ContributorsFetchResponse = [];
  let page = 1;
  let users: ContributorsFetchResponse;

  try {
    do {
      users = await requestJSON(`${CONTRIBUTORS_URL}?per_page=100&page=${page}`);

      if (!Array.isArray(users)) {
        throw new Error("Failed to load contributors: expected an array from GitHub API");
      }

      contributors.push(...users);
      page++;
    } while (users.length === 100);

    res
      .header(
        "cache-control",
        `public, max-age=${(typeof age === "string" && age) || ONE_HOUR}`,
      )
      .send(contributors);
  } catch (error) {
    next(error);
  }
});
