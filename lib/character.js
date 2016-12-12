export const Character = new Mongo.Collection("characters");

CharacterSchema = new SimpleSchema({
  character: {
    type: String,
  }
});

Character.attachSchema(CharacterSchema);

if(Meteor.isServer){
  Meteor.publish("character", function(){
    return Character.find({});
  });
}