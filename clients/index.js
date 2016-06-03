'use strict';

const config = require('../config');

const UserRPCClient = require('./pool/user');
const ProjectRPCClient = require('./pool/project');

const user_rpc_client = new UserRPCClient();
const project_rpc_client = new ProjectRPCClient();

module.exports = {
  "user": user_rpc_client.getClientService(config.user.address, 'User'),
  "project": project_rpc_client.getClientService(config.project.address, 'Project')
};