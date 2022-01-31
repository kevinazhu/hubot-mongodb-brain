var MongoClient = require('mongodb').MongoClient;
var parser = require('mongo-url-parser');
var redact = require('mongodb-redact');
var mongoUrl = process.env.MONGODB_URL ||
               process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://localhost/hubot-brain';

const parsed = parser(mongoUrl);
var client = new MongoClient(mongoUrl);

module.exports = function(robot) {
  robot.logger.info('hubot-mongodb-brain: Connecting to `%s`...', mongoUrl);
  var db;

  client.connect(function(err) {
    if (err) {
      robot.logger.error('hubot-mongodb-brain: Connection failed: `%s`', err.message);
      robot.logger.error(err.stack);
      return;
    }
    db = client.db(parsed.dbName);

    db.collection('hubot').findOne({
      _id: 'brain'
    }, function(_err, doc) {
      if (_err) {
        robot.logger.error('hubot-mongodb-brain: Lookup failed');
        robot.logger.error(_err.stack);
        return;
      }
      if (doc) {
        robot.logger.info('hubot-mongodb-brain: loaded brain from previous document');
        robot.logger.debug('hubot-mongodb-brain: %s', JSON.stringify(redact(doc), null, 2));
        robot.brain.mergeData(doc);
      } else {
        robot.logger.info('hubot-mongodb-brain: Initializing...');
        robot.brain.mergeData({});
      }
      robot.brain.resetSaveInterval(10);
      robot.brain.setAutoSave(true);
      robot.logger.info('hubot-mongodb-brain: Ready.');
    });
  });

  robot.brain.on('save', function(data) {
    data = data || {};
    data._id = 'brain';
    robot.logger.info('hubot-mongodb-brain: saving...');
    robot.logger.debug('hubot-mongodb-brain: %s', JSON.stringify(redact(data), null, 2));

    db.collection('hubot').save(data, function(err) {
      if (err) {
        robot.logger.error('hubot-mongodb-brain: Save failed: `%s`', err.message);
        return;
      }
      robot.logger.info('hubot-mongodb-brain: Saved!');
    });
  });

  robot.brain.on('close', function() {
    if (db) {
      robot.logger.info('hubot-mongodb-brain: Closing client.  Goodbye.');
      db.close();
    }
  });

  robot.brain.setAutoSave(false);
};
