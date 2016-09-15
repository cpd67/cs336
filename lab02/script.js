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
 * Accessor for the name of the Person. 
 * return: the name of the Person.
 */
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

/**
 * Accessor for the age of the Person.
 * (Taken from http://jsfiddle.net/codeandcloud/n33RJ/)
 * return: the numerical age of the Person.
 */
Person.prototype.getAge = function() {
	//Compute the age of the Person using today's date and 
	//the stored birthdate.
	var today = new Date();  
	var age = today.getFullYear() - this.birthDate.getFullYear();
	var month = today.getMonth() - this.birthDate.getMonth();
	//If today's month equals 0, or today's date is less than the birthdate...
	if (month < 0 || (month === 0 && today.getDate() < this.birthDate.getDate())) {
		//Subtract one from the age
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
 * addFriend() is a mutator method that adds a friend to the Person's list of friends.
 * param: newFriend, the friend's name.
 */
Person.prototype.addFriend = function(newFriend) {
	this.friends.push(newFriend);
}

/**
 * Mutator for the name of the Person.
 * param: newName, the new name to be given to the Person.
 */
Person.prototype.setName = function(newName) {
	this.Name = newName;
}

//Testing Person code
console.log("Person tests:");

//Test 1: Creating new Persons.
console.log("Test 1: Creating Persons");

var p1 = new Person("Chris", "08/29/1995", ["Austin", "Derek"]);
var p2 = new Person("Joe", "04/10/1994", []);
var p3 = new Person("Eddie", "07/10/1974", ["Joe", "Chris"]);

//Print them out
console.log("Person p1: ");
console.log(p1);
console.log("Friends of p1: " + p1.getFriends());
console.log("Person p2: ");
console.log(p2);
console.log("Friends of p2: " + p2.getFriends());
console.log("Person p3: ");
console.log(p3);
console.log("Friends of p3: " + p3.getFriends());

console.log("----------------------------------------");

//Test 2: Mutators and accessors
console.log("Test 2: Mutators and accessors");

//Mutators
console.log("Mutators: ");

//setName()
console.log("setName()");

//p1
console.log("Person p1: ");
console.log(p1);
p1.setName("Dawn");
console.log("p1's new name: " + p1.getName());

//p2
console.log("Person p2: ");
console.log(p2);
p2.setName("George");
console.log("p2's new name: " + p2.getName());

//addFriend()
console.log("addFriend()");

//p1
console.log("p1's friends: " + p1.getFriends());
p1.addFriend("Joe");
p1.addFriend("Sarah");
console.log("p1's friends now: " + p1.getFriends());

//p2
console.log("p2's friends: " + p2.getFriends());
p2.addFriend("Chris");
p2.addFriend("Sam");
console.log("p2's friends now: " + p2.getFriends());

//p3
console.log("p3's friends: " + p3.getFriends());
p3.addFriend("Jules");
p3.addFriend("Carlos");
console.log("p3's friends now: " + p3.getFriends());

//Accessors
console.log("Accessors: ");

//getName()
console.log("getName()");
console.log("p1's name: " + p1.getName());
console.log("p2's name: " + p2.getName());
console.log("p3's name: " + p3.getName());

//getGreeting()
console.log("getGreeting()");
console.log("p1's greeting: " + p1.getGreeting());
console.log("p2's greeting: " + p2.getGreeting());
console.log("p3's greeting: " + p3.getGreeting());

//getFriends()
console.log("getFriends()");
console.log("p1's friends: " + p1.getFriends());
console.log("p2's friends: " + p2.getFriends());
console.log("p3's friends: " + p3.getFriends());

//getAge()
console.log("getAge()");
console.log("p1's age (should be 21): " + p1.getAge());
console.log("p2's age (should be 22): " + p2.getAge());
console.log("p3's age (should be 42): " + p3.getAge());

console.log("----------------------------------------");

//Test 3: Comparing ages
console.log("Test 3: Comparing ages");

//p1 is younger than p2
if(p1.getAge() < p2.getAge()) {
	console.log("p1 is younger than p2!");
} else {
	console.log("getAge() test failed for p1 and p2 age comparison!");
}

//p2 is younger than p3
if(p2.getAge() < p3.getAge()) {
	console.log("p2 is younger than p3!");
} else {
	console.log("getAge() test failed for p2 and p3 age comparison!");
}

//p3 is older than p1
if(p3.getAge() > p1.getAge()) {
	console.log("p3 is older than p1!");
} else {
	console.log("getAge() test failed for p3 and p1 age comparison!");
}

console.log("Person tests completed!");

console.log("----------------------------------------");

//--------------Student code---------------------//

/**
 * Student() is a subclass of Person and creates a Student object.
 * param: name, the name of the Student.
 * param: birthdate, the birth date of the Student.
 * param: friends, the list of friends of the Student.
 * param: subject, the subject that the Student is studying.
 */
function Student(name, birthdate, friends, subject) {
	Person.call(this, name, birthdate, friends);
	this.subject = subject;
} 

//Student prototype needs to be a child of the Person prototype.
//(This needs to happen BEFORE we add any functions to it.)
Student.prototype = Object.create(Person.prototype);

/**
 * Accessor method for the subject of the Student.
 * return: the subject that the Student is studying.
 */
Student.prototype.getSubject = function() {
	return this.subject;
}

/**
 * Accessor method for the greeting of the Student.
 * (Exhibits polymorphic behavior, as the Person object prototype also has a getGreeting() function).
 * return: the greeting of the Student.
 */
Student.prototype.getGreeting = function() {
	return "I'm a student";
}

//Tests for Student code
console.log("Student tests:");

//Test 1: Creating Students
console.log("Test 1: Student creation");
var s1 = new Student("Chris", "08/29/1995", ["Austin", "David"], "Computer Science");
var s2 = new Student("Carl", "05/13/1997", ["Sam", "George", "Eddie"], "Economics");
var s3 = new Student("John", "11/20/1994", ["Sarah", "Julia"], "Biology");

//Print them out
console.log("Student s1: ");
console.log(s1);
console.log("s1's greeting: " + s1.getGreeting());
console.log("s1's friends: " + s1.getFriends());
console.log("Student s2: ");
console.log(s2);
console.log("s2's greeting: " + s2.getGreeting());
console.log("s2's friends: " + s2.getFriends());
console.log("Student s3: ");
console.log(s3);
console.log("s3's greeting: " + s3.getGreeting());
console.log("s3's friends: " + s3.getFriends());

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
console.log("Mutators: ");

//setName()
console.log("setName()");

//s1
console.log("Student s1: ");
console.log(s1);
s1.setName("Jerry");
console.log("s1's new name: " + s1.getName());

//s2
console.log("Student s2: ");
console.log(s2);
s2.setName("Candice");
console.log("s2's new name: " + s2.getName());

//addFriend()
console.log("addFriend()");

//s1
console.log("s1's friends: " + s1.getFriends());
s1.addFriend("Ramone");
s1.addFriend("Carrie");
console.log("s1's friends now: " + s1.getFriends());

//s3
console.log("s3's friends: " + s3.getFriends());
s3.addFriend("Susan");
s3.addFriend("Robert");
console.log("s3's friends now: " + s3.getFriends());

//Accessors
console.log("Accessors: ");

//getName()
console.log("getName()");
console.log("s1's name: " + s1.getName());
console.log("s2's name: " + s2.getName());
console.log("s3's name: " + s3.getName());

//getFriends()
console.log("getFriends()");
console.log("s1's friends: " + s1.getFriends());
console.log("s2's friends: " + s2.getFriends());
console.log("s3's friends: " + s3.getFriends());

//getSubject()
console.log("getSubject()");
console.log("s1's subject: " + s1.getSubject());
console.log("s2's subject: " + s2.getSubject());
console.log("s3's subject: " + s3.getSubject());

//getGreeting()
console.log("getGreeting()");
console.log("s1's greeting: " + s1.getGreeting());
console.log("s2's greeting: " + s2.getGreeting());
console.log("s3's greeting: " + s3.getGreeting());

//getAge()
console.log("getAge()");
console.log("s1's age (should be 21): " + s1.getAge());
console.log("s2's age (should be 19): " + s2.getAge());
console.log("s3's age (should be 21): " + s3.getAge());

console.log("Student tests completed!");
