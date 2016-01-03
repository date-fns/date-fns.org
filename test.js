casper.test.begin('Getting Started', function(test) {
  casper
    .start('http://localhost:5001')
    .run(function() {
      test.assertTextExists('npm install date-fns --save')
      test.done()
    })
})
