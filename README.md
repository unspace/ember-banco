# Banco

Banco is an Ember application built on Ember CLI. It attempts to demonstrate
how to use Ember and Ember Data with a formal development / build environment
to ship a non-trivial application with a realistic user experience.

## Preface

Banco means "school desk" in Italian, and in English it sort of sounds like
"bank". Here, Banco is an educational tool wherein you learn how to use Ember
by building a personal banking portal. It's a great problem context for
learning Ember since we are all familiar with it &mdash; and the scope can be
huge.

## Why Ember?

Ember does not attempt to veil the complexity of building client MVC software.
It aims to be the best library for building client MVC applications in the
browser. It does this by taking the best from decades-worth of knowledge in the
desktop world and applying it to the web platform &mdash; the Ember way is the
web standards way.

Because of Ember's nature, it can be daunting to get up and running, especially
if you have little or no experience with JavaScript or designing client-residing
programs. Ember is to frontend web applications what finite state machines are
to control statements (if-else-if). It can be hard to have to formalize your
toughts in a certain way when you are not used to it. It can seem limiting, or
even broken, but in a short time things click and you have a new approach for
building more robust software that you will be proud of.

Additionally, as your project expands in scope Ember's value becaomes an order
of magnitude greater. Ember is aware of software's nature to grow and change
over time, this is a very real problem that Ember is excellent at dealing with.

## Ember CLI

[Ember CLI](http://www.ember-cli.com) is not Ember, but a command-line tool for
managing Ember application development, you can think of it as an IDE for Ember
without the GUI. Below are some of the most commonly used Ember CLI features,
why they are useful and how they function.

### `ember serve`

This command will start up a server that runs on port `4200` by default, it will
serve your Ember application so that you can use your Ember application as you
build it. Once running you can access your application from your computer's
web browser at the address: `http://localhost:4200`

### `ember build`

This command processes your Ember application into a directory named `dist` by
default. It takes care of concatinating all of the JavaScript and CSS files, and
anything else that you might have asked Ember CLI to do. This output can then
be uploaded to a web server or static host like Amazon S3 to deploy your
application to the Internet.

### `ember test`

This command runs the test suite located in the `tests` directory. By default
it will use a library called PhantomJS to run a headless (non-gui) browser to
execute your tests in, the output will then appear in the terminal. Optionally
you can pass the `--server` option and run the suite in a browser. This is often
what you will do when you are interactively developing your application.

## Learn More

Here are some helpful links to Ember and Ember-CLI resources:

* [Ember CLI Documentation](http://ember-cli.com)
* [Ember API Documentation](http://emberjs.com/api/)
* [Ember Data API Documentation](http://emberjs.com/api/data/)
* [Promises/A+](http://promisesaplus.com/) - Information about promises
* [Handlebars.js](http://handlebarsjs.com/) - The template language used by Ember
* [ES6 Modules Reference](http://jsmodules.io/) - All the `import` and `export` stuff you see in Banco's JavaScript files
* [Broccoli Repo](https://github.com/broccolijs/broccoli) - Ember CLI uses Broccoli for processing
* [Testem Repo](https://github.com/airportyh/testem) - Testem is the test runner used for `ember test --server`
* [QUnit](http://qunitjs.com/) - The default framework Ember CLI uses for tests
* [Bower](http://bower.io/) - Package manager used by Ember CLI for browser dependencies
* [Node.js](http://nodejs.org/) - Runtime used by Ember CLI
* [NPM](https://www.npmjs.org/) - The official package manager used by Node.js and hence Ember CLI
* [Moment.js](http://momentjs.com/) - A date/time library
* [Sass](http://sass-lang.com/) - The CSS preprocessor used in Banco
* [Express.js](http://expressjs.com/) - The server framework used by Ember CLI's API stubbing functionality
