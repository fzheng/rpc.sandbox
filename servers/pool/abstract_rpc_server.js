'use strict';

const grpc = require('grpc');

function AbstractRPCServer () {
  const self = this;

  self.getProto = function () {
    throw new Error("Not Implemented");
  };

  self.registerService = function (server, proto) {
    throw new Error("Not Implemented");
  };

  self.start = function (address) {
    const server = new grpc.Server();
    const proto = self.getProto();
    server.bind(address, grpc.ServerCredentials.createInsecure());
    self.registerService(server, proto);
    server.start();
  };
}

AbstractRPCServer.prototype = Object.prototype;

module.exports = AbstractRPCServer;