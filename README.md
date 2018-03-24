# Memorii

> Back-end for Telegram bot which helps with words memorizing.

Installation
----

+ Run commands :arrow_down:

`git clone https://github.com/KarinaDavtyan/memorii-backend.git`

`cd memorii-backend`

`yarn install`

+ Add `.env` file

Set:

`SECRET` - jwt secret key.
(Find out more about [express-jwt](https://github.com/auth0/express-jwt))

`ORIGIN` - [Access-ControlAllow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) headers

`MONGO_DB` and run `mongod` [command](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) from terminal

or

`MONGOLAB_MEMORII` - create a db on [mLab](https://mlab.com/)


+ Follow installation steps of [memorii](https://github.com/KarinaDavtyan/memorii)

To find out more about bot itself, go the memorii-bot repo [here](https://github.com/KarinaDavtyan/memorii-bot)

Tech-stack
----

+ Node + Express
+ MongoDB + mongoose

Contributing
----

+ Fork the repo (https://github.com/KarinaDavtyan/memorii-backend/fork)
+ Clone it
+ Create your feature branch
+ Commit changes to your own branch
+ Push to the branch
+ Create a new Pull Request
