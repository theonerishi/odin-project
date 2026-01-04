# What differences are there between object constructors and classes?
Classes can be a syntactic sugar- a shorter way to write things- when using the function keyword instead of the class keyword as it has the constructor property by default. Class methods are non enumerable which means that we cannot iterate over it. This can be an advantage as we usually do not want to use a for in loop to iterate over class methods. Classes always use strict mode that prevents accidental global variables, duplicate parameter names and stops reference to the global object.
# What are getters  and setters?
Getters and setters allow us to get and set values in objects and classes using the dot operator.
# How is inheritance used with classes?
Inheritance is used with the name of the subclass, the keyword extends followed by the name of the superclass.
# What are some private class features?
Private variables and methods are defined with a #. These features are encapsulated within the class.
# What are static properties?
Properties that cannot be accessed by instances of the class but can be accessed by the class using the dot operator.
