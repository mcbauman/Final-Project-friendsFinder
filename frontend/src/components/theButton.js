
import React from 'react';

export default function App()
{
  return (
    <div>
      $("a b").html(function(index, html) {
  html.replace(/\S/g, '<span>$&</span>');
});

$("a").click(function(){
        $("a").addClass("loading");     
        setTimeout(function(){
          $("a").removeClass("loading"); 
        }, 8000);

});
    </div>
  );
}
