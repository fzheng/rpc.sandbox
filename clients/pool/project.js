'use strict';

const path = require('path');
const grpc = require('grpc');
const config = require('../../config');
const AbstractRPCClient = require('./abstract_rpc_client');

function ProjectRPCClient () {
  const self = this;

  AbstractRPCClient.call(this);

  self.getProto = function () {
    return grpc.load(path.resolve(config.project.proto)).project;
  };
}

ProjectRPCClient.prototype = Object.create(AbstractRPCClient.prototype);

module.exports = ProjectRPCClient;