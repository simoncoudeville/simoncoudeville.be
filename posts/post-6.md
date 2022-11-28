---
title: Why responsive typography is broken
description: The preliminary sibling selector is the opposite of the adjacent sibling selector.
date: 2022-11-23
permalink: /posts/why-responsive-typography-is-broken/index.html
layout: layouts/post.njk
---

My go to way to make a webpage scale type depending on screen size is gradually increasing the font-size of the html element inside media queries. This way if everything else is set up using rem   the whole design kind off blows up gradually. And

```css
@media screen and (min-width: 46.5em) {
	html {
		font-size: calc(19/16*100%);
	}
}

@media screen and (min-width: 105.0625em) {
	html {
		font-size: calc(22/16*100%);
	}
}
```

In this case I'm saying I want the the font-size

When zooming in on a page by using cmd/ctrl + + the viewport actually gets smaller. You can see this by inspecting the html or body element while zooming in. It's allmost the same as resizing the browser window except that the font-size at the same time gets bigger. So the viewport gets smaller and simultaniously the font-size increases.

What's even more, this behaviour is completely dependant on the size of your browser window itself. Zooming in on a 1680 wide browser window gives different results than on 1920 wide window. It's simple math really. Zooming to 200% on a 1680px wide window makes the viewport 840px wide and zooming in on a 1920px makes the viewport 960px wide.

I made a simple test page on Codepen to illustrate this. For this to work you will need to look at it on a 1680px wide browser window and make sure your default browser font-size is 16px. At a min-width of 71em the font size is 6rem. So

64 * (16 * 150 / 100) = 96

While zooming in the browser default font-size doesn't change. And the viewport gets smaller. So what is actually getting bigger? The devicePixelRatio so the pixels are getting larger.




```css
h1 {
  font-size: 2rem;
}

@media (min-width: 53em) {
  h1 {
    font-size: 4rem;
  }
}


@media (min-width: 71em) {
  h1 {
    font-size: 6rem;
  }
}
```

Whether you use media queries to make your text larger or use the fluid typography technique doesn't matter. As you zoom in the viewport gets smaller so eventually you hit a

## fluid typography

With the fluid typography technique it's just the same. As you zoom in the viewport gets smaller. So if you use the vw unit in the calculation at some point the viewport is getting smaller than the max width in the calculation. Once that point is crossed the font-size can only get smaller.

```css
font-size: clamp(1rem, 2.5vw + 0.5rem, 2rem);
```

16px, 1680px*2.5% + 8px, 32px

<form>
  <input id="minWidth" type="number" value="320">
  <input id="maxwidth" type="number" value="1680">
  <input type="number" value="16">
  <input type="number" value="32">
</form>