(function () {
  'use strict';

  const path = require('path');
  const grpc = require('grpc');
  const driver = require('../driver');
  const config = require('../config');

  const proto = grpc.load(path.resolve(config.project.proto)).project;
  const server = new grpc.Server();
  server.bind(config.project.server, grpc.ServerCredentials.createInsecure());

  const projectService = proto.Project.service;

  server.addProtoService(projectService, {
    listProjects: function (req, cb) {
      cb(null, driver.getProjectList(req.request.ids));
    }
  });

  server.start();
})();