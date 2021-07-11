---
title: 'A little Sass & CSS problem'
author: 'Joshua Kinal'
date: '2021-07-11'
tags: ['web design', 'css', 'Sass']
summary: 'Wanting to make use of CSS custom properties for consistency and the powerful controls that come with Sass variables, I coded myself into a hole until I found documentation about a breaking change.'
---

I don’t have a lot of time to work on this website, but I do spend a lot of my professional time looking at the efficiency of different websites, their use (or lack) of semantic HTML and the structure of their CSS.

One of the reasons I have this site is to take the opportunity to find the most efficient and sustainable ways to code websites. For example, how can I best set up the CSS to allow for changing the visual design without having to touch any of the rendered HTML.

But my CSS wasn’t working properly. It looked fine on screen but there were Sass variables in the CSS files.

Just when I thought I understood how it all worked, I found it wasn’t working at all. Eventually I found this page of [breaking changes on the Sass website](https://sass-lang.com/documentation/breaking-changes/css-vars).

Finding this sent me down a rabbit hole of trying to restructure the Sass into a less chaotic mix of `@use`, `@forward` and such other Sass features. I was pulling in bits of CSS twice, and that was annoying.

So this is part of the learning curve. I made some changes today. I think it’s going to be fine for the moment, but there's always so much more to learn.