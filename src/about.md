---
title: 'About Sealfur'
description: 'About Sealfur (the website) and Joshua Kinal (its author).'
layout: 'layouts/home.html'
intro:
  subtitle: 'The domain was short and available.'
---

<!-- Find information about designer, writer, broadcaster, podcaster and eternal dilettante, Joshua Kinal. -->

sealfur.com (this website) is a chance to play around with some HTML and CSS, post some things that interest me and maybe even find a way to engage with others.

## About the author

### tl;dr

Joshua Kinal is a design engineer with a diverse background: biomedical
science, journalism and broadcasting, digital product design and
development. His work focuses on how digital products impact the world;
from the way they are constructed to the way they are used.

### First-person, approachable version

_Am I a polymath, or is that considered an arrogant self-declaration?_

I have been a designer, writer, journalist, scientist, broadcaster, podcaster and developer.

I worked in television, radio, design studios, universities, print media, start-ups and consultancies.

My previous website was called [_Little Running Bear_](https://littlerunningbear.com) and it was built on WordPress[^1]. It's still there but I stopped writing on it. I say "my previous website", but like so many web tinkerers, I have little bits of myself all over the web.

sealfur.com exists to move my web-content practice towards having a lot more control over what I produce and how it is rendered in browsers.

Often, before committing an idea onto this site, [I’ll fumble around on CodePen](https://codepen.io/sealfur). I also use it as a quick way to explain a web-based concept to someone. It’s very handy.

## Principles for this site

I believe that principles guide actions and actions reveal principles. The principles I list here are a reminder to me (and maybe a nudge for you). I hope that my actions do not contradict what I call out as important to me.

1. [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 AA+](https://www.w3.org/WAI/WCAG21/quickref/) accessibility
2. [Rule of least power](https://www.w3.org/2001/tag/doc/leastPower.html) (described by Tim Berners-Lee and Noah Mendelsohn)[^2]
3. Function over form
4. Keep learning
5. Low barrier to contribution
6. Build in public

### Markdown as default "word processing"

Principle 5 exists to make it as easy as possible for me to add things to this site. I started to find the WYSIWYG interface of [WordPress](https://wordpress.org/) too frustrating for me. In my every day work I write in [Markdown](https://daringfireball.net/projects/markdown/) if I'm not writing in longhand.

11ty uses [markdown-it](https://markdown-it.github.io/) as its default Markdown parser. So I make use of it to save me some time and help me with some shortcuts like the footnotes you see on this page.
## Colophon

This version of the website (_Sealfur_) was first created in late 2020, and built with [Eleventy](https://www.11ty.dev/). 

This site is hosted on [Netlify](https://www.netlify.com/) which, if I've set this up correctly, will automatically build the site when I push changes to my git repository.

### Fonts
The display font is [Sansita Swashed from Omnibus-Type](https://www.omnibus-type.com/fonts/sansita-swashed/) and the body copy is in [Inter by Rasmus Andersson](https://rsms.me/inter/) (with many of the [fancy features](https://rsms.me/inter/#features) turned on, because I can).


[^1]: WordPress is a very good content management system and I highly recommend it. It was much more than I need but you could do a lot worse than use WordPress for your own website.

[^2]: Even though I'm using 11ty and github to build this website, the pages served to browsers will be HTML, CSS and Javascript in that order. If only the HTML loads, then all the information on the site should still be usable.