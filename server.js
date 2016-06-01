'use strict';

const PROTO_PATH = './protos/helloworld.proto';
const path = require('path');
const grpc = require('grpc');
const hello_proto = grpc.load(path.resolve(PROTO_PATH)).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello (call, callback) {
  callback(null, {
    message: 'Hello ' + call.request.name
  });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main () {
  const server = new grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {
    sayHello: sayHello
  });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();