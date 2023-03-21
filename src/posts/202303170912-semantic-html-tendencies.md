---
title: 'Interogating my semantic tendencies'
author: 'Joshua Kinal'
date: '2023-03-18'
tags: ['html', 'css', 'beliefs']
summary: 'We all (should) know that introspection drives improvement and growth. But what if we believe something so intensely that it seems beyond conscious analysis? This is about semantic HTML and whether generic elements should even exist. Climb on board and strap in for the intersection of existensialism and web development that no one asked for.'
---

## Introduction: A deeply held belief

My dev collaborators all know that I have a strong bias towards semantic HTML. You might have observed that [I hold a passionate belief](https://littlerunningbear.com/10322/css-in-js/) in the [separation of concerns](https://www.w3.org/TR/html-design-principles/#separation-of-concerns) when it comes to web development. “Function over form” is the [number-three design principle](../../about) for this site, directly after “rule of the least power”. Being explicit and aware of a piece of content’s purpose is a fundamental tenet of my own design practice.[^b] Utilising [semantic markup](https://en.wikipedia.org/wiki/Semantic_HTML) is one of the ways I express that tenet.

## The belief in practice

I regularly crinkle my nose at [frameworks like Tailwind CSS](https://tailwindcss.com/docs/flex-basis) because they bind the HTML (the code that defines a content element’s purpose) to the visual presentation of that element. They do this by adding classes to the HTML, which has the potential to maintain semantic markup, but often lends itself to [`div` soup](https://css-tricks.com/twitters-div-soup-and-uglyfied-css-explained/).[^1]

There are many schools of thought around web development. Some people choose to make something visually appealing at the outset because that is important to them. I prioritise accessibility, portability and sustainability over visual appeal. That is my choice and I have to answer for it almost every time I present a new product to its stakeholders (who tend to have a contrary belief that no product is ever “ready” until it is feature-rich and visually attractive).

I bring this all up, (mostly) not to point out the flaws of various frameworks, but to point out a personal realisation: I had no idea how deep-down in my soul I held these principles until one morning, late last week.

## My bias exposed by my peripheral nervous system

Every morning, as I eat my breakfast, I read through my RSS feeds. Rik Schennink’s [“Create Crisp Image Borders With CSS Pseudo Elements”](https://pqina.nl/blog/crisp-image-borders-with-css-pseudo-elements/) came up and I appreciated his attention to detail: 

> We can see that we lose contrast depending on the colors of the image near the border.
> 
> The border looks nice when it’s near a contrasting area, but it kind of dissapears when near colors of the same brightness.

He’s correct, of course. He shows us a picture of a cat (on the internet!) and the standard semi-transparent 1px border. Then he shows the same picture with his special treatment and the border *does* make the image feature more on the white background.[^2]

To achieve this affect, he wraps the image in a `div` and makes use of the `::after` pseudo-element. I saw the code example and the reflex happened before I realised: I had stopped chewing my toast, and I physically cringed a little.

I try to take note of when my body responds that way and reflect on it. Consciousness cannot control everything our bodies do and it pays to acknowledge that and maybe even investigate various responses to identify patterns. This practice helps me maintain my fairly loose hold on my firm views and welcome other perspectives.

Rik’s solution to this very specific problem is quite elegant. It does not require a lot of extra HTML: just over 30 extra characters (bytes) per image. That’s a pretty small price to pay to make a key part of a website more enjoyable to the people who notice.

It took a few minutes before I got to that understanding. First I had to go through all the questions my brain threw into my awareness:

``` thoughts
-  Is it worth it?
-  Could the `figure` element serve
   as a reasonable alternative to the `div`?
-  How can I feel as relaxed and happy as that cat?
-  Why do my thoughts render as a code block and
   not a block quote?
```

## What does it mean to believe?

Beliefs are weird beasts.[^c] They help us define ourselves but are not always logical. A belief is not a fact: It can be disproven. That means the way we understand ourselves can be disrupted with evidence. That is very much a feature (and not a bug) of beliefs.

One of my core beliefs relating to web development is:

> By employing semantic HTML and minimising the non-semantic elements on a page, we create more opportunities for our content to be portable to other media and adaptable to new technologies.

This belief comes from years of experiencing pain (mine, my colleagues’, my clients’) when taking existing web content and trying redesign the site, or avoid having multiple copies of the same text, or moving them to a different content management system. Prioritising semantic HTML is a gift to our future selves.

## Learning from a belief, challenged

Prioritising semantic markup does not discount utilising generic elements like `div` and `span`. If everyone thought about code the way Rik Schennink does, our future selves would be fine, because we could target only the semantic elements and dispose of the rest when transfering the content to a different platform. His use of a `div` does not intend any meaning to the content. The meaning exists in the `img` element that tells us (or really, computers) that something is an image.

In fact, the more I think about it now, the more I understand how elegant this solution is to his problem. By employing `div` for this purpose, he declares that anything within that label that does not have its own semantic label is fundamentally meaningless. If he used `figure` instead, that would not be the case because [it has a specific purpose](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) and the images might not fit that purpose.[^d]

The image might be, for example, a picutre of a very relaxed and happy cat. The intention behind including it on the page might be filfilled with no reference elsewhere: It might be the pure intention of letting someone else see that picture and maybe strive to be more like the cat. The border around the image is not important to that intention but it is important to someone who wants their images to pop a little more on the page.

It wasn’t until looking deeper into my response to my response to Rik’s code that I truly understood the value of generic HTML elements. My understanding was clouded by the way some (many) developers abuse these elements to build websites that pass the QA criteria with as little friction as possible.

## Introspection roars

I noticed a reaction in my body and investigated it further. I used introspection to undertstand more about the world and other people, as well as understanding myself better. I engaged with the content in a manner that seems like a luxury now.

Most importantly, I was able to challenge on of my own deeply integrated beliefs and develop a more mature and nuanced expression of it: leveling it up so that it is ready to face its next challenge.

[^1]: A perfect example comes from [Tailwind’s own “Customizing Colors” page](https://tailwindcss.com/docs/customizing-colors). The vast array of hues and shades on offer in their palette appears, visually, as a table (in various configurations, depending on your screen size). In the code, though, it does not appear in a `table` element, but a series of nested `div`s. Given the difficulty in producing effectively responsive tables, this information could also be provided in nested lists. When Tailwind does make use of a simple table, they still include a `div` inside each cell to style the content.

[^2]: I had to use the ‘dark mode’ toggle to get a white background before I noticed any difference between the two treatments.

[^b]: HTML provides purpose to different elements on a page by wrapping them in a label. Browsers interpret those labels to present the content to you in a meaningful way. Often that presentation is visual, but it can also be audible or haptic: whatever is going to make most sense to the user.

[^c]: Not actual beasts.

[^d]: Rik and I share many attitudes around content, purpose and design. I wish I had seen his [excellent *Smashing Magazine* article “Content First &ndash; Design Last”](https://www.smashingmagazine.com/2015/02/design-last/) years ago. It would have saved me a lot of time writing my own explanation of that concept.