---
title: "A cup of tea, not a piece of cake"
author: "Joshua Kinal"
date: "2023-07-24"
tags: ["eleventy", "build in public", "netlify"]
summary: "xxxx"
---

One of the problems with my [principles for this site](/about#principles-for-this-site) is that I’m not as technically adept as the environment I’m working in requires of me.

For the past few weeks I wanted to post some thoughts and opinions. This was not as simple as it is for most sites. Every time I pushed a new post into my git repository, the [automated build process](https://www.netlify.com/products/build/) that helps my website be simple, static HTML on your side of the screen, failed.

Obviously, not so simple on my side.

## The strange constancy of the panic loop

Netlify (my website hosts), provide a local [command line interface version of their platform](https://www.netlify.com/products/cli/) so that I can test the site on my own machine before sending it out to the world. It was working perfectly for me. Not so perfect when in the wild.

I searched through documentation and help resources all over the web, trying to match up what I had in my codebase with some other problem someone else tried to solve a couple of years ago that spawned a similar error. But nothing matched.

I started building a gentle panic that looped the following steps:

1. see a reference or instruction that seemed like a plausible option
2. changing a command in `netlify.toml` or comment out a line in `package.json`
3. commit the changes
4. run the site locally (and successfully)
5. push the changes to my git repo
6. watch the build fail on netlify
7. search another phrase in the failure messaging

This kind of slightly panicked loop is not unusual for me with things I don’t understand but wish I did. I pretend to myself that I learn by trying and failing, but that’s only sometimes true.

I could spend hours trying to debug a problem like this. These are not well-spent hours because there is not method to what I’m doing. Self-awareness of the futility of my actions does not reduce the anxiety associated with the task.

## Seek out wise friends

[Lilly Ryan is a very wise person](https://aus.social/@attacus) and I am lucky enough to call her my friend. She deals with high stress situations in her day-to-day work as a software security expert. Her process for dealing with any kind of breach starts with this first step:

> First, make a cup of tea.

It’s brilliant advice that is probably not that often heeded.

Of course, it doesn’t have to be a cup of tea, or any beverage for that matter. The point is to walk away from the problem for a short amount of time and do something that aids relaxation. It puts one’s mind in a much better position for solving problems.

For me, that cup of tea was actually several days away from my computer. I just didn’t sit at my desk for a few days. Then, when I did, I made a conscious decision to try something much more sensible as a starting point.

I properly read the error log from the latest failed build. Rather than looking at it as a jumble of text shouting problems at me, I decided to read the whole thing like it was trying to tell me a story. (Granted, it’s a story most people would find boring, which is why I saved the really technical stuff to later, so you can ignore it.)

Doing this gave me a bit more insight. I was looking at the error codes, but the log was giving me much more information. It told me exactly where the problem was, even if it didn’t tell me _what_ the problem was. It gave me my first clue to follow.

The way these things work, the first clue leads to the next (or several others) and there turn out to be a limited number of things to try. Going through them one-by-one helps to eliminate some before landing on the one that actually works.

Without the time away from the problem and the shift in mindset when getting back to it, I wouldn’t be able to publish this post today.

## The problem and how I fixed it

_**Note**: If you’re not into really technical stuff, bail out here._

The bit of the [log output](#the-log-output) I hadn’t noticed before read:

```log
Error location
In build.command from netlify.toml:
eleventy
```

That was important. I had recently changed that command to be more in line with the instructions provided by Netlify. But this was not the right thing to do.

I had also recently changed my environment from using NPM to [Yarn](https://yarnpkg.com/). I don’t remember why. Maybe I read somewhere that Yarn was cool.

I followed the clues back to how I was building locally and the commands I was using. I actually needed to change the build command to:

```toml
yarn run production
```

That matches something I have in my `package.json` file and tells Netlify to build all the things correctly.

## The log output

```log
[11ty] Problem writing Eleventy templates: (more in DEBUG output)
[11ty] 1. Having trouble writing template: dist/blog/resistance-to-writing/index.html (via EleventyTemplateError)
[11ty] 2. (./src/_includes/layouts/post.html)
[11ty]   Error: template not found: css/critical.css (via Template render error)
[11ty]
[11ty] Original error stack trace: Template render error: (./src/_includes/layouts/post.html)
[11ty]   Error: template not found: css/critical.css
[11ty]     at Object._prettifyError (/opt/build/repo/node_modules/nunjucks/src/lib.js:36:11)
[11ty]     at /opt/build/repo/node_modules/nunjucks/src/environment.js:563:19
[11ty]     at eval (eval at _compile (/opt/build/repo/node_modules/nunjucks/src/environment.js:633:18), <anonymous>:43:11)
[11ty]     at createTemplate (/opt/build/repo/node_modules/nunjucks/src/environment.js:295:11)
[11ty]     at next (/opt/build/repo/node_modules/nunjucks/src/lib.js:330:7)
[11ty]     at handle (/opt/build/repo/node_modules/nunjucks/src/environment.js:329:11)
[11ty]     at /opt/build/repo/node_modules/nunjucks/src/environment.js:339:9
[11ty]     at next (/opt/build/repo/node_modules/nunjucks/src/lib.js:328:7)
[11ty]     at Object.asyncIter (/opt/build/repo/node_modules/nunjucks/src/lib.js:334:3)
[11ty]     at Environment.getTemplate (/opt/build/repo/node_modules/nunjucks/src/environment.js:321:9)
[11ty] Benchmark    148ms  37%     1× (Data) `./src/_data/a11ytutorials.js`
[11ty] Wrote 0 files in 0.34 seconds (v1.0.2)
​
build.command failed
────────────────────────────────────────────────────────────────
​
  Error message
  Command failed with exit code 1: eleventy (https://ntl.fyi/exit-code-1)
​
  Error location
  In build.command from netlify.toml:
  eleventy
​
  Resolved config
  build:
    base: /opt/build/repo
    command: eleventy
    commandOrigin: config
    environment:
      - NODE_VERSION
      - REVIEW_ID
    publish: /opt/build/repo/dist
    publishOrigin: config
  plugins:
    - inputs: {}
      origin: config
      package: netlify-plugin-webmentions
Build failed due to a user error: Build script returned non-zero exit code: 2
Failing build: Failed to build site
Finished processing build request in 41.967s
```
