/* collect-annotator a small annotator.js plugin to send all current annotation by email. 
Author: Guilhem Doulcier
*/



/////////// INITIALISATION ////////////////
// Some global variable, I kown its bad but I am not that confortable
// with javascript namespaces. Should probably be fixed someday.
st = {};
id = 0;

/*
// A dummy st object to test purpose.
st = {0:{"text":"dummy text",
		 "quote":"dummy quote",
		 "ranges":[{
				 "start": "p7", 
				 "end": "p7", 
				 "startOffset": 0, 
				 "endOffset": 120
		 }]
		}} 
*/

/////////// EXPORT FUNCTIONS ////////////////

// Add the export function to a link with id "send"
$(document).ready(function() {
    $("#send").click(function()
					 {
					
						 document.location.href = 'mailto:?subject=[Annotations] '+$(document).attr('title')+'&body='+parse_object(st);
					 });
});

// Parse the annotation storing object (st in our case) fo display in email.
parse_object = function (obj){
	var s = "Hello,\n\n Here are my annotation for the document "+$(document).attr('title')+".\n\n"
	for (var id in obj){
		s += "From " + obj[id]["ranges"][0]["start"].replace(RegExp("/","g"),"")+":"+obj[id]["ranges"][0]["startOffset"]+" to ";
		s += obj[id]["ranges"][0]["end"].replace(RegExp("/","g"),"")+":"+obj[id]["ranges"][0]["endOffset"] + "\n";  
		var l = obj[id]["quote"].length
		if (l < 80) {
			s += ">>> " + obj[id]["quote"] + "\n\n";
		}else{

			s += ">>> " + obj[id]["quote"].substring(0,30)+" [...] "+ obj[id]["quote"].substring(l-30,l) + "\n\n";
		}
		s += obj[id]["text"] + "\n\n";
	}
	s += "Regards,\n"
	return escape(s)
}



/////////// ANNOTATOR PLUGIN ////////////////

Annotator.Plugin.Collect = function (element, options) {
  // Call the Annotator.Plugin constructor this sets up the .element and
  // .options properties.
  Annotator.Plugin.apply(this, arguments);
};


jQuery.extend(Annotator.Plugin.Collect.prototype, new Annotator.Plugin(), {
	events: {},
	options: {
    // Any default options.
	},
	pluginInit: function () {

		this.annotator
			.subscribe("annotationCreated", function (annotation) {
				annotation["id"] = id;
				id++;
				st[annotation.id] = {"text":annotation.text,
									 "quote":annotation.quote,
									 "ranges":annotation.ranges};
				//console.info("%o", annotation.ranges[0])

			})
			.subscribe("annotationUpdated", function (annotation) {
				st[annotation.id]["text"] = annotation.text;

			})
			.subscribe("annotationDeleted", function (annotation) {
				delete st[annotation.id] 
			});	  
  },
  myCustomMethod: function () {

  }
});
