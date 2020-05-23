---
title: "I overcame my fear of JavaScript ES6 in one hour. Here is what I learned"
description: "I learned the syntax improvements made in ES6 in about an hour through the Google Africa Challenge Scholarship program on Udacity. In this post, I’m going to share a summary of what I learned with you."
image: "/assets/images/posts/beautiful-code.jpeg"
date: 2018-05-20
topics: ["JavaScript"]
published: true
allowComments: true
---

I learned the syntax improvements made in ES6 in about an hour through the <a href="https://admissions.udacity.com/apply/google-africa-scholarships" target="_blank">Google Africa Challenge Scholarship</a> program on <a href="https://udacity.com" target="_blank">Udacity</a>. In this post, I’m going to share a summary of what I learned with you.

<figure>
  <img src="/assets/images/posts/beautiful-code.jpeg" alt="Artistic photo of code">
  <figcaption>Photo by <a href="https://unsplash.com/@boshkov" rel="photo-creator noopener nofollow noopener" target="_blank">Ilija Boshkov</a> on <a href="https://unsplash.com" rel="photo-source noopener nofollow noopener" target="_blank">Unsplash</a></figcaption>
</figure>


I have been hearing about these new versions of the JavaScript language, often called Harmony, ES6 or ES2015… and I was like: Wow! Am I going to master that one day? I’m sure I can’t. It’s too difficult. It is not even supported by all browsers so, why bother? And so, I never tried to learn it seriously, until last night, thanks to **Google Africa** and Udacity through the Google Africa Challenge Scholarship.

I’m actually a 2018 recipient of the scholarship and I am currently taking the **Mobile Web Specialist** track. In the program, we have these lessons about the new features of the JavaScript language. Features that any cool kid from the future should know. I’ve always wanted to be like that cool kid from the future and know everything about template literals, destructuring, spread and rest operators…But I was too scared to sit down and learn the thing. Always finding excuses like, I don’t need it or it’s not yet supported and many more.

So last night, after finishing the lessons about Indexed DB, I started the **lesson 6: Syntax**. The purpose of the lesson was to introduce us to the new syntaxes available in new versions of JavaScript. I was captivated from the first video and my curiosity kept growing while I was going through the materials and the quizzes. I still don’t know how, but one hour later, I was done with the lesson, looking forward to the next one. I enjoyed it so much and learn a lot from it in a such small amount of time. I was going to continue immediately with the next lesson: **Functions**, when I decided to take a break and meditate a while about everything I just learned. So I started writing this post, which is actually my first post ever.

If you are just like me and are still hesitating to try new ES6 features, well keep reading. I will share what I learned with you. Maybe it might convince you to give it a try.

## What I learned about new ES6 features

### Let and Const

The first thing I learn was the new ways of declaring a variable in JavaScript. Before ES6, there was only one way of declaring variables. Using the keyword `var` . But we can get in trouble with it if not used correctly. Take a close look at the code below:

```js
function smile(isHappy) {
  if (isHappy) {
    var smiling = 'I am happy!';
  } else {
    var sad = 'I am sad!';
    console.log(smiling);
  }
}

smile(false);
```

One might expect it to throw a `ReferenceError`: smiling is not defined. But it doesn’t throw an error. This is actually due to variable hoisting which is a result of how JavaScript is interpreted by your browser. In fact at run-time all variables declared with `var` are hoisted, means, they are raised to the top of the scope of the function in which they were declared, like this:

```js
function smile(isHappy) {
  var smiling;
  var sad;
  if (isHappy) {
    smiling = 'I am happy!';
  } else {
    sad = 'I am sad!';
    console.log(smiling);
  }
}

smile(false);  // undefined
```

You can get around this issue by using the new keywords `let` or `const`. Variables declared with these keywords are always scoped to the block in which they are defined.

```js
function smile(isHappy) {
  if (isHappy) {
    const smiling = 'I am happy!';
  } else {
    const sad = 'I am sad!';
    console.log(smiling);
  }
}

smile(false);  // ReferenceError: smiling is not defined
```

