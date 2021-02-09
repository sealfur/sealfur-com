---
title: 'RSS means it is time to get writing'
author: 'Joshua Kinal'
date: '2021-02-09'
tags: ['rss', 'web design', 'build in public']
summary: 'In which I’m proud of having made something I wanted'
---

I made the website and got it working so that it is [properly responsive](https://alistapart.com/article/responsive-web-design/)[^1] and passes [automated accessibility tests](https://www.deque.com/axe/devtools/). Now it even has [an RSS feed](https://sealfur.com/feed.xml)[^2].

This means there's no excuse to not start using this as my casual writing platform for ideas and opinions.

Over [on the old website I wrote](https://littlerunningbear.com/11020/its-the-perfect-apostrophe-charlie-brown/) that there was already no excuse to not have a casual writing platform for ideas and opinions (or something like that). Still, that wasn't enough to get me actually working writing.

I found the idea of logging-in to WordPress too much of a burden to use it for my thought-capturing device. It wasn't just the logging in, though. It was also the way I habitualised my casual writing.

I use [Markdown](https://daringfireball.net/projects/markdown/) a lot. I capture notes in my text editor and I use Markdown for the simple, keyboard-based application of styling and adding hyperlinks. Recently this has gone even further and I started using my [text editor as a replacement for Evernote](https://foambubble.github.io/foam/), to help keep my thoughts organised.

I wanted to be able to write in Markdown, save a file and have it automatically added to my blog. Creating with [11ty](https://www.11ty.dev/) and hosting on [Netlify](https://www.netlify.com/) means that I come pretty close to that. Now I save a file and then publish it to my git repository. This triggers netlify to do a new build of the site and my blog post is published with an updated RSS feed.

So, that's pretty neat for me and probably doesn't mean a lot for you. Most people in my life don't understand what I'm talking about when I mention this stuff. All you need to know is that there should be new things here fairly regularly.

[^1]: I still get a kick out of the responsive image at the top of the *A List Apart* "Responsive Web Design" page. If you have the opportunity to widen and narrow your browser, it's worth having a look.

[^2]: Find out [more about RSS from Brent Simmons](https://inessential.com/2013/03/14/why_i_love_rss_and_you_do_too). He created [NetNewsWire](https://netnewswire.com/), which is still my favourite way to get updates.