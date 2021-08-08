---
title: 'Introducing accessibility responbsibly'
author: 'Joshua Kinal'
date: '2021-08-03'
tags: ['accessibility', 'WCAG', 'automation']
summary: 'Automated testing and browser accessibility plugins can create a mindset that responsibility ends at getting a check mark.'
draft: 'true'
---

“What do we need to do to make this site accessible?”

That question is posed to me about once a week. People who aren’t familiar with the concept think accessibility is a binary situation: either a site is accessible or it isn’t. They often want a quick answer and there's none to be provided. Accessibility, as property of a website, is nuanced, related to a complex combination of factors and can be infinitely tinkered with.

## Accessibility has a biased liminality

This assumption of accessibility as either achieved or failed is probably a by-product of the way that person found out about the concept. They were told their site was not accessible. They know that the site fails. They want to know what to do to make it pass.

The truth is, most people will be able to access the content on their website, but they might not be able to access it easily. The site is both accessible and inaccessible depending on who is using it and how they want to use it. So, it exists in a liminal state.

When we talk about accessibility, we usually think of how people with disabilities can make use of the information on the site and navigate to what they need. In this respect, a site can create barriers or try to remove them. Usually a site is more on one side of the threshold. That's the bias of the liminality. A site might be really easy for people visual impairments to navigate, but people with reduced motor function might have problems interacting with some elements.

## We create the binary mindset

I am guilty of this and I've seen others do the same: In order to bring a website owner around to the importance of accessibility we show a failed test.

A number of excellent browser plugins exist to test a site's accessibility. WebAIM’s [_WAVE_ browser plugin](https://wave.webaim.org/) and Deque's [_axe DevTools_](https://www.deque.com/axe/browser-extensions/) provide us really handy props to show all the problems that might exist in a website.

Unfortunately, this also creates the benchmark in the owner’s mind: bring the website to a point where that report says it passes.

These kinds of reports also introduce people to concepts within accessibility. [Alternative (a.k.a “alt”) text for images](https://webaim.org/techniques/alttext/#basics "WebAIM’s introduction to working with the alt attribute in html") is a really simple one to point out. There are images on the website that convey information to the audience but have no alt text. It seems like a quick win to add appropriate alt text to the image.

I’ve seen more than one team get around this problem by forcing content authors to include alt text as part of uploading an image to their content management system. In the upload screen there’s a field for alt text and it must be filled in before the author can include the image.

That “solution” definitely removes the errors thrown by automated testing. All images will have alt text. But is the alt text helpful?

Imagine you have a page dedicated to explaining all the different parts of a flower. It includes a diagram of a flower and a cross-section of the stem. The diagram points to all the different elements of a flower, includinga breakdown of the pistil’s segments and a cross-section of the stem pointing to the xylem, phloem and cambium. All the elements are labeled, but the alt text doesn’t detail any of this floral anatomy. It just reads <q cite="https://www.homestratosphere.com/parts-of-a-flower/#A_Parts_of_a_Flower">Diagram showing the different parts of a flower</q>[^1].

The image does not raise any issues in an automated accessibility report because the alt text us there. The text is not unhelpful. It tells people what the picture is of. But the text doesn’t convey the information in the picture. Is it accessible? Kind of.

## When alt text isn’t alt text

Not even something that seems as simple as alt text is really that simple. All images require an `alt` attribute, but sometimes that attribute should be empty. That’s [the case for decorative images](https://www.w3.org/WAI/tutorials/images/decorative/) that offer nothing but visual pleasantries.



[^1]: This was a real example I found in my web travels. The people at Home Stratosphere do great work explaining [all the different bits of a flower](https://www.homestratosphere.com/parts-of-a-flower/#A_Parts_of_a_Flower "Home Stratosphere’s page with an example of alt text that could be improved"). They were just unlucky enough to be the page I stumbled upon when searchiing the phrase "diagram explaining plants". I have no idea what rules their content management system imposes on them.