(function () {
  'use strict';

  const path = require('path');
  const grpc = require('grpc');
  const driver = require('../driver');
  const config = require('../config');

  const proto = grpc.load(path.resolve(config.user.proto)).user;
  const server = new grpc.Server();
  server.bind(config.user.server, grpc.ServerCredentials.createInsecure());

  const userService = proto.User.service;

  server.addProtoService(userService, {
    userInfo: function (req, cb) {
      cb(null, driver.getUserInfo(req.request.name));
    }
  });

  server.start();
})();