```js
function smile(isHappy) {
  if (isHappy) {
    let smiling = 'I am happy!';
  } else {
    let sad = 'I am sad!';
    console.log(smiling);
  }
}

smile(false);  // ReferenceError: smiling is not defined
```

Our code now works as expected with either let or const. Variables defined in the `if` and `else` blocks are stuck in those respective blocks and cannot be accessed in the outside. Therefore the `ReferenceError` is now raised.

Now you might be asking yourself, what’s the difference between `let` and `const` then? Well here it is:

* Variables declared with `let` can be reassigned, but they cannot be re-declared in the same scope (understand the same function or block).
* Variables declared with `const` must be assigned an initial value, but can’t be re-declared in the same scope, and can’t be reassigned.

From here you might also be wondering when you should use one of them and not the other. Here is the simple rule:

* use `let` when you plan to reassign new values to a variable.
* use `const` when you don’t plan on reassigning new values to a variable.

But the general rule is, always use `const` to declare your variables. If you find that you need to update a variable, then change its declaration to use `let`.

### Template Literals

After `let` and `const`, came **Template Literals**. They are essentially string literals that include embedded expressions. Denoted with back-ticks ( `` ) instead of single quotes ( '' ) or double quotes ( "" ), template literals can contain placeholders which are represented using `${expression}`.

Prior to ES6 we use to concatenate strings using the string concatenation operator `+` like this:

```js
var name = 'Valery Melou';
var message = 'Hello! My name is ' + name + '.';

console.log(message);  // Hello! My name is Valery Melou.
```

This can get tricky if you have a string that span multiple lines. Hopefully ES6 came to the rescue with template literals. They are what a cool kid from the future should use to concatenate his strings, just like this:

```js
const name = 'John Doe';
const message = `Hello! My name is ${name}.`;

console.log(message);  // Hello! My name is John Doe.
```

And you should know that, they are not only meant for referencing variables. In fact you can perform operations, call functions, use for loops and more. Check this example:

```js
const a = 10;
const b = 20;
const result = `The sum of ${a} and ${b} is ${a + b}.`

console.log(result);  // The sum of 10 and 20 is 30.
```

### Destructuring
The next feature I learned about was Destructuring. This is a cool feature that I’ve been using for a while, when programming in Python. It allows you to extract data from arrays and objects into distinct variables.

Here is an example of how we would have done that, prior to ES6:

```js
var coordinates = [10, 30, 5];
var x = coordinates[0];
var y = coordinates[1];
var z = coordinates[2];

console.log(x, y, z);  // 10 30 5
```

With the destructuring feature of ES6, we could do that in just one line:

```js
const coordinates = [10, 30, 5];
const [x, y, z] = coordinates;

console.log(x, y, z);  // 10 30 5
```

You can also use destructuring to extract data from objects. It works just like for arrays. In old versions of JavaScript, here is how you would extract `firstName`, `lastName` and `age` from the object `person`:

```js
var person = {
  firstName: "John",
  lastName: "Doe",
  age: 15
};

var firstName = person.firstName;
var lastName = person.lastName;
var age = person.age;

console.log(firstName, lastName, age);  // John Doe 15
```

Now here is how you could do it with destructuring:

```js
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 15
};

let {firstName, lastName, age} = person;

console.log(firstName, lastName, age);  // John Doe 15
```

Simple right?

If you arrived here, it means that you are probably interested in these new features and that’s great. If you are not, don’t give up now. It is just getting better.

### Object Literal Shorthand

If you write JavaScript often, there are chances that you have found yourself doing this:

```js
var firstName = "John";
var lastName = "Doe";
var age = 10;

var person = {
  firstName: firstName,
  lastName: lastName,
  age: age
};

console.log(person);  // {firstName: "John", lastName: "Doe", age: 10}
```

You can see that the keys of the object you are trying to create are the same as the name of the variables holding the values. It’s a bit redundant. In ES6 you can get rid of the redundancy with **Object Literal Shorthand**. They only consist in specifying the name of the variable holding the value for each key of the object. The name of the key will then be inferred from the name of the variable. Take a look at the following code:

