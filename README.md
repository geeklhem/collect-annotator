# collect-annotator

A small [Annotator](http://annotatorjs.org/) plugin made to send by email all current annotations. 

## Live-Demo
A [live demo is available](http://www.eleves.ens.fr/home/doulcier/projects/collect-annotator/demo.html).

## How to

As collect-annotator is a plugin to Annotator, so obviously you need
to have it enabled on your webpage. Go to Annotator's [Getting
Started](http://docs.annotatorjs.org/en/latest/getting-started.html)
documentation page for more information.

Then, assuming you have downloaded the `collect-annotator.js` file in the same folder as your webpage, you have to add the following to your HTML header (this snippet also load a hosted version of JQuery and Annotator):

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
<script src="http://assets.annotateit.org/annotator/v1.1.0/annotator-full.min.js"></script>
<link rel="stylesheet" href="http://assets.annotateit.org/annotator/v1.1.0/annotator.min.css">
<script src="collect-annotator.js"></script>
<script>
  jQuery(function ($) {
  var content = $('#content').annotator();
  content.annotator('addPlugin', 'Collect');
  });
</script>
```

You also have to add a link to use collect-annotator:

```html
<div id="content">
Your text that need to be annotated.
</div>
<button id="send">Send the annotations</button>
```

The neat thing is that, as it is a `mailto` link, sending the
annotation will open the email in your favorite client for some
last-minute reworking.

## Example output

Here is an example of email. 

```Hello,

Here are my annotation for the document Demonstration of collect-annotator.

From p[1]:3 to p[1]:30
>>> Lorem ipsum dolor sit amet,

Maybe that's a little bit overused as an introduction.

From p[2]:4 to p[2]:617
>>> Fusce tristique tristique orci [...] gnissim. Cras nec luctus nisl.

Remove this entire paragraph

From p[3]:230 to p[3]:272
>>> In laoreet pretium odio, ac ultrices nibh.

Are you sure about that ?

From p[4]:256 to p[4]:295
>>> Morbi gravida fringilla nisl eu varius.

I would rather say :
" Lorem ipsum dolor si amet "
But that's up to you.

Regards,

```

# License

This program is distributed under the term of the GNU General Public
License v3 (or later) with ABSOLUTELY NO WARRANTY. This is free
software, and you are welcome to redistribute it.

