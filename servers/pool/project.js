'use strict';

const path = require('path');
const grpc = require('grpc');
const driver = require('../../driver');
const config = require('../../config');
const AbstractRPCServer = require('./abstract_rpc_server');

function ProjectRPCServer () {
  const self = this;

  AbstractRPCServer.call(this);

  self.getProto = function () {
    return grpc.load(path.resolve(config.project.proto)).project;
  };

  self.registerService = function (server, proto) {
    const projectService = proto.Project.service;
    server.addProtoService(projectService, {
      listProjects: function (req, cb) {
        cb(null, driver.getProjectList(req.request.ids));
      }
    });
  };
}

ProjectRPCServer.prototype = Object.create(AbstractRPCServer.prototype);

module.exports = ProjectRPCServer;