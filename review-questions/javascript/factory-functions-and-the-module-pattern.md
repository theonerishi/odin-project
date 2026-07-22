# How does scope work in Javascript?
If variable are declared outside a set of curly braces {} then they are in global scope that means they can be accessed everywhere. Variables declared with var are function scoped that means they can be accessed anywhere within the same function. Variables declared with let or const are block scoped this means they are only accessible in the set of curly braces where they are defined.
# What are closures and how do they help in creating private variables?
A closure is what happens when a function has access to variables that were declared in the lexical environment- the surrounding code. It helps in creating private variables as variables in the outer function cannot be accessed from outside but can be accessed by inner functions.
# What common issues can you face when working with constructors?
Constructors do not have safeguards from people using them wrong- for example a constructor can be called without the new keyword or it can give the incorrect prototype when using instanceof.
# What are private variables in factory functions and how can they be useful?
Factory functions can make variables private using closures to prevent a variable being changed outside the object instance.
# How can we implement prototypal inheritance with factory functions?
We can create a new function that uses a factory function to implement prototypal inheritance.
# How does the module pattern work?
The module pattern makes uses closures to make variables private to prevent external modification.
# What does IIFE stand for and what are they?
A function wrapped in brackets that gets immediately run without being called.
# What is the concept of namespacing and how do they help with factory functions?
Namespacing is where functions are encapsulated into a module that prevents naming collisions.