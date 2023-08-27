---
title: "Form test 2023-08-15"
description: "A page used to create a dummy form"
intro:
  subtitle: "In this module, we discussed what it means to make a form."
---

<form name="form-test-20230814" method="POST" data-netlify="true">
  <label>Your Name: <input type="text" name="name" /></label>   
    <label>Your Email: <input type="email" name="email" /></label>
    <label>Your Role: <select name="role[]" multiple>
      <option value="leader">fruit</option>
      <option value="follower">Follower</option>
    </select></label>
    <label>Message: <textarea name="message"></textarea></label>
    <fieldset class="bigRadio three-opt">
    <legend>
    how would you rate this session?
    </legend>
  <div class="ratingOptions">
    <input type="radio" id="rating1" name="rating" value="1">
      <label for="rating1">I learnt nothing. I expected more. The presenter was a monster and I should have been learning how to roll cigarettes instead.</label>
  </div>
  <div class="ratingOptions">
    <input type="radio" id="rating2" name="rating" value="2">
    <label for="rating2">2</label>
  </div>
  <div class="ratingOptions">
    <input type="radio" id="rating3" name="rating" value="3">
    <label for="rating3">3</label>
  </div>
  </fieldset>
    <button type="submit">Send</button>
</form>
