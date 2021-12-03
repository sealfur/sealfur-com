---
title: 'Content creators, meet HTML headings'
author: 'Joshua Kinal'
date: '2021-12-03'
tags: ['accessibility', 'CMS', 'content architecture']
summary: 'Many accessibility problems stem from content creators using headings inappropriately. I look at how headings are part of a webpage’s structure and where mistakes happen.'
draft: "true"
---
In “[Accessibility is a nuanced problem](/blog/accessibility-is-a-nuanced-problem/)” I wrote:

> … there are two sets of problems we need to deal with:
>
> 1. people fundamentally don’t yet understand how HTML relates to the nature of content and
> 1. they are not practiced in thinking about other people’s experiences.

One set of those people were “content creators”. Many of the accessibility issues I see are the result of people just trying to add content to a website.

## Why accessibility mistakes happen

There is a fundamental mismatch we have to accept with the web: What people see when they create website content is different how it appears for someone else. That’s part of the nature of HTML. It’s a markup language that uses simple tags around some content to add a meaningful structure.[^2]

But HTML is only that. It’s the meaningful structure. It’s not the styles or the animation patterns or anything else. It just tells computers things like:

> This particular text is a heading. This text below it is a paragraph.
> 
> And this other thing is an image.
> 
> That image is stored somewhere else but should be present near this text. You understand that because it directly follows the paragraph.
> 
> Oh, and if the image doesn’t load, you can use this text in its place so that people still get the sense of what we want to illustrate.

HTML is dumb. It doesn’t know or care if headings are different sizes. It cares only about structure and that structure is important.

Most accessibility problems caused by content creators result from not understanding this structure. Or, maybe more accurately, how their actions affect this structure.

## Content hierarchy, visual hierarchy and meaning

Well-structured content has sections. We learn that in school when we learn about paragraphs. We know it from books when we experience chapters.

If text appears in just one big block with nothing separating the thoughts, it becomes difficult to read. So we implicitly understand content hierarchy.

Chapters can have sections, which can have subsections; Subsections have paragraphs, which have sentences. But how do we differentiate chapters from sections and subsections?

In a book you might have a chapter always start on a new page. It might have a lot of space around its title. A section also has a title that is probably bigger and bolder than the paragraph text. A subsection’s heading might also have big and bold text, but it would be smaller than a section’s title.

The different sizes of headings give us a visual representation of the content hierarchy. We design them to tell us, at a glance, that this bit of information *is a part of* this larger piece.

HTML breaks down this hierarchy really simply. There are six levels of headings. `<h1>` is the top-most heading. It’s is usually reserved for the title of the page and, because of problems I won’t go into now, it should only ever be used once per page.[^3]

What this means is that, if we want to section different parts of a page, we have to use `<h2>` as the start of that section. Any subsections would, therefore, have to begin with `<h3>`. This can continue on to the smallest heading, `<h6>`.

By default, browsers render HTML headings smaller at each level down the hierarchy. They interpret the structural hierarchy into a visual hierarchy to make a page easier to understand.

### Skipping heading levels is an accessibility problem

We use headings to be able to quickly scan a page and know where we might be able to find the information we’re looking for. For people viewing the page, they might scan it quickly and understand that the bigger headings are major section breaks.

If you can see this page, you know that this is a subsection of the bit about hierarchy. The subsection title’s font-size is smaller and it doesn’t have that little flourish at the start that the section titles have. That’s part of the visual hierarchy I created for this website.

Scanning is a lot more difficult if you need a computer to read the page to you. So technologies use the heading structure to help navigate a page. They might list all the headings in order. There’s an expectation that the content under an `<h3>` exists within the content defined by the `<h2>` above it.

For this reason, we don’t skip to an `<h5>` straight after an `<h2>`. It confuses computers. It makes it seem like there’s some content missing.

## Where the accessibility mistakes happen

For someone looking at a page, there’s no difference between a heading and text that is styled like a heading. For a computer there’s a big difference. Computers don’t care about styles unless we tell them to. And we don’t tell them to because styles change more often than conventions for semantics and structure.

This misunderstanding between how something looks and how it is interpreted is where heading-related accessibility mistakes are made. This is especially true using most content management systems (<abbr>CMS</abbr>).

To help people out, a CMS might use an interface called a [rich text editor (RTE)](https://en.wikipedia.org/wiki/Online_rich-text_editor "Wikipedia’s explanation of an RTE"). It lets people add content to a web page without having to learn HTML. It’s handy, but it never really works properly.

It kind of looks a bit like a small Microsoft *Word* interface. It usually has buttons to make things bold or italicised. It might have dropdowns to select different heading levels or even something to help change the size of the font.

People can see the changes they make to the content, but they can’t see what that does to the HTML structure. It causes all sorts of problems. Designers and developers are responsible for those. I’ll cover that in future posts.

Here are some examples of accessibility problems relating to headings as a result of using an RTE:

### 1. Applying headings to style for emphasis

   Sometimes people just want some paragraph to be bigger and bolder. So they highlight the text in the RTE and select a heading style from the dropdown because it gives them the size and font-weight they were looking for. Maybe they chose something called “Heading 4”.  

The CMS interprets this as a heading and will give that text an `<h4>` tag. That is a problem if the preceding heading was an `<h1>` of `<h2>`. It looks like a heading skipped.

### 2. Styling headings by adjusting the font’s size and weight

This is the inverse of Example 1. Someone wants to add a new heading to their text, but they don’t use the style dropdown. Instead, they just make the type bigger and bolder. It looks like a heading, but it is not a heading.

### 3. Adding space between a heading and a paragraph

Sometimes people will just add a blank line into the text to create space beneath a heading. The RTE interprets this as another heading line and creates an empty heading.

This is something else that confuses computers. They think there’s a heading there, but it has no text inside it. The computer will still tell someone there’s a heading there. That’s its job.

You end up with something like this:

```html
<h2>A section heading</h2>
<h2></h2>
<p>Can you see that there’s an empty level 2 heading tag
  just above this paragraph?</p>
```
## What you can do to stop this

For content creators, there are two things to do here:

1. Learn about content hierarchy and plan your content appropriately.
2. Do not try to style the content from inside the RTE. Don’t play with the font sizes and don’t use pre-built styles to do anything but what it’s intended for.

Designers and developers should have set up the <abbr title="content management system">CMS</abbr> to style all the text properly.

There are some links in the footnotes to resources that will help you understand a little more about HTML.

---

“Content creators, meet HTML headings” is the second post in a series about our common responsibility to build accessible digital products. The first was [“Accessibility is a nuanced problem”](/blog/accessibility-is-a-nuanced-problem/).


[^2]: If you want to start learning about HTML, try [Mozilla’s HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics). If you learn by watching more than reading, [Aaron Jack explains HTML](https://youtu.be/salY_Sm6mv4) in 5 minute video.

[^3]: A breakdown of the dreams, misunderstandings, misuse and philosophies around `<h1>` gets broken down in [Adrian Roselli’s excellent “There Is No Document Outline Algorithm”](https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html). 