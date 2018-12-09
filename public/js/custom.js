$(document).ready(function(){
 $('.actions .answer'). click(function(){ //alert('clickd');
     $(this).parents('.actions').siblings('.answer-box').toggleClass('hide');
 })
    
});