```js
const firstName = "John";
const lastName = "Doe";
const age = 10;

const person = {
  firstName,
  lastName,
  age,
}

console.log(person);  // {firstName: "John", lastName: "Doe", age: 10}
```

How cool is that? The keys of the object are guessed from the name of the variables used to create the object. And it works for functions too:

```js
const firstName = "John";
const lastName = "Doe";
const birth = 1980;
const death = 1990;

const person = {
  firstName,
  lastName,
  age() {
    return death - birth;
  }
}

console.log(person);  // {firstName: "John", lastName: "Doe", age: f}
```

Now `age` is a function that you can get the age of the person with `person.age()`.

### For…of loop

Then we have the **for…of loop**, the most recent way of looping through things in JavaScript. But before seeing how it works let see how we use to do it prior to ES6.

**The for loop**: It requires you to track the **counter** and the **exit condition**. In the following example we track the counter with the variable `i` and the exit condition is determined using `digits.length`.

```js
var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (var i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}

/**
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
 */
```

**The for…in loop**: Same as the for loop but you don’t track the counter nor the exit condition. Instead you iterate over the indexes (which in this case are all enumerable properties) of the objects you are looping through. You can see in the following example how we are looping through the indexes of the array, but not the items in the array.

```js
var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (var index in digits) {
  console.log(digits[index]);
}

/**
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
 */
```

And if you add a property to the object you are looping through, that property will also be included in the loop:

```js
Array.prototype.decimalfy = function() {
  for (var i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (var index in digits) {
  console.log(digits[index]);
}

/**
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
 function() {
 for (let i = 0; i < this.length; i++) {
  this[i] = this[i].toFixed(2);
 }
 }
 */
```

We used to walk around this by using the `.hasOwnProperty` method of the object in JavaScript.

The **for…of loop** is the solution to all those problems. It can loop over any type of iterable (object that you can iterate over it). Let’s see how to use it with this example:

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}

/**
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
 */
```

You can see that we are really iterating over the items of the array and printing them directly. Plus you can stop the looping (using `break`)or continue to the next item (using `continue`) at anytime, maybe when a condition is matched:

```js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}

/**
 1
 3
 5
 7
 9
 */
```

And if a property gets added to the object, it is not considered while looping with **for…of loop**:

```js
Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}

/**
 0
 1
 2
 3
 4
 5
 6
 7
 8
 9
 */
```

See how the method added to the prototype is no longer logged like it was with the **for…in loop**.

That’s it for the new **for…of loop**. We are almost there. There are two more other features of ES6 that I learned during that night.

### Spread… Operator
The spread operator, written with three consecutive dots ( `...` ), is new in ES6 and gives you the ability to expand, or spread, iterable objects into multiple elements. Take a look at these examples to see how it works.

```js
// Example 1
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);  // Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

// Example 2
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
console.log(...primes);  // 2 3 5 7 11 13 17 19 23 29

// Example 3
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = [...fruits, ...vegetables];
console.log(produce);  // ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

```

In the last example, you can see how we use the spread operator to concatenate two arrays.

### …Rest Parameter
To finish, here is the rest parameter, also written with three consecutive dots ( ... ). It allows you to represent an indefinite number of elements as an array. Let see some cases where it can be handy to use it:

```js
// Example 1
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);  // 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

// Example 2
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}
console.log(sum(10, 20, 30));  // 60
console.log(sum(20, 20));  // 40
```

## Conclusion
That’s a summary of what I learned in one hour about these new features of ES6. I don’t fear to learn them anymore and I’m actually continuing with the lessons about that in the Google Africa Challenge Scholarship, learning about improvements made to functions, built-ins and more. In fact I might write about it all as well one of this days. But for now, I hope you enjoyed this one and that, if you were afraid of trying those features like I did before, hope you aren't anymore. Go out that there and write some ES6. #happycoding.
