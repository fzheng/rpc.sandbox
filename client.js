(function () {
  'use strict';

  const path = require('path');
  const grpc = require('grpc');
  const config = require('./config');

  const proto = grpc.load(path.resolve(config.proto.user)).user;
  const client = new proto.User(config.server, grpc.credentials.createInsecure());

  if (process.argv.length < 3) {
    throw new Error("Username required");
  }

  const req = {
    name: process.argv[2]
  };

  client.getName(req, function (err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(res.data));
    }
  });
})();