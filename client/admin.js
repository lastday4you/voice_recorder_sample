import {Character} from '../lib/character';

Template.admin.onCreated(function () {
    Meteor.subscribe("character");
});

Template.admin.helpers({
  // audios: function () {
  //   return Audios.find({"meta.c_id":"gikMNnooJEzEi9WGr"});
  // }
  words(){
    return Character.find();
  }
});

Template.admin.events({
  "submit #login_form": function(event){
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    Meteor.loginWithPassword(username,password);
  },
  "click .word_bt"(event){
    FlowRouter.go("/detail/" + this._id);
  }
});
