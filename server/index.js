// To use it create some files under `routes/`
// e.g. `server/routes/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var routes     = globSync('./routes/**/*.js', { cwd: __dirname }).map(require);

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.renderModelError = function(res, field, errorMsg) {
    var error = {};
    error[field] = [errorMsg];
    res.status(422).send({ errors: error });
  };

  app.renderOne = function(res, root, obj) {
    var body = {};

    if (obj) {
      body[root] = obj;
      res.send(body);
    } else {
      res.status(404).send({
        error: {
          code: 'not_found',
          detail: 'Could not find ' + root
        }
      });
    }
  };

  app.findOne = function(collectionName, id) {
    var collection = collectionName.toUpperCase() + 'S';
    var all = app[collection];
    var i;
    var obj;

    for (i = 0; i < all.length; i++) {
      obj = all[i];

      if (obj.id === id) {
        return obj;
      }
    }

    return null;
  };

  app.filter = function(collectionName, filters) {
    var matches = [];
    var all = app[collectionName.toUpperCase()];
    var i;
    var obj;
    var key;
    var value;
    var isMatch;

    for (i = 0; i < all.length; i++) {
      obj     = all[i];
      isMatch = true;

      for (key in filters) {
        value = filters[key];

        if (value instanceof Array) {
          if (value.indexOf(obj[key]) === -1) {
            isMatch = false;
            break;
          }
        } else {
          if (obj[key] !== value) {
            isMatch = false;
            break;
          }
        }
      }

      if (isMatch) {
        matches.push(obj);
      }
    }

    return matches;
  };

  routes.forEach(function(route) { route(app); });
};
