const functions = require("firebase-functions");
var proxy = require("express-http-proxy");
const cors = require("cors");
const app = require("express")();

app.use(cors({ origin: true }));
app.use(
  proxy("httpbin.org", {
    proxyReqPathResolver: function(req) {
      var parts = req.url.split("?");
      var queryString = parts[1];
      var updatedPath = parts[0].replace(/api\//, "");
      return updatedPath + (queryString ? "?" + queryString : "");
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
      //   proxyReqOpts.headers["Authorization"] = "Bearer Blablabla";
      //   proxyReqOpts.headers["Client-Id"] = "123456";
      //   proxyReqOpts.headers["Client-Secret"] = "senha forte";
      return proxyReqOpts;
    }
  })
);

exports.api = functions.https.onRequest(app);
