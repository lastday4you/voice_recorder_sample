import { Template } from 'meteor/templating';
import { Audios } from '../lib/audio';
import { Character } from '../lib/character';

let is_recording;
let audioRecorder;


let countdown = new ReactiveCountdown(10);

//when timer is completed
countdown.start(function () {
  console.log("hello");
  countdown.add(10);
});

Template.home.onCreated(function () {
  audioRecorder = new AudioRecorder();
  is_recording = false;
  countdown.stop();
});

Template.home.onRendered(() => {
  Meteor.subscribe("audios");
  Meteor.subscribe("character", function (err, res) {
    $('.shape').shape();
  });
  $('#time-bar').progress({
    total: 10,
    value: 10
  });

});
Template.home.helpers({
  characters() {
    return Character.find();
  },
  eq(a, b) {
    return a == b;
  },
  getCountdown: function () {
    return countdown.get();
  }
});

Template.home.events({
  'click #record_bt'(event, instance) {
    countdown.start();
    Tracker.autorun(function () {
      if (countdown.get() == 3) {
        console.log("work");
      }
      $('#time-bar').progress({
        total: 10,
        value: countdown.get()
      });
      console.log(countdown.get());
    });
    // if (is_recording) {
    //   event.target.innerHTML = "record";
    //   let selected_word = $('#word')[0].innerText;
    //   let c = Character.findOne({character: selected_word});
    //   console.log(c);
    //   audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile', function (error, result) {
    //     let blob = new Blob([result], {type: 'audio/wav'});
    //     let myFile = blobToFile(blob, "audio.wav");
    //     myFile.c_id = c._id;
    //     console.log(myFile);
    //     let upload = Audios.insert({
    //       file: myFile,
    //       streams: 'dynamic',
    //       chunkSize: 'dynamic',
    //       meta: {c_id:c._id}
    //     }, false);

    //     upload.start();
    //   });

    //   is_recording = false;
    // } else {
    //   event.target.innerHTML = "recording";
    //   audioRecorder.startRecording();
    //   is_recording = true;
    // }
  },
  'click .shape'(event, instance) {
    $('.shape').shape('flip right');
  }
});

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
