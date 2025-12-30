# What is the difference between the child combinator and the descendant combinator?
The descendant combinator selects all elements within the parent container while the child combinator only selects a direct child.
# How does the syntax of pseudo-classes and pseudo-elements differ?
Pseudo classes are applied when the element is in a certain state while pseudo elements make elements about a certain property.
# Do pseudo-classes exist somewhere in HTML? Do pseudo-elements?
Pseudo classes target elements that exist in the markup while pseudo elements do not exist in the markup.
# Name two ways you could select every second child of an element, starting with the first.
:nth-child(2n)
# What is the difference between div:first-child and div:last-child? What will each select?
div:first-child will select the first child while div:last-child will select the last child.
# What selector would you use to style a button a user is currently hovering over? How about one that is currently being clicked on?
button:hover
button:active
# How could you select all input elements with a type of text?
input[type='text']
# How could you select all classes that begin with thunder?
[class^='thunder']