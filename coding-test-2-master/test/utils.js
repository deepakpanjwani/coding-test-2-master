const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const port = 27017;
const mongod = new MongoMemoryServer({
  instance: {
    port,
  },
  autoStart: false,
});

const setup = async () => {
  await mongod.start();
  if (mongod.instanceInfoSync.port !== port) {
    throw new Error(`Failed to startup, :${port} already in use`);
  }
  await mongoose.connect(`mongodb+srv://wipro-assign:Wipro2354@cluster0.mozqh.mongodb.net/pets?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

before(async () => {
  await setup();
});