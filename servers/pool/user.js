'use strict';

const path = require('path');
const grpc = require('grpc');
const driver = require('../../driver');
const config = require('../../config');
const AbstractRPCServer = require('./abstract_rpc_server');

function UserRPCServer () {
  const self = this;

  AbstractRPCServer.call(this);

  self.getProto = function () {
    return grpc.load(path.resolve(config.user.proto)).user;
  };

  self.registerService = function (server, proto) {
    const userService = proto.User.service;
    server.addProtoService(userService, {
      userInfo: function (req, cb) {
        cb(null, driver.getUserInfo(req.request.name));
      }
    });
  };
}

UserRPCServer.prototype = Object.create(AbstractRPCServer.prototype);

module.exports = UserRPCServer;