//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

var director_copy = $("#directorinput").clone();
var director_count_text = "Director #";
var director_count;
director_count = 1;

$(".next").click(function(val){
  console.log(this.id);
  var id = this.id.substr(this.id.length - 1);
  console.log(id); // => "1"

  var formTab = $("#msform fieldset").children("."+this.id);
  
  if(id === "2") {
    formTab = $("#msform fieldset .directorinputclass").children("."+this.id);
  }
  
  formTab.each(function(){ 
    console.log(this.value === "");
    console.log(this.name)

    if(this.value === "") {
      console.log("alert"+id);
      $("#alert"+id).show();
      return false;
    } 

    if($(this).hasClass('nextlast'))
      {
        if(animating) return false;
        animating = true;
        
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

                
        if(id === "2") {

          current_fs = $(this).parent().parent();
          next_fs = $(this).parent().parent().next();
        }

        
        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show(); 
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
              'transform': 'scale('+scale+')',
              'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
          }, 
          duration: 800, 
          complete: function(){
            current_fs.hide();
            animating = false;
          }, 
          //this comes from the custom easing plugin
          easing: 'easeInOutBack'
        });

      }
});

	
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
      			current_fs.css({'position': ''});
      			previous_fs.css({'position': 'relative'});


		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
  //save cookies
  console.log("submitting");
  console.log(this);
  console.log(this.id);
  
  var id = this.id.substr(this.id.length - 1);
  console.log(id); // => "1"

  var formTab = $("#msform fieldset").show();


})
  
function removeDirectorsButtonHTML() {
     return '&nbsp;<span class="badge badge-pill badge-warning" onclick="removeDirectors(this);">-</span>';
  }

function addDirectors() {
  director_count++;
  
  var added_director = director_copy.clone().attr( "id", "directorinput"+director_count).insertBefore($("#addDirectorButton"));
  
  $.each(added_director.children("input"), function(key, value) {
    console.log(value);
    console.log(value.name);
    value.name = value.name + director_count;
  })
  added_director.find("p").html(director_count_text+director_count + removeDirectorsButtonHTML());
}

function removeDirectors(director) {
  director_count--;
  
  $(director).parent().parent().remove();
  
  $("#msform fieldset .directorinputclass").each(function(index,value) {
    console.log(index + ": " + value);
    console.log(value);
    
    $(value).attr( "id", "directorinput"+(index+1));
    $(value).find("p").html(director_count_text+(index+1) + removeDirectorsButtonHTML());
    
    $(value).children("input").each(function(key,value){
      value.name = director_copy.children("input")[key].name + (index+1);
    });
  });  
}