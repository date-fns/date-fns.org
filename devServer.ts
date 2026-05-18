import express from "express";
import "isomorphic-fetch";
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import { api } from "~/server/api";
import { template } from "~/server/template";
import config from "./webpack.config.dev";

const PORT = 1337;

const compiler = webpack(config);

const server = express();
server.use(api);
server.use(WebpackDevMiddleware(compiler));
server.use(WebpackHotMiddleware(compiler));
server.get("*", (_req, res) => res.send(template()));
server.listen(PORT);

console.log(`Started listening on http://localhost:${PORT}/`);
