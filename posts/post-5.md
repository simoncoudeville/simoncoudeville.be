---
title: The preliminary sibling selector?
description: The preliminary sibling selector is the opposite of the adjacent sibling selector.
date: 2022-11-11
permalink: /posts/the-preliminary-sibling-selector/index.html
layout: layouts/post.njk
---

I've always been a big fan of the adjacent sibling selector. If you're unfamiliar with it this is what it does: select an element only if it immediately comes after another element (adjacent) that has the same parent (sibling). And it looks like this:

```css
* + h2 {
   margin-top: 3rem;
}
```

In this case the h2 is selected only if it comes directly after any other element. The HTML could look something like this:

```html
<p>
    Some text
</p>
<h2>
    Some title
</h2>
```

I use this code to add some extra whitespace on top of the h2 if it's preceded by a paragraph or any other element in for example a blogpost. Because I see the h2 as the start of another part in the text I want it visually seperated from the previous paragraph with more whitespace. This does that perfectly.

A famous example of the adjacent sibling selector is the [lobotomised owl](http://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) by [Heydon Pickering](https://front-end.social/@heydon). It's a technique that starts by removing all margin and only apply it between elements that are preceded by other elements.

```css
* {
    margin: 0;
}

* + * {
  margin-top: 1.5rem;
}
```

## Combined with :has

The power of the :has selector goes far beyond just being a parent selector because it let's you combine it with existing combinators. So now we can turn it around and check if an element is immediately followed (preliminary?) by another element that's on the same level .

```css
*:has(+ h2) {
    margin-bottom: 3rem;
}
```

The result here would be exactly the same. Typically CSS.