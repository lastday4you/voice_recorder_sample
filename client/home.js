import {Template} from 'meteor/templating';
import {Audios} from '../lib/audio';
import {Character} from '../lib/character';

let is_recording;
let audioRecorder;
Template.home.onCreated(function () {
  audioRecorder = new AudioRecorder();
  is_recording = false;
});
Template.home.onRendered(() => {
  Meteor.subscribe("audios");
  Meteor.subscribe("character", function (err, res) {
    $('.shape').shape();
  });

});
Template.home.helpers({
  characters() {
    return Character.find();
  },
  eq(a, b){
    return a == b;
  }
});

Template.home.events({
  'click #record_bt' (event, instance) {
    if (is_recording) {
      event.target.innerHTML = "record";
      let selected_word = $('#word')[0].innerText;
      let c = Character.findOne({character: selected_word});
      console.log(c);
      audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile', function (error, result) {
        let blob = new Blob([result], {type: 'audio/wav'});
        let myFile = blobToFile(blob, "audio.wav");
        myFile.c_id = c._id;
        console.log(myFile);
        let upload = Audios.insert({
          file: myFile,
          streams: 'dynamic',
          chunkSize: 'dynamic',
          meta: {c_id:c._id}
        }, false);

        upload.start();
      });

      is_recording = false;
    } else {
      event.target.innerHTML = "recording";
      audioRecorder.startRecording();
      is_recording = true;
    }
  },
  'click .shape'(event, instance){
    $('.shape').shape('flip right');
  }
});

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
