import { Meteor } from 'meteor/meteor';
import {Character} from '../lib/character';

Meteor.startup(() => {
  // code to run on server at startup
  //init character
  if (Character.find().count() == 0){
    let word = "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមសហយរលឡអវ";
    word.split("").map(function (c) {
      Character.insert({character: c});
    });
  }

  if (Meteor.users.find().count() == 0){
    let userObject = {
      username: "admin",
      mail: "admin@admin.com",
      password: "admin"
    };

    Accounts.createUser(userObject);
  }
});
