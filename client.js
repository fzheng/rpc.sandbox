'use strict';

const PROTO_PATH = './protos/helloworld.proto';
const path = require('path');
const grpc = require('grpc');
const hello_proto = grpc.load(path.resolve(PROTO_PATH)).helloworld;

function main () {
  const client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
  let user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.sayHello({
    name: user
  }, function (err, response) {
    console.log('Greeting:', response.message);
  });
}

main();