---
title: 'Accessibility is an uphill battle'
author: 'Joshua Kinal'
date: '2021-09-19'
tags: ['accessibility', 'WCAG', 'web development']
summary: 'Some notes about how I think about digital accessibility and how we can make it a more common practice in digital products. It’s everybody’s responsibility, it’s just that most people don’t know it, they don’t care and it sounds hard.'
draft: 'true'
---

“What do we need to do to make this site accessible?”

I get this question about once a week. People who aren’t familiar with it think accessibility is a binary situation: either a site is accessible or it isn’t. They often want a quick answer[^1] and there's none to be provided. Accessibility as a property of a website, is nuanced. It has a biased liminality.[^2] So, it sounds like a simple question but it has a very complicated answer.

Like almost all design, accessibility comes down to understanding people. When assessing digital accessibility, I find it easiest to think about who is being excluded and how:

* Who can’t access all of the content on the site?
* Are some people privileged because they have access to information others don’t?
* Is the information available to everyone, but some have to overcome needless barriers to get to it?

HTML lends itself to accessibility. If used properly, the markup language holding the web together provides all the cues needed to help someone use technology to consume the content. Sadly, most sites do not use HTML properly.

There are three roles directly responsible for making sure web pages are built properly: designers, developers and content creators. All three need to have some understanding of HTML because it’s the foundational medium they are building on. It is rare that they have the level of understanding needed to include accessibility by default.

Imagine not understanding that pen ink adheres to paper to write a letter. Most people do not have a deep understanding of how it works, but we understand that it *does* work. We learn that as children and it becomes innate. Let’s extend this out to offset printing.

Some people (commercial printers, paper manufacturers, ink technologists) need to understand in detail how ink and paper combine and the machinery that gets the two working together. Others (graphic designers, studio managers) need to know differences between coated and uncoated paper, how almost all colour is a combination of just four inks and why bound documents are created in multiples of four (or sometimes eight). Most people just need to understand that the ink sticks to the paper, somehow, but sometimes it rubs off on your fingers (or [Silly Putty](https://www.youtube.com/watch?v=LOWPMYmT8Eo)).

They all understand that some people can’t see the printed page they’re creating. Sadly, they usually also think it’s someone else’s job to worry about that.

Bringing this back to accessibility on the web, there are two sets of problems we need to deal with:

1. people fundamentally don’t yet understand how HTML relates to the nature of content and
2. they are not practiced in thinking about other people’s experiences.

The first problem seems relatively easy to deal with. We can help people in our sphere to better understand the benefits of well-coded websites and apps. If we can make sure the HTML relates to the purpose of the content and its interactivity, we get closer to building accessible web products.

To make that a priority, though, we have to overcome the second problem.

Anybody trying to convince others of the dangers of global warming or the value of wearing masks to avoid spreading disease will tell you that it’s almost impossible to get people to care.

## Coda

I intend to write about this some more. I want to go through all three of those roles (Designer, Developer, Content Creator) and what kind of understanding they need to have to build accessibility into the default practice of the web. I want to share examples the illustrate how something that doesn’t sound complicated actually needs a massive shift in mindset. Lastly, I plan on demonstrating how content and a content-first approach will overcome a lot of those complications.


[^1]: The [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> have levels of compliance](https://www.w3.org/WAI/WCAG21/quickref/), with ‘A’ as the minimum and ‘AAA’ being the most strict and complicated. Because there are these levels and clear success criteria, the language around accessibility has a pass/fail context. So, if there’s a checklist we can follow, why don’t we just make sure all those things are checked off?

[^2]: This piece started very differently and went into some detail about “biased liminality” as a concept. I have notes to explain that but that will have to wait for the moment.