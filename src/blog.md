---
title: 'Writing'
layout: 'layouts/feed.html'
pagination:
  data: collections.blog
  size: 5
description: 'Thoughts & opinions by Joshua Kinal. Contains writing about design engineering, semantic code and web standards, and opinions about TV, film, music and books.'
intro:
  subtitle: 'Things I've written recently'
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---

Firm views, loosely held
: Based on the information I have at the time, this is my point of view. The great thing about continuously learning is that new information can change one's thinking on a topic.

<!-- todo:
- [ ] Set up layouts/feed.html
- [ ] See [blog feeds lesson](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/11/)
- [ ]  Set up partials/page-header.html
- [ ]  Set up partials/post-list.html
- [ ]  Pagination needs a partial
- [ ]  tags need an index page
- [ ]  see [Cascading Data](https://piccalil.li/course/learn-eleventy-from-scratch/lesson/7/#heading-cascading-data) for some more data functionality
todo: \\ -->
