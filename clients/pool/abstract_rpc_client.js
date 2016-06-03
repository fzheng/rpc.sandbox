'use strict';

const grpc = require('grpc');

function AbstractRPCClient () {
  const self = this;

  self.getProto = function () {
    throw new Error("Not Implemented");
  };

  self.getClientService = function (address, service) {
    const proto = self.getProto();
    return new proto[service](address, grpc.credentials.createInsecure());
  };
}

AbstractRPCClient.prototype = Object.prototype;

module.exports = AbstractRPCClient;