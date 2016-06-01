(function () {
  'use strict';

  const path = require('path');
  const grpc = require('grpc');
  const config = require('./config');

  const userProto = grpc.load(path.resolve(config.user.proto)).user;
  const userClient = new userProto.User(config.user.server, grpc.credentials.createInsecure());

  const projectProto = grpc.load(path.resolve(config.project.proto)).project;
  const projectClient = new projectProto.Project(config.project.server, grpc.credentials.createInsecure());

  if (process.argv.length < 3) {
    throw new Error("Username required");
  }

  const userReq = {
    name: process.argv[2]
  };

  userClient.userInfo(userReq, function (err, userRes) {
    if (err) {
      return console.error(err);
    }
    const data = userRes.data;
    console.log(JSON.stringify(data, null, 4));
    const projectReq = {
      "ids": data.projects.map(function (project) {
        return project.id;
      })
    };
    projectClient.listProjects(projectReq, function (err, projectRes) {
      if (err) {
        return console.error(err);
      }
      console.log(JSON.stringify(projectRes.data, null, 4));
    });
  });
})();