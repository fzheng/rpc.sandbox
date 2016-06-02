'use strict';

const config = require('../config');
const UserRPCServer = require('./pool/user');
const ProjectRPCServer = require('./pool/project');

const user_rpc_server = new UserRPCServer();
const project_rpc_server = new ProjectRPCServer();

user_rpc_server.start(config.user.address);
project_rpc_server.start(config.project.address);