
$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.modal').modal();
  });

  $(".g-7-button").on("click",function(){
    $(".g-7-collapsible").show();
  });


  //on create new worksheet click

  $(".generate").on("click",".create-worksheet",function(){

    $('.regenerate').attr('data',$(this).attr('data'));

    switch ($(this).attr('data')){
      case 'order-decimals':
          return decimalWorksheet();
      case 'integer-addition':
          return integerAdditionWorksheet();
      case 'integer-subtraction':
          return integerSubtractionWorksheet();
      case 'order-integers':
          return orderIntegersWorksheet();
      case 'find-LCM':
          return LCMWorksheet();
      case 'find-GCF':
          return GCFWorksheet();
      case 'fraction-addition':
          return addingFractionsWorksheet();
      case 'fraction-subtraction':
          return subtractingFractionsWorksheet();
      default:
          break;
  
    };
  });

  function decimalWorksheet(){

    $.get("/decimal", function(data) {
    
     document.getElementById("i").src="./decimal"
    });
  }