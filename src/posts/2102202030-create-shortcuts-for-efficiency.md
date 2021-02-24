---
title: 'Spending 90 minutes to save 2'
author: 'Joshua Kinal'
date: '2021-02-20'
tags: ['command line', 'build in public', 'efficiency']
summary: 'Working with technology can mean a lot of repetitive tasks. Is the time taken to automate them worth it? This is what it took to make remove more barriers to blogging.'
---

## tl;dr
I go to a lot of trouble to make things easier for myself. Sometimes this means spending hours doing some very nerdy stuff to automate processes. I know that, even with this amount of effort, I'm not automating as much as I could, but it’s enough for now. There are always improvements to be made but there’s a great satisfaction in creating efficiencies through technology.

## Longer version with lots of detail
This morning I spent about 90 minutes working out a way to create a basic template for my blog posts.

If I was using WordPress, like I did up until now, it wouldn’t be a problem. WordPress lays everything out nicely in a graphical user interface and it’s basically like filling out a form. There's an area for adding tags and one for putting in the post’s title, another for a precis and a great big area for typing the post itself.

[Eleventy](https://www.11ty.dev/) has none of those handy things. To create a new post I have to follow these steps:

1. Create a new text file in the correct directory and make sure it has a `.md` extension, which defines it as Markdown.
2. Open that file in my text editor.
3. Declare the [“front matter”](https://www.11ty.dev/docs/data-frontmatter/)&mdash;a bunch of lines that define all the things WordPress has fields and checkboxes for.
4. Start typing.

To give you an idea of what I'm talking about, this is what the front matter looks like for this post:

```
---
title: 'Spending 90 minutes to save 2'
author: 'Joshua Kinal'
date: '2021-02-20'
tags: ['command line', 'build in public', 'efficiency']
summary: 'Working with technology can mean a lot of repetitive tasks. Is
          the time taken to automate them worth it? This is what it took
          to make remove more barriers to blogging.'
draft: 'true'
---
```

Most of that isn’t a problem except for a couple of things that are truly tedious:

* I keep getting the path to my blog post directory wrong. Is it “post” or “posts”? Even if I try to remember it, next time I’ll second-guess myself and get it wrong. Then I have to move it from a folder that never existed to the one that does exist and then delete the folder I created erroneously.
* I can’t remember what front matter goes into the start of a post.

Title, author, date, tags, summary, draft. Six things should be easy to remember. It's not.

Surely it’s just a matter of practice. If I did it often enough, I’d remember all of that stuff.

But worrying about getting all the front matter wrong and putting the file in the wrong directory created a mental barrier for me to pass. I wouldn’t write more often with that barrier. Therefore, I would not learn all of these seemingly arbitrary things by rote.

### Using the tools in my kit

I like to work quickly and have many shortcuts set up on my computer to make getting tasks done easier. Creating a new text file is easy because I use _Visual Studio Code_[^1] as my text editor and [it has a handy command line tool](https://code.visualstudio.com/docs/editor/command-line).

That means I can [open up my terminal](https://www.macupdate.com/blog/post/91-mac-terminal-commands-list)[^2] and type something like `code newblogpost.md` and it will create a new file in whatever directory I'm in with the filename “newblogpost.md” and open it in _VS Code_.

Great. But that’s only a tiny part of what needs to happen to get a blog post working.

Because I work with the terminal so much, I could create a shell script, but that’s something I’ve never really spent enough time learning that. I tried once and then didn’t use that skill and it was lost to time.

What I do have is [_Text Expander_](https://textexpander.com/).[^3] I've used it for years and it means I can type a little shortcut that expands into a larger piece of text. It’s very versatile and pretty powerful. For a simple example, if I want to write my name, I don't have to type the whole thing out. I just type `jjk` and all 12 characters (including the space) pops onto my screen. It's super-handy.

I could put the front matter text in _Text Expander_ to make it a lot easier. But if I’m already using this tool to save me from typing stuff, I should try to save as much typing as possible.

### Bring in da automation (Bring in da funk)

I already had a _Text Expander_ snippet that created the date in the format I want. I type `chdate` and it types out today’s date in a reverse format with dashes. I called it `chdate` because it’s the way my Chinese colleagues write the date and that makes it easier to remember. I also have `revdate` which just types out the date in reverse order and no spaces (handy for creating filenames that will sort by date created). Then there’s `ddate` to write out today’s date in full.

_Text Expander_ lets me use snippets inside snippets. I can use `chdate` inside the snippet for the front matter and `revdate` to create the filename. So I create two new snippets:

1. Create the front matter
2. Create the filename

The filename needs the absolute path every time I type the shortcut because it shouldn’t matter what directory my terminal is open in, I need to put the blog posts in the same directory in my for it to publish properly when I push it to my git repository.

What makes sense in the way we use programs is that we create a file, open a file and then fill it in with the words or whatever. That's not the way things work in the terminal. There’s a command called `echo` in the terminal that just prints on the screen anything that follows it. But if I put a `>` character after it and a filename, it will create a file with that content in already in it.

Then, if I create a third snippet that brings the `echo` command, complete with the front matter, together with the filename snippet, joined by a `>`, the file I need will exist. This third snippet will also follow that combined command with the press of a `return` key (a function _Text Expander_ offers), and finally the `code` command from before, followed by a call to the filename snippet again and another press of the `return` key.

### Is that all worth it?

To create a new blogpost, all I have to do now is type `;mkpost` and it goes through all of those steps for me. Instead of writing all the front matter and typing out the absolute path and remembering all those things, a quick seven characters gets it all done.

For me it is definitely worth it. Over the coming months I’ll hopefully use this snippet hundreds of times. It would take about two minutes to type out all of that front matter. Now the whole thing can take about three seconds to get me writing.

In 50 blog posts’ time, I'll have made all of that time back. Every post after that is time in the bank. On top of that, I get a bit of satisfaction every time it all works exactly how I want it to.

That’s worth it for me, but I know it’s not for most.

[^1]: Branding is really important. Earlier this century I worked at a web design company that built sites using [Microsoft .Net C#](https://dotnet.microsoft.com/learn/csharp). They used an <abbr title="integrated development environment">IDE</abbr> called _Visual Studio_ and it was this weird thing that looked like a text editor but the coders would drag and drop bits of code from a small window into a larger window. I did not like using that <abbr>IDE</abbr>, I did not like working with .Net and I did not like that job. It took **a lot** of convincing by colleagues more recently to use _Visual Studio Code_. It is nothing like that traumatic tool I was exposed to. Now I rely on it for almost all the work I do. It’s versatile and extensible and saves me lots of time. 

[^2]: I highly recommend [a little book called _Working the Command Line_ by Remy Sharp](https://abookapart.com/products/working-the-command-line?_pos=1&_sid=1317c873c&_ss=r). The terminal can seem really scary because we’re conditioned to just point and click our way through our computer life. But working on the command line can save a whole bunch of time and help someone understand more about the machine they’re working with every day.

[^3]: I am always happy to pay for software that that creates so much utility for me. Unfortunately, a few years ago Smile Software decided that _Text Expander_ would be better as a subscription model rather than buying a licence for each major release. To their credit, they still support the prior version I paid for.