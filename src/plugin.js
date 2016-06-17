module.exports = function(babel) {
  var t = babel.types;

  return {
    visitor: {
      Program: {
        exit: function(path, state) {
          var importDeclaration = t.importDeclaration(
            [],
            t.stringLiteral("source-map-support/register")
          );

          path.unshiftContainer('body', importDeclaration);
        }
      }
    }
  };
};
