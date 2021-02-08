---
title: 'Look at this! It’s got (some) styling.'
description: 'Opinions about design (like web design, architecture and brands) and popular culture (like movies, music and books), by Joshua Kinal'
metaDesc: 'Opinions about design and popular culture by Joshua Kinal'
layout: 'layouts/home.html'
intro:
  subtitle: 'This isn’t a thing yet. But it will very be soon.'
featuredClippings:
  title: 'selected clippings'
  summary: 'I collect articles to share with other people. Here’s just a few to give you a taste. (Actually, I’m just playing with 11ty’s “Collections” feature. This will probably be used for some featured blog posts or something.)'
---

My intention is to make it [an 11ty site](https://www.11ty.dev/) so that I can blog using markdown and git alone. Also, I want to build a repository of resources about certain topics to refer people to when they ask me questions.

## Why does it look this way?

~~There is no CSS defining the styles. Everything you see will be based on your own default preferences in your browser. It will be that way until I get things working properly in terms of templating for pages and blog posts.~~
It's just a very basic layout at the moment. I was playing around with learning some CSS grid for a bit, but realised that that can all wait. I prefer darker themes and one day you'll get a toggle option to go to light or dark, but that's a long time in the future. This site uses [variable fonts](https://rwt.io/blog/2018/07/evolution-typography-variable-fonts-introduction), but not well… yet[^2].

Also, the site still needs some kind of footer.

## Principals for this site

1. [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 AA+](https://www.w3.org/WAI/WCAG21/quickref/) accessibility
2. [Rule of least power](https://www.w3.org/2001/tag/doc/leastPower.html) (described by Tim Berners-Lee and Noah Mendelsohn)[^1]
3. Function over form
4. Keep learning
5. Low barrier to contribution
6. Build in public

### Markdown as default "word processing"

Principle 5 exists to make it as easy as possible for me to add things to this site. I started to find the WYSIWYG interface of WordPress too frustrating for me. In my every day work I write in [Markdown](https://daringfireball.net/projects/markdown/) if I'm not writing in longhand.

11ty uses [markdown-it](https://markdown-it.github.io/) as its default Markdown parser. So I make use of it to save me some time and help me with some shortcuts like the footnotes you see on this page.

## Hosting

This site is hosted on [Netlify](https://www.netlify.com/) which, if I've set this up correctly, will automatically build the site when I push changes to my git repository.

[^1]: Even though I'm using 11ty and github to build this website, the pages served to browsers will be HTML, CSS and Javascript in that order. If only the HTML loads, then all the information on the site should still be usable.
[^2]: Right now, this whole site is about learning and there's really a lot to learn. For best-use of variable fonts, I look to my friend Jason Pamental. He literally wrote the book on [_Responsive Typography_](https://www.oreilly.com/library/view/responsive-typography/9781491907085/). Another great book on the topic is [_Flexible Typesetting_](https://abookapart.com/products/flexible-typesetting) by Tim Brown (who is not my friend, but maybe because we haven't met yet.)
