Router.configure({
  //layoutTemplate: 'layout' // here we say that layout template will be our main layout
});


Router.route('/view3', function () {
  this.render('view3');
});


Router.route('/view4', function () {
  this.render('view4');
});


Router.route('/', function () {
 // this.render('view3');
});

