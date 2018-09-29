'use strict';

var sentences = [{
  subject: 'JavaScript',
  verb: 'is',
  object: 'great'
}, {
  subject: 'Elephants',
  verb: 'are',
  object: 'large'
}];

function say(_ref) {
  var subject = _ref.subject,
      verb = _ref.verb,
      object = _ref.object;
  console.log("".concat(subject, " ").concat(verb, " ").concat(object));
}

for (var _i = 0; _i < sentences.length; _i++) {
  var s = sentences[_i];
  say(s);
}