/**
 * Script.js contains code for the CS-336 Lab 2 assignment.
 * Student name: Chris Dilley (cpd5).
 * Completion date: 09/15/16.
 */

/**
 * Person() creates a simulated person with a name, birth date, and list of friends.
 * param: name, the name of the person.
 * param: birthdate, the birth date of the person.
 * param: friends, the list of friends associated with the person.
 */
function Person(name, birthdate, friends) {
	this.Name = name;
	this.birthDate = new Date(birthdate);
	this.friends = friends;
}

/**
 * Mutator for the name of the Person.
 * param: newName, the new name to be given to the Person.
 */
Person.prototype.setName = function(newName) {
	this.Name = newName;
}

Person.prototype.getName = function() {
	return this.Name;
}

/**
 * Accessor for greeting of the Person.
 * return: the greeting of the Person.
 */
Person.prototype.getGreeting = function() {
	return "I'm a person";
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

/**
 * Accessor for the list of friends (in a readable format).
 * return: the names of the friends seperated by whitespaces.
 */
Person.prototype.getFriends = function() {
	var listOfFriends = "";
	for(i = 0; i < this.friends.length; i++) {
		listOfFriends += this.friends[i] + " ";
	}
	return listOfFriends;
}

/**
 * addFriend() adds a friend to the Person's list of friends.
 * param: newFriend, the friend's name.
 */
Person.prototype.addFriend = function(newFriend) {
	this.friends.push(newFriend);
}


//Testing code
console.log("Person tests:");

//Test 1: Creating new Persons.
var p1 = new Person("Chris", "08/29/1995", ["Austin", "Derek"]);
var p2 = new Person("Joe", "04/10/1994", []);
var p3 = new Person("Eddie", "07/10/1974", ["Joe", "Chris"]);

console.log("Test 1: Creating Persons");
console.log(p1);
console.log("Friends of p1: " + p1.getFriends());
console.log(p2);
console.log("Friends of p2: " + p2.getFriends());
console.log(p3);
console.log("Friends of p3: " + p3.getFriends());

console.log("----------------------------------------");

//Test 2: Mutators and accessors
console.log("Test 2: Mutators and accessors");

console.log("Mutators: ");
p1.setName("Dawn");
p2.setName("George");

console.log("p1's new name: " + p1.getName());
console.log("p2's new name: " + p2.getName());

console.log("Accessors: ");
console.log("p1's greeting: " + p1.getGreeting());
console.log("p2's greeting: " + p2.getGreeting());
console.log("p3's greeting: " + p3.getGreeting());

console.log("p1's friends: " + p1.getFriends());
console.log("p2's friends: " + p2.getFriends());
console.log("p3's friends: " + p3.getFriends());

console.log("p1's age (should be 21): " + p1.getAge());
console.log("p2's age (should be 22): " + p2.getAge());
console.log("p3's age (should be 42): " + p3.getAge());

console.log("----------------------------------------");
//Test 3: Adding friends
p1.addFriend("Joe");
p1.addFriend("Sarah");

console.log("p1's friends: " + p1.getFriends());

p2.addFriend("Chris");
p2.addFriend("Sam");

console.log("p2's friends: " + p2.getFriends());

p3.addFriend("Jules");
p3.addFriend("Carlos");

console.log("p3's friends: " + p3.getFriends());

console.log("----------------------------------------");

//--------------Student code---------------------//

function Student(name, birthdate, friends, subject) {
	Person.call(name, birthdate, friends);
	this.subject = subject;
} 

Student.prototype = Object.create(Person.prototype);

Student.prototype.getSubject = function() {
	return this.subject;
}

Student.prototype.getGreeting = function() {
	return "I'm a student";
}

//Tests

console.log("Student tests");

//Test 1: Creating Students
console.log("Test 1: Student creation");
var s1 = new Student("Chris", "08/29/1995", ["Austin", "David"], "Computer Science");
var s2 = new Student("Carl", "05/13/1997", ["Sam", "George", "Eddie"], "Economics");
var s3 = new Student("John", "011/20/1994", ["Sarah", "Julia"], "Biology");

console.log(s1);
console.log(s2);
console.log(s3);

console.log("----------------------------------------");

//Test 2: Check if Student is a subclass of Person
console.log("Test 2: Student is a subclass of Person");

//Are the Student objects actually Students?
if(s1 instanceof Student) {
	console.log("s1 is a Student!");
}

if(s2 instanceof Student && s3 instanceof Student) {
	console.log("s2 and s3 are also Students!");
}

//Are the Student objects actually Persons?
if(s1 instanceof Person) {
	console.log("s1 is a Person, too!");
}

if(s2 instanceof Person && s3 instanceof Person) {
	console.log("s2 and s3 are Persons, too!");
}


console.log("----------------------------------------");

//Test 3: Demonstrating inheirited/polymorphic methods
console.log("Test 3: Inheritance and Polymorphism");

//Mutators

//Accessors



