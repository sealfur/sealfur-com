# Sealfur.com

This isn't a thing yet. But it will be.

My intention is to make it [an 11ty site](https://www.11ty.dev/) so that I can blog using markdown and git alone. Also, I want to build a repository of resources about certain topics to refer people to when they ask me questions.

## Why does it look this way?

There is no CSS defining the styles. Everything you see will be based on your own default preferences in your browser. It will be that way until I get the code working properly.

## Principals for this site

1. [WCAG 2.1 AA+](https://www.w3.org/WAI/WCAG21/quickref/) accessibility
2. [Rule of least power](https://www.w3.org/2001/tag/doc/leastPower.html) (described by Tim Berners-Lee and Noah Mendelsohn)[^1]
3. Function over form
4. Keep learning

## Hosting

This site is hosted on [Netlify](https://www.netlify.com/) which, if I've set this up correctly, will automatically build the site when I push changes to my git repository.

[^1]: Even though I'm using 11ty and github to build this website, the pages served to browsers will be HTML, CSS and Javascript in that order. If only the HTML loads, then all the information on the site should still be usable.
