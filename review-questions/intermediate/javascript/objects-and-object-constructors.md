# How do we write an object constructor and instantiate the object?
Using the word new and a capital letter at the beginning of the constructor.
# How can you prevent an object constructor being called without the word new?
Using !new.target
# What is a prototype and how can it be used?
A prototype is methods and properties that can be inherited from another object.
# What is prototypal inheritance?
Methods and properties that can be inherited from another object.
# What are the basic do's and don'ts of prototypal inheritance?
Don't assign .__proto__ in a circle. The value of .__proto__ can either be an object or null. An object can only have one prototype.
# How does this behave in different situations?
The this refers to the object that owns the function or method currently being executed. In the global context it refers to the window object. The use strict mode prevents this referring to the global object. .bind() can set a function that sets the this keyword to a specific value.