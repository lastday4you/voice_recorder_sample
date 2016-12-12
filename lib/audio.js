export const Audios = new FilesCollection({
  collectionName: 'audios',
  storagePath: '/data/khmer_voices/audio/',
});


console.log(Audios.schema);
if(Meteor.isServer){
  Meteor.publish("audios", function(){
    return Audios.find({}).cursor;
  });
}
