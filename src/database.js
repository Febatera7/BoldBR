import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://192.168.99.100:27017/bolddatabase',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
