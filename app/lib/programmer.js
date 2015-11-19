import Ember from 'ember';

var Programmer = Ember.Object.extend({
  greet: function(){
    return ("Hi, My name is " + this.firstName + " " + this.lastName + ". You can call me " + this.nickName);
  },

  isOld: Ember.computed.gte('age', 30),

  wroteRuby: Ember.computed.equal('authorOf', "Ruby"),

  addConference: function(conference){
    return this.conferences.push(conference);
  },

  keyNoteConferences: Ember.computed('conferences.@each.keyNote', function() {
    var name = this.firstName + " " + this.lastName;
    var conferences = this.get('conferences');
    var myConf = conferences.filterBy('keyNote', name);
    // var names =  myConf.map(function(conf) {
    //       return conf.name;
    //     });
  return myConf;
  }),

  conferenceNames: Ember.computed('conferences.@each.keyNote', function() {
    var names =  this.conferences.map(function(conf) {
          return conf.name;
        });
    return names;
  }),

  // conferenceTotal: this.get("keyNoteConferences").length,

  conferenceTotal: Ember.computed("conferences", function(){
    return this.get("conferences").length;
  }),

  itinerary: Ember.computed("conferenceTotal", function(){
    return (this.nickName + " is speaking at " + this.get("conferenceTotal") + " conferences");
  }),

  hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/)

  // isInvalid: (),

  // isValid: (),

  // errors: (),

  // hasErrors: ()


});


export default Programmer;
