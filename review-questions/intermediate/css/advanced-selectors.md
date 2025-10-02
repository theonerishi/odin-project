# What is the difference between the child combinator and the descendant combinator?
The child combinator selects a child element with any level of nesting within the parent element while the descendant combinator only selects direct child elements.
# How does the syntax of pseudo-classes and pseudo-elements differ?
Pseudo elements can create new elements while pseudo classes can apply styling depending on user action.
# Do pseudo-classes exist somewhere in HTML? Do pseudo-elements?
Pseudo classes select elements that are already there while pseudo elements create new elements that are not present.
# Name two ways you could select every second child of an element, starting with the first.
:nth-child(2n)
# What is the difference between div:first-child and div:last-child? What will each select?
As specified.
# What selector would you use to style a button a user is currently hovering over? How about one that is currently being clicked on?
:hover and :active
# How could you select all input elements with a type of text?
input[type="text"]
# How could you select all classes that begin with thunder?
[class^="thunder"] {
    
}