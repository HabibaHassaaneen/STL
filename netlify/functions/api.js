const { builder } = require("@netlify/functions");
const { createRequestHandler } = require("@netlify/next");

const handler = createRequestHandler({
  compression: false,
});

exports.handler = builder(handler);