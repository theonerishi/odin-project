# What is tightly coupled code?
Tightly coupled code is very compact where code depends on other code
# What are the two requirements for a function to be pure?
the same inputs into the function must always result in the same output and it should only depend on the inputs, must not have side effects such as network or data changes
# What are side effects and why is it important to identify them when testing a function?
any interaction to anything outside the function makes the function impure and impure functions are harder to test
# What should you try before testing tightly coupled code?
separate the code into pure functions
# How can you test code that can’t be decoupled?
use a mock function
# What is mocking?
fake input into a function to test it
# When would you use a mock function?
when code cannot be decoupled
# How should you test incoming query messages?
through mock functions
# Why should you not test implementation?
the test may depend on implementation details that will make it give the incorrect results
# Should you test private methods?
No there is no need to test private methods its better to keep it simple and have fewer tests
# Why should you not test outgoing messages with no side effects?
its because this might tie the developer to the implementation details