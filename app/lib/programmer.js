import Ember from 'ember';

var Programmer = Ember.Object.extend({
  firstName: "",
  lastName: "",
  age: "",
  email: "",


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
  return myConf;
  }),

  conferenceNames: Ember.computed('conferences.@each.keyNote', function() {
    var names =  this.conferences.map(function(conf) {
          return conf.name;
        });
    return names;
  }),

  conferenceTotal: Ember.computed("conferences", function(){
    return this.get("conferences").length;
  }),

  itinerary: Ember.computed("conferenceTotal", function(){
    return (this.nickName + " is speaking at " + this.get("conferenceTotal") + " conferences");
  }),

  hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),

  errors: Ember.computed("firstName", "lastName", "age", "hasValidEmail", function (){
    var errorArr = [];
    if (this.get("firstName").length === 0) {
      errorArr.push("firstName cannot be blank"); 
    }
    if (this.get("lastName").length === 0) {
      errorArr.push("lastName cannot be blank");
    }
    if (this.get("age").length === 0) {
      errorArr.push("age cannot be blank"); 
    }
    if (this.get("hasValidEmail") === false) {
      errorArr.push("email must be valid");
    }
    return errorArr;
  }),

  isInvalid: Ember.computed("errors", function(){
    if (this.get("errors").length > 0) {
      return true;
    }
    else {
      return false;
    }
  }),

  isValid: Ember.computed("errors", function(){
    if (this.get("errors").length === 0) {
      return true;
    }
    else {
      return false;
    }
  }),


  hasErrors: Ember.computed("errors", function (){
    if (this.get("errors").length > 0 ) {
      return true;
    }
    else {
      return false;
    }
  })


});


export default Programmer;
