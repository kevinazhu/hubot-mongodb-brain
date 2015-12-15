# hubot-mongodb-brain [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url] [![slack][slack_img]][slack_url]

> Persist [Hubot][hubot]'s brain to MongoDB instead of Redis.

## Usage

In a Hubot project repo, e.g. [@mongodb-js/hubot](https://github.com/mongodb-js/hubot), run:

```
npm install hubot-mongodb-brain --save;
```

Update the `./external-scripts.json` in your hubot project repo to add **hubot-mongodb-brain**:

```json
[
  "hubot-mongodb-brain"
]
```

## Configuration

Set the `MONGODB_URL` environment variable to specify the MongoDB deployment
to use [Default: `mongodb://localhost:27017`].  For example:

```
heroku config:set MONGODB_URL=mongodb://db.slack.mongodb.parts:27017/slack;
```

### Debugging

Adjust the `HUBOT_LOG_LEVEL` environment variable should you run into problems.
For example, to see the actual data in hubot's brain:

```
HUBOT_LOG_LEVEL=debug ./bin/hubot;
```

For safety, the actual values inside the brain will be logged using [mongodb-redact](http://npm.im/mongodb-redact):

<img src="https://cldup.com/hQXWKKH6oX-1200x1200.png" width="600" />

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/hubot-mongodb-brain.svg
[travis_url]: https://travis-ci.org/mongodb-js/hubot-mongodb-brain
[npm_img]: https://img.shields.io/npm/v/hubot-mongodb-brain.svg
[npm_url]: https://npmjs.org/package/hubot-mongodb-brain
[slack_url]: https://slack.mongodb.parts/
[slack_img]: https://slack.mongodb.parts/badge.svg
[hubot]: https://hubot.github.com/
