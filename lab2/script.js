/**
 *
 *
 */

function Person(name, birthdate, friends) {
	this.Name = name;
	this.birthDate = new Date(birthdate);
	this.friends = friends;
}

//Mutator method for name
Person.prototype.setName = function(newName) {
	this.Name = newName;
}

//Adding a friend
Person.prototype.addFriend = function(newFriend) {
	this.friends.push(newFriend);
}


//Mutator method for greeting
Person.prototype.setGreeting = function(newGreeting) {
	this.greeting = newGreeting;
}

//Print the greeting
Person.prototype.printGreeting = function() {
	console.log("I'm a person");
}

Person.prototype.printFriends = function() {
	
}

//Accessor for age
//Taken from http://jsfiddle.net/codeandcloud/n33RJ/
Person.prototype.getAge = function() {
	var today = new Date();  
	var age = today.getFullYear() - this.birthDate.getFullYear();
	var month = today.getMonth() - this.birthDate.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < this.birthDate.getDate())) {
		age--;
	}
	return age;
}

//Testing code

//Test 1: Creating new Persons.
var p1 = new Person("Chris", "08/29/1995", ["Austin", "Derek"]);
var p2 = new Person("Joe", "08/29/1994", []);
var p3 = new Person("Eddie", "07/10/1974", ["Joe", "Chris"]);

console.log("Test 1: Creating Persons");
console.log(p1);
console.log(p2);
console.log(p3);

//Test 2: Mutators and accessors
console.log("Test 2: Mutators and accessors");

p1.printGreeting();
p2.printGreeting();
p3.printGreeting();

//Test 3: Adding friends
p1.addFriend("Joe");
p1.addFriend("Sarah");

console.log(p1);
console.log(p2);
