// data.js
// Exports the data object for use in main.js

export const data = {
    introduction: {
        title: "Welcome to Interactive JS Brain Teasers",
        content: `
            <p class="text-lg text-gray-700 mb-4">JavaScript, a cornerstone of modern web development, possesses a unique set of characteristics that can often lead to unexpected behaviors. This interactive guide is designed to demystify these intricate concepts by presenting them as challenging questions.</p>
            <p class="text-gray-600">Navigate through the topics on the left to explore common "brain teasers" related to concepts like <strong>this</strong>, <strong>Hoisting</strong>, <strong>Closures</strong>, and more. Each section provides code challenges to test your knowledge. Click "Reveal Solution" to see a detailed explanation of *why* JavaScript behaves the way it does. The goal is to cultivate a deeper understanding and help you write more robust, predictable code.</p>
            <div class="mt-8 p-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 rounded-r-lg">
                <p class="font-semibold">Getting Started</p>
                <p>Select a topic from the sidebar to begin your journey into the depths of JavaScript!</p>
            </div>
        `
    },
    thisKeyword: {
        title: "I. The Enigmatic `this` Keyword",
        intro: "The `this` keyword in JavaScript is one of its most complex features. Its value is determined by how a function is called (the 'call-site'), not where it's defined. This section explores the different binding rules and common scenarios where `this` can cause confusion.",
        teasers: [
            {
                question: "Question 1.1: Global vs. Function Context",
                code: "console.log(globalThis);\n\nfunction regularFunction() {\n  console.log(this);\n}\nregularFunction();\n\nfunction strictFunction() {\n  'use strict';\n  console.log(this);\n}\nstrictFunction();",
                solution: "Global Scope: `Window` object (in browser)\n`regularFunction()`: `Window` object\n`strictFunction()`: `undefined`",
                explanation: "In the global scope, `this` refers to the global object (`window` in browsers). A `regularFunction` call also defaults `this` to the global object. However, in `'use strict';` mode, a standalone function call sets `this` to `undefined` to prevent accidental modification of the global object."
            },
            {
                question: "Question 1.2: Method Invocation & Context Loss",
                code: "const person = {\n  name: 'Alice',\n  greet: function() {\n    console.log(`Hello, my name is ${this.name}`);\n  }\n};\n\nperson.greet();\n\nconst standaloneGreet = person.greet;\nstandaloneGreet();",
                solution: "`person.greet()`: `Hello, my name is Alice`\n`standaloneGreet()`: `Hello, my name is undefined`",
                explanation: "When `person.greet()` is called, `this` refers to the `person` object. However, when the function is assigned to `standaloneGreet` and called alone, it loses its original context. The `this` context defaults to the global object, which has no `name` property, resulting in `undefined`."
            },
            {
                question: "Question 1.3: Arrow Functions and Lexical `this`",
                code: "const obj = {\n  value: 42,\n  getValue: function() {\n    console.log(this.value); // `this` is obj\n    const arrowFunc = () => {\n      console.log(this.value); // `this` is inherited from getValue\n    };\n    arrowFunc();\n  },\n  getArrowValue: () => {\n    // `this` is inherited from the global scope\n    console.log(this.value);\n  }\n};\n\nobj.getValue();\nobj.getArrowValue();",
                solution: "`obj.getValue()` logs: `42`, then `42`\n`obj.getArrowValue()` logs: `undefined`",
                explanation: "Arrow functions do not have their own `this` binding; they inherit it from their surrounding (lexical) scope. Inside `getValue`, `this` is `obj`, so the nested arrow function also uses `obj` as `this`. However, `getArrowValue` is an arrow function defined in the global scope, so its `this` refers to the global object, not `obj`."
            },
            {
                question: "Question 1.4: `this` in Event Handlers",
                code: "// This example assumes an HTML button with id 'myButton' exists on the page.\nconst myButton = document.getElementById('myButton');\n\nif (myButton) {\n  // Regular function as event listener\n  myButton.addEventListener('click', function() {\n    console.log('Regular function:', this.id);\n  });\n\n  // Arrow function as event listener\n  myButton.addEventListener('click', () => {\n    console.log('Arrow function:', this.id);\n  });\n} else {\n  console.warn(\"Button with ID 'myButton' not found. Cannot set up event listeners for Question 1.4.\");\n}",
                solution: "When button is clicked:\nRegular function: `myButton`\nArrow function: `undefined`",
                explanation: "In a traditional event listener (regular function), `this` is bound to the element that dispatched the event (`myButton`). For an arrow function, `this` is lexically bound to its surrounding scope. If defined globally (as in this example), `this` refers to the global object (`window`), which does not have an `id` property, hence `undefined`."
            }
        ],
        extraContent: `
            <h3 class="text-xl font-semibold mt-8 mb-4">Interactive Example: 'this' in Event Listeners</h3>
            <p class="mb-4 text-gray-600">Click the button below and observe the console output for Question 1.4 regarding the <code>this</code> keyword.</p>
            <button id="myButton" class="btn-accent font-semibold py-2 px-4 rounded-lg">Click Me</button>
        `
    },
    hoisting: {
        title: "II. Hoisting: The JavaScript Time Traveler",
        intro: "Hoisting is JavaScript's behavior of treating declarations as if they are 'moved' to the top of their scope before code execution. This section explores how `var`, `let`, `const`, and function declarations are hoisted differently, and the concept of the 'Temporal Dead Zone' (TDZ).",
        teasers: [
            {
                question: "Question 2.1: `var` Hoisting and Scope Confusion",
                code: "function example() {\n  console.log(x); \n  var x = 10;\n  console.log(x);\n\n  if (true) {\n    var x = 20; // Re-declares the same variable\n    console.log(x);\n  }\n\n  console.log(x);\n}\nexample();",
                solution: "Logs: `undefined`, `10`, `20`, `20`",
                explanation: "The declaration `var x` is hoisted to the top of the function, so the first log is `undefined`. Because `var` is function-scoped (not block-scoped), the `var x = 20` inside the `if` block reassigns the *same* variable, which is why the final log is `20`, not `10`."
            },
            {
                question: "Question 2.2: The Temporal Dead Zone (TDZ)",
                code: "function anotherExample() {\n  try {\n    console.log(y);\n  } catch (e) {\n    console.log(e.message);\n  }\n  let y = 10;\n  console.log(y);\n\n  if (true) {\n    let y = 20; // A new, block-scoped variable\n    console.log(y);\n  }\n  console.log(y);\n}\nanotherExample();",
                solution: "Logs: `Cannot access 'y' before initialization`, `10`, `20`, `10`",
                explanation: "Variables declared with `let` are hoisted but are in a 'Temporal Dead Zone' (TDZ) until their declaration is reached. Accessing `y` before `let y = 10;` throws a `ReferenceError`. The `let y = 20` inside the `if` block creates a new variable scoped only to that block, which doesn't affect the outer `y`."
            },
            {
                question: "Question 2.3: Function Hoisting Differences",
                code: "foo();\n\nfunction foo() {\n  console.log('Hello from foo!');\n}\n\ntry {\n  bar();\n} catch (e) {\n  console.log(e.message);\n}\n\nvar bar = function() {\n  console.log('Hello from bar!');\n};\n\nbar();",
                solution: "Logs: `Hello from foo!`, `bar is not a function`, `Hello from bar!`",
                explanation: "Function *declarations* like `foo` are fully hoisted (both name and body), so they can be called before they appear in the code. Function *expressions* like `bar` are not. Only the variable declaration `var bar` is hoisted and initialized to `undefined`, so trying to call it results in a `TypeError`."
            },
            {
                question: "Question 2.4: Hoisting with `const`",
                code: "try {\n  console.log(CONSTANT_VALUE);\n} catch (e) {\n  console.log(e.message);\n}\n\nconst CONSTANT_VALUE = 'I am constant';\nconsole.log(CONSTANT_VALUE);\n\n// What if we try to reassign it?\n// try {\n//   CONSTANT_VALUE = 'New value';\n// } catch (e) {\n//   console.log(e.message);\n// }",
                solution: "Logs: `Cannot access 'CONSTANT_VALUE' before initialization`, `I am constant`\nIf reassignment attempted: `Assignment to constant variable.`",
                explanation: "`const` declarations, like `let`, are hoisted but enter a Temporal Dead Zone (TDZ). This means they cannot be accessed before their declaration, resulting in a `ReferenceError`. Once declared and initialized, `const` variables cannot be reassigned, leading to a `TypeError` on attempted modification."
            }
        ],
        extraContent: `
            <h3 class="text-xl font-semibold mt-8 mb-4">Comparison: var, let, & const</h3>
            <p class="mb-4 text-gray-600">The introduction of \`let\` and \`const\` in ES6 provided more predictable scoping rules than the traditional \`var\`. This chart visualizes their key differences.</p>
            <div class="chart-container"><canvas id="hoistingChart"></canvas></div>
        `
    },
    closures: {
        title: "III. Closures & Scope: Mastering Data Privacy",
        intro: "A closure is a function that 'remember' the environment in which it was created. This means it has access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing. This is a powerful concept for creating private data and stateful functions.",
        teasers: [
            {
                question: "Question 3.1: Basic Closure and Persistent State",
                code: "function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    console.log(count);\n  };\n}\n\nconst increment = createCounter();\nincrement();\nincrement();\nincrement();",
                solution: "Logs: `1`, `2`, `3`",
                explanation: "The returned function forms a closure over the `count` variable from its parent, `createCounter`. Even after `createCounter` has executed, the inner function retains a live reference to `count`, allowing it to persist and be modified across multiple calls to `increment`."
            },
            {
                question: "Question 3.2: Closure Over Loop Variable (The Classic `var` Pitfall)",
                code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log('var i:', i), 1);\n}\n\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log('let j:', j), 1); \n}",
                solution: "Logs: `var i: 3`, `var i: 3`, `var i: 3`\nThen logs: `let j: 0`, `let j: 1`, `let j: 2`",
                explanation: "For the `var` loop, all three `setTimeout` callbacks close over the *same single `i` variable*. By the time they execute, the loop has finished and `i` is `3`. For the `let` loop, `let` creates a *new `j` variable for each iteration* of the loop's block scope, so each callback captures a distinct `j` value."
            },
            {
                question: "Question 3.3: Chained Closures (Currying)",
                code: "function sum(a) {\n  return function(b) {\n    return function(c) {\n      return a + b + c;\n    };\n  };\n}\nconsole.log(sum(1)(2)(3));",
                solution: "Logs: `6`",
                explanation: "This demonstrates currying. Each inner function forms a closure over the variables from its outer functions. The innermost function `(c)` has access to `a` (from `sum`), `b` (from `(b)`), and `c` (from its own scope), allowing it to sum all three."
            },
            {
                question: "Question 3.4: Private Members with Closure",
                code: "function createPerson(name, age) {\n  let _age = age; // Private variable\n  return {\n    getName: function() { return name; },\n    getAge: function() { return _age; },\n    setAge: function(newAge) {\n      if (newAge > 0) {\n        _age = newAge;\n      }\n    }\n  };\n}\n\nconst john = createPerson('John', 30);\nconsole.log(john.getName());\nconsole.log(john.getAge());\njohn.setAge(35);\nconsole.log(john.getAge());\n// console.log(john._age); // This would be undefined",
                solution: "Logs: `John`, `30`, `35`",
                explanation: "The `_age` variable is encapsulated within the `createPerson` function's scope, making it private. The returned object's methods (`getAge`, `setAge`) form closures over `_age`, allowing controlled access. Direct access to `john._age` is not possible, demonstrating effective data hiding."
            }
        ]
    },
    async: {
        title: "IV. Asynchronous JavaScript & The Event Loop",
        intro: "JavaScript is single-threaded, using an Event Loop to handle asynchronous operations like timers or network requests without blocking the main thread. Understanding the interplay between the Call Stack, Microtask Queue (for Promises), and Macrotask Queue (for `setTimeout`) is key to predicting execution order.",
        teasers: [
            {
                question: "Question 4.1: `setTimeout` vs. Promise Order",
                code: "console.log('Start');\n\nsetTimeout(() => {\n  console.log('Timeout 1');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('Promise 1');\n});\n\nsetTimeout(() => {\n  console.log('Timeout 2');\n}, 0);\n\nconsole.log('End');",
                solution: "Logs: `Start`, `End`, `Promise 1`, `Timeout 1`, `Timeout 2`",
                explanation: "The Event Loop prioritizes microtasks (like Promise callbacks) over macrotasks (like `setTimeout`). Synchronous code runs first. Then, all microtasks are cleared before the next macrotask is processed. Thus, `Promise 1` logs before `Timeout 1` and `Timeout 2`, even with 0ms delay."
            },
            {
                question: "Question 4.2: Chained Promises and Error Handling",
                code: "new Promise((resolve, reject) => {\n  console.log('Promise Init');\n  resolve('Success');\n})\n.then(value => {\n  console.log(value);\n  return new Error('Something went wrong'); // Returning an Error object, not rejecting\n})\n.then(value => {\n  console.log('Second then:', value);\n})\n.catch(error => {\n  console.log('Caught error:', error.message);\n});",
                solution: "Logs: `Promise Init`, `Success`, `Second then: Error: Something went wrong`",
                explanation: "Returning an `Error` object from a `.then()` handler does *not* trigger a rejection. The `Error` object itself becomes the resolved value for the next `.then()` in the chain. To trigger the `.catch()` block, you must either `throw new Error()` or `return Promise.reject()`."
            },
            {
                question: "Question 4.3: `async/await` Execution Flow",
                code: "async function fetchData() {\n  console.log('Fetching data...');\n  const response = await new Promise(resolve => setTimeout(() => resolve('Data received'), 100));\n  console.log(response);\n  console.log('Processing data...');\n  return 'Done';\n}\n\nconsole.log('Before fetchData');\nfetchData().then(result => console.log(result));\nconsole.log('After fetchData call');",
                solution: "Logs:\n`Before fetchData`\n`Fetching data...`\n`After fetchData call`\n(100ms delay)\n`Data received`\n`Processing data...`\n`Done`",
                explanation: "`async` functions run synchronously up to the first `await`. When `await` is encountered, the function pauses, and the remaining synchronous code continues. The `async` function resumes execution (as a microtask) only after the awaited promise settles. This interleaving is key to understanding `async/await`."
            },
            {
                question: "Question 4.4: `Promise.all` and Error Handling",
                code: "const p1 = Promise.resolve(1);\nconst p2 = new Promise((resolve, reject) => setTimeout(() => reject('Error from P2'), 50));\nconst p3 = Promise.resolve(3);\n\nPromise.all([p1, p2, p3])\n  .then(values => console.log('All resolved:', values))\n  .catch(error => console.log('Caught Promise.all error:', error));",
                solution: "Logs: `Caught Promise.all error: Error from P2`",
                explanation: "`Promise.all` waits for all provided promises to either fulfill or reject. If *any* of the promises reject, `Promise.all` immediately rejects with the reason of the first rejected promise, ignoring the state of other promises. It does not wait for all to settle."
            }
        ],
        extraContent: `
            <h3 class="text-xl font-semibold mt-8 mb-4">Event Loop Simulation</h3>
            <p class="mb-4 text-gray-600">The code from Question 4.1 involves different types of asynchronous tasks. Click the button below to visualize how the JavaScript Event Loop would process them. Watch as tasks move from the code to the appropriate queue and finally to the call stack for execution.</p>
            <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <button id="run-simulation-btn" class="btn-accent font-semibold py-2 px-4 rounded-lg mb-4">Run Simulation</button>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="event-loop-box rounded-lg p-3">
                        <h4 class="font-semibold text-center mb-2 border-b pb-2">Call Stack</h4>
                        <div id="call-stack" class="space-y-2"></div>
                    </div>
                    <div class="event-loop-box rounded-lg p-3 bg-blue-50">
                        <h4 class="font-semibold text-center mb-2 border-b pb-2 text-blue-800">Macrotask Queue</h4>
                        <div id="macrotask-queue" class="space-y-2"></div>
                    </div>
                    <div class="event-loop-box rounded-lg p-3 bg-green-50">
                        <h4 class="font-semibold text-center mb-2 border-b pb-2 text-green-800">Microtask Queue</h4>
                        <div id="microtask-queue" class="space-y-2"></div>
                    </div>
                </div>
            </div>
        `
    },
    equality: {
        title: "V. Equality & Type Coercion",
        intro: "JavaScript's dynamic typing allows for implicit type conversion, or 'coercion'. This is most apparent with the loose equality operator (`==`), which can lead to confusing results. The strict equality operator (`===`) is almost always preferred because it compares both value and type without coercion.",
        teasers: [
            {
                question: "Question 5.1: `==` vs `===` with Mixed Types",
                code: "console.log(0 == false);\nconsole.log(0 === false);\nconsole.log('5' == 5);\nconsole.log('5' === 5);\nconsole.log(null == undefined);\nconsole.log(null === undefined);",
                solution: "`0 == false`: `true`\n`0 === false`: `false`\n`'5' == 5`: `true`\n`'5' === 5`: `false`\n`null == undefined`: `true`\n`null === undefined`: `false`",
                explanation: "Loose equality `==` performs type coercion (`false` to `0`, `'5'` to `5`). Strict equality `===` requires both value and type to be identical, so it returns `false` when types differ. `null` and `undefined` are special-cased for `==`."
            },
            {
                question: "Question 5.2: Truthy/Falsy Edge Cases with `==`",
                code: "console.log([] == false);\nconsole.log([] == true);\nconsole.log({} == false);\nconsole.log(\"0\" == false);\nconsole.log(\"false\" == false);",
                solution: "`[] == false`: `true`\n`[] == true`: `false`\n`{} == false`: `false`\n`\"0\" == false`: `true`\n`\"false\" == false`: `false`",
                explanation: "These demonstrate complex coercion rules. Empty array `[]` coerces to `\"\"` then `0`, making `0 == false` true. Object `{}` coerces to `\"[object Object]\"` then `NaN`, making `NaN == false` false. String `\"0\"` coerces to `0`. String `\"false\"` coerces to `NaN`."
            },
            {
                question: "Question 5.3: `NaN` Behavior",
                code: "console.log(NaN == NaN);\nconsole.log(NaN === NaN);\nconsole.log(typeof NaN);\nconsole.log(+'dude');",
                solution: "`NaN == NaN`: `false`\n`NaN === NaN`: `false`\n`typeof NaN`: `\"number\"`\n`+'dude'`: `NaN`",
                explanation: "`NaN` is unique; it is the only value in JS not equal to itself, even strictly. Its `typeof` is `\"number\"`. The unary `+` operator attempts numeric conversion, resulting in `NaN` if unsuccessful. Use `Number.isNaN()` for reliable `NaN` checks."
            },
            {
                question: "Question 5.4: Object Comparison",
                code: "const obj1 = { a: 1 };\nconst obj2 = { a: 1 };\nconst obj3 = obj1;\n\nconsole.log(obj1 == obj2);\nconsole.log(obj1 === obj2);\nconsole.log(obj1 == obj3);\nconsole.log(obj1 === obj3);",
                solution: "`obj1 == obj2`: `false`\n`obj1 === obj2`: `false`\n`obj1 == obj3`: `true`\n`obj1 === obj3`: `true`",
                explanation: "Objects are compared by reference, not by value. `obj1` and `obj2` are different objects in memory, even if their contents are identical, so both loose and strict equality return `false`. `obj3` is a reference to the *same* object as `obj1`, so both comparisons return `true`."
            }
        ]
    },
    prototypes: {
        title: "VI. Prototypal Inheritance",
        intro: "JavaScript objects inherit from other objects via a 'prototype chain'. While ES6 `class` syntax exists, it's 'syntactic sugar' over this underlying prototypal model. Understanding how objects delegate property lookups is fundamental to JS.",
        teasers: [
            {
                question: "Question 6.1: Accessing Inherited Methods",
                code: `function Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.makeSound = function() {\n  console.log( \${this.name} makes a sound.\`);\n};\n\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nDog.prototype.bark = function() {\n  console.log(\${this.name} barks: Woof!\`);\n};\n\nconst myDog = new Dog('Buddy', 'Golden Retriever');\nmyDog.bark();\nmyDog.makeSound();\nconsole.log(myDog.hasOwnProperty('makeSound'));`,
                solution: "`myDog.bark()`: `Buddy barks: Woof!`\n`myDog.makeSound()`: `Buddy makes a sound.`\n`myDog.hasOwnProperty('makeSound')`: `false`",
                explanation: "`bark` is found directly on `Dog.prototype`. `makeSound` is found by traversing the prototype chain up to `Animal.prototype`. `hasOwnProperty` returns `false` because `makeSound` is an inherited property, not an 'own' property of `myDog`."
            },
            {
                question: "Question 6.2: Modifying Prototype vs. Instance",
                code: `function Person(name) {\n  this.name = name;\n}\nPerson.prototype.species = 'Homo Sapiens';\n\nconst person1 = new Person('Alice');\nconst person2 = new Person('Bob');\n\nconsole.log(person1.species);\nconsole.log(person2.species);\n\nperson1.species = 'Alien'; // Creates an 'own' property\nconsole.log(person1.species);\nconsole.log(person2.species);\nconsole.log(Person.prototype.species);`,
                solution: "`person1.species` (first): `Homo Sapiens`\n`person2.species` (first): `Homo Sapiens`\n`person1.species` (after modification): `Alien`\n`person2.species` (after person1 modification): `Homo Sapiens`\n`Person.prototype.species`: `Homo Sapiens`",
                explanation: "Direct assignment to `person1.species` creates an 'own' property that shadows the inherited one for `person1`. It does not affect the `Person.prototype` or other instances like `person2`, which continue to inherit from the prototype."
            },
            {
                question: "Question 6.3: Changing Prototype After Instance Creation",
                code: "function Car() {}\nCar.prototype.wheels = 4;\n\nconst myCar = new Car();\nconsole.log(myCar.wheels);\n\nCar.prototype.doors = 2; // Add a new property to prototype\nconsole.log(myCar.doors);\n\nCar.prototype.wheels = 6; // Modify existing prototype property\nconsole.log(myCar.wheels);",
                solution: "`myCar.wheels`: `4`\n`myCar.doors`: `2`\n`myCar.wheels`: `6`",
                explanation: "Instances inherit properties from their constructor's prototype. If you add a new property (`doors`) to the prototype *after* an instance is created, that instance will still have access to it via the prototype chain. If you modify an existing property (`wheels`) on the prototype, instances that do not have their own shadowed property will reflect this change immediately."
            },
            {
                question: "Question 6.4: `Object.create()` and Prototype Inheritance",
                code: "const animal = {\n  sound: 'generic sound',\n  makeSound: function() {\n    console.log(this.sound);\n  }\n};\n\nconst dog = Object.create(animal);\ndog.sound = 'woof';\ndog.makeSound();\n\nconst cat = Object.create(animal);\ncat.makeSound();",
                solution: "`dog.makeSound()`: `woof`\n`cat.makeSound()`: `generic sound`",
                explanation: "`Object.create(animal)` creates a new object (`dog`, `cat`) with `animal` as its `[[Prototype]]`. `dog.sound = 'woof'` creates an 'own' property on `dog` that shadows `animal.sound`. When `dog.makeSound()` is called, `this.sound` refers to `dog`'s own `sound`. `cat` does not have an 'own' `sound` property, so it looks up the prototype chain to `animal`, logging `generic sound`."
            }
        ]
    }
};
