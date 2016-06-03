(function () {
  'use strict';

  const async = require('async');
  const clients = require('./clients');

  async.waterfall([
    // step 1: get user name
    function (callback) {
      if (process.argv.length < 3) {
        return callback(new Error("Username is required"));
      }
      const userReq = {
        name: process.argv[2]
      };
      callback(null, userReq);
    },
    // step 2: get project ids for the user
    function (userReq, callback) {
      clients.user.userInfo(userReq, function (err, userRes) {
        if (err) {
          return callback(err);
        }
        const projectReq = {
          "ids": userRes.data.projects.map(function (project) {
            return project.id;
          })
        };
        callback(null, projectReq);
      });
    },
    // step 3: get project names for those project ids
    function (projectReq, callback) {
      clients.project.listProjects(projectReq, function (err, projectRes) {
        if (err) {
          return callback(err);
        }
        callback(null, projectRes.data);
      });
    }
  ], function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(result, null, 4));
    }
  });
})();