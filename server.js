(function () {
  'use strict';

  const path = require('path');
  const grpc = require('grpc');
  const config = require('./config');

  // Starts an RPC server that receives requests for the User service at the sample server port
  const proto = grpc.load(path.resolve(config.proto.user)).user;
  const server = new grpc.Server();
  server.bind(config.server, grpc.ServerCredentials.createInsecure());

  const userService = proto.User.service;

  server.addProtoService(userService, {
    // Implements the getName RPC method.
    getName: function (req, cb) {
      const res = {
        data: {
          name: req.request.name
        }
      };
      cb(null, res);
    }
  });

  server.start();
})();