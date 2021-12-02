---
title: 'Content creators, meet HTML'
author: 'Joshua Kinal'
date: '2021-12-02'
tags: ['accessibility', 'CMS', 'content management']
summary: 'The more people who can add content to a website, the greater the chances for accessibility issues. You might say that accessibility is inversely proportional to creator access.'
draft: "true"
---
In “[Accessibility is nuanced problem](/blog/accessibility-is-a-nuanced-problem/)” I wrote:

> … there are two sets of problems we need to deal with:
>
> 1. people fundamentally don’t yet understand how HTML relates to the nature of content and
> 1. they are not practiced in thinking about other people’s experiences.

One set of those people were “content creators”. Many of the accessibility issues I see are the result of people just trying to add content to a website.

## Why accessibility mistakes happen

There is a fundamental mismatch between what people see when they create website content and what actually appears on someone else’s device. That’s part of the very nature of HTML.

## The curse of the <abbr title = "content management system">CMS</abbr>

Most organisations (and people) use a content management system (<abbr>CMS</abbr>) to add or remove words, pictures and other media on their website. It’s a bit of software that runs on a server and lets people change just the bit of the website they want to work on, without affecting anything else. Basically, if you have a website, you are probably using a CMS.[^1]

And that’s great. The technology really opened up web publishing to a wider group of people. We should remember that when talking about accessibility. For so many people, having and updating a website was inaccessible to people who didn’t understand how   For most people, using a CMS means never having to learn HTML. Visual interfaces made it much easier for people to add words and pictures to pages. A lot of systems use what we used to call [a WYSIWYG editor, but now is referred to as a rich text editor (RTE)](https://en.wikipedia.org/wiki/Online_rich-text_editor "Wikipedia’s explanation of an RTE"), because what you saw was rarely what you got.

Unfortunately, that's also where the problems start to come in.

---

“Content creators, meet HTML” is the second post in a series about our common responsibility to build accessible digital products. The first was called [“Accessibility is a nuanced problem”](/blog/accessibility-is-a-nuanced-problem/).

[^1]: And, chances are, if you use a CMS, it’s WordPress. A site called [*W<sup>3</sup>Techs* has a regular report on the most popular web technologies](https://w3techs.com/technologies/overview/content_management) in use. But you might use Squarespace or Joomla or Adobe Experience Manager or Sitecore or any of the other hundreds of content management systems out there.