import {Audios} from '../lib/audio';

Template.detail.onCreated(function () {
  Meteor.subscribe("audios");
});

Template.detail.helpers({
  param(){
    return FlowRouter.getParam('id');
  },
  audios(){
    return Audios.find({"meta.c_id":FlowRouter.getParam('id')});
  }
});