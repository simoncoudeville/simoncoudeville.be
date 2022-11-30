---
title: Why responsive typography is broken
description: The preliminary sibling selector is the opposite of the adjacent sibling selector.
date: 2022-11-23
permalink: /posts/why-responsive-typography-is-broken/index.html
layout: layouts/post.njk
pagejs: post-6.js
---

My go to way to make a webpage scale type depending on screen size is gradually increasing the font-size of the html element inside media queries. This way if everything else is set up using rem the whole design kind off blows up gradually. And

<p class="test">
font-size: clamp(1.5rem, 0.0375vw + 0.75rem, 3rem);
</p>

```css
@media screen and (min-width: 46.5em) {
  html {
    font-size: calc(19 / 16 * 100%);
  }
}

@media screen and (min-width: 105.0625em) {
  html {
    font-size: calc(22 / 16 * 100%);
  }
}
```

In this case I'm saying I want the the font-size

When zooming in on a page by using cmd/ctrl + + the viewport actually gets smaller. You can see this by inspecting the html or body element while zooming in. It's allmost the same as resizing the browser window except that the pixelRatio at the same time gets bigger. So the viewport gets smaller and simultaniously pixels get bigger.

What's even more, this behaviour is completely dependant on the size of your browser window itself. Zooming in on a 1680 wide browser window gives different results than on 1920 wide window. It's simple math really. Zooming to 200% on a 1680px wide window makes the viewport 840px wide and zooming in on a 1920px makes the viewport 960px wide.

Demo to show that the viewport gets smaller dependant on the browser window and the pixelRatio gets bigger.

I made a simple test page on Codepen to illustrate this. For this to work you will need to look at it on a 1680px wide browser window and make sure your default browser font-size is 16px. At a min-width of 71em the font size is 6rem. So

64 _ (16 _ 150 / 100) = 96

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
/* clamp formula */
font-size: clamp(1rem, 2.5vw + 0.5rem, 2rem);
```

With that equation the font-size grows from 1rem to 2rem until the viewport is 960px wide. Because 960 &times; 2.5% = 24. Add .5rem (= 8px) and you have 32px. Until that point nothing breaks, zooming keeps working. But if the zoom level crosses that line, remember that zooming makes the viewport smaller, the middle value of the clamp function starts working. So the true font-size gets smaller but at the same time the zoom level goes up. That's why in some cases the zooming seems to go slower. And in some cases, with certain extreme values the result is that the font-size gets smaller at a faster pace than the the zoom level rises. So the zoom level can't keep up. Effectively making the font-size smaller while zooming.

This is the most recent formula to

<div class="demo">
<form id="clamp" class="clamp" action="">
  <label class="clamp__label">
    Min viewport width
    <input class="clamp__input" id="clamp-min-width" type="number" value="320" min="300" max="960" step="10">
  </label>
  <label class="clamp__label">
    Max viewport width
    <input class="clamp__input" id="clamp-max-width" type="number" value="960" min="960" max="1920" step="10">
  </label>
  <label class="clamp__label">
    Min font-size
    <input class="clamp__input" id="clamp-min-font-size" type="number" value="24" min="4" max="32" step="1">
  </label>
  <label class="clamp__label">
    Max font-size
    <input class="clamp__input" id="clamp-max-font-size" type="number" value="72" min="32" max="200" step="1">
  </label>
  <div class="clamp__output">
    <!-- <p class="text-s text-code text-comment">
      /* Clamp formula */
    </p> -->
    <!-- <p id="clamp-formula" class="clamp__formula text-code text-s">
    </p> -->
    <pre class="language-css"><code class="language-css"><span class="token comment">/* clamp formula */</span><br><span id="clamp-formula"><span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">clamp</span><span class="token punctuation">(</span>1rem<span class="token punctuation">,</span> 2.5vw + 0.5rem<span class="token punctuation">,</span> 2rem<span class="token punctuation">)</span><span class="token punctuation">;</span></span></code></pre>
    <!-- <p id="clamp-formula-explanation" class="text-s color-meta">
    Before the viewport is 320px wide the font-size should be 24px. If the viewport is wider than 960px the font-size should be 48px, between that the font-size should be 0.0375 times the viewport + 12px.
    </p> -->
  </div>
  <label class="clamp__label">
    Viewport (browser) width
    <input class="clamp__input" id="clamp-browser-width" type="number" value="1680" min="320" max="1920" step="20">
    <!-- <select class="clamp__input" id="clamp-browser-width">
      <option value="1680">1680</option>
      <option value="1920">1920</option>
    </select> -->
  </label>
  <label class="clamp__label">
    Zoom level
    <input class="clamp__input" id="clamp-zoom-level" type="number" value="100" min="100" max="400" step="1">
  </label>
  <div class="clamp__output">
    <p class="text-s mb-4xs">
      Converted clamp formula
    </p>
    <p id="clamp-output" class="clamp__formula text-formula text-center text-s">
    </p>
  </div>
  <div class="clamp__output">
    <p class="text-s mb-4xs">
      Computed font-size
    </p>
    <p id="zoom-output" class="clamp__formula text-formula text-center text-s"></p>
  </div>
</form>
</div>

While playing around with the formula tools I stumbled upon some weird behaviours. For example if the min vw is a third of the max vw and the min font-size is also a third of the max font-size the intercept rem value will always be zero. Causing it the text to stop increasing at a certain zoom level completely. Because after that point the zoom level and the decreasing font-size level eachother out.
