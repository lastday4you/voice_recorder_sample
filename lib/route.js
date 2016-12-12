FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/admin', {
  action: function() {
    BlazeLayout.render('admin');
  }
});

FlowRouter.route('/detail/:id', {
  action: function() {
    BlazeLayout.render('detail');
  }
});