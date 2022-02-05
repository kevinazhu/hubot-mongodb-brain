# hubot-mongodb-brain-kzhu

> Persist [Hubot](https://hubot.github.com/)'s brain to MongoDB instead of Redis.

## Usage

In a Hubot project repo, e.g. [kevinazhu/hubot-rocketchat-rss](https://github.com/kevinazhu/hubot-rocketchat-rss), run:

```
yarn add @kevinazhu/hubot-mongodb-brain;
```

Update the `./external-scripts.json` in your hubot project repo to add **hubot-mongodb-brain**:

```json
[
  "@kevinazhu/hubot-mongodb-brain"
]
```

## Configuration

Set the `MONGODB_URL` and `MONGODB_DBNAME` environment variable to specify the MongoDB deployment
to use [Default: `mongodb://localhost:27017` and `hubot-brain`].

### Debugging

Adjust the `HUBOT_LOG_LEVEL` environment variable should you run into problems.
For example, to see the actual data in hubot's brain:

```
HUBOT_LOG_LEVEL=debug ./bin/hubot;
```

For safety, the actual values inside the brain will be logged using [mongodb-redact](http://npm.im/mongodb-redact):

<img src="https://cldup.com/hQXWKKH6oX-1200x1200.png" width="600" />
