	var totalHeight = 720;
	var totalWidth = 930;
	$(function() {
		$(".actionsDiv").css("cursor", "pointer");
  		$(".actionsDiv").click(function(){
  			if (!$(this).parent().hasClass("expanded")){
	  			$(".targetBack").css("height", "20px");

	  			$(".targetDiv").toggleClass("collapsed");
	  			$(this).parent().toggleClass("collapsed");
	  			$(this).parent().toggleClass("expanded");  
	  			$(".indicatorsDiv").hide();
	  			$(".cifGroupsDiv").hide();
	  			$(".aichiTargetsDiv").hide();
	  			$(".actionsDiv").hide();

	  			$(this).show();	
	  			$(this).children().first().hide();
	  			$(this).css("height", (totalHeight - 270));
	  			$(this).parent().find(".action").show();
	  			$(this).parent().find(".action").css("width", totalWidth);

	  			var actionCount = $(this).children().length - 1;
	  			var actionHeight = (totalHeight - 270) / actionCount;
	  			$(this).parent().find(".action").css("height", actionHeight);
	  			$(this).parent().find(".action").css("padding-top", (actionHeight/2)-10);
	  		}
  		});
  		$('body').on('click', '.expanded .action', function () {
  			if (!$(this).parent().parent().hasClass("actionsExpanded")){
	  			$(".actionBack").css("height", "40px")
	  			//$(".actionBack").removeClass().addClass("actionBack").addClass("target2Bg");
	  			//$(this).parent().parent().find(".targetId").hide();
	     		//$(this).parent().parent().find(".targetDesc").hide();
	  			var actionCount = $(this).siblings().length;
	  			var actionHeight = (totalHeight - 40) / actionCount;
	  			$(this).parent().find(".action").css("height", actionHeight);
	  			$(this).parent().find(".action").css("padding-top", "10px");
	  			$(this).parent().find(".action").css("cursor", "auto");
	  			$(this).parent().css("margin-top", "40px");
	  			$(this).parent().css("height", "100%");
	  			$(this).parent().find(".actionDesc").show();
	  			$(this).parent().parent().toggleClass("actionsExpanded");
	  		}
		});
		$(".actionBack").css("cursor", "pointer");
		$(".actionBack").click(function(){
			$(".actionBack").css("height", "0px")
  			//$(".targetId").show();
     		//$(".targetDesc").show();	
     		$(".actionDesc").hide();	
     		
			$(".actionsExpanded").find(".actionsDiv").css("margin-top", "0px");
     		var actionCount = $(".actionsExpanded").find(".actionsDiv").children().length - 1;
     		var actionHeight = (totalHeight - 270) / actionCount;
     		$(".actionsExpanded").find(".action").css("height", actionHeight);
     		$(".actionsExpanded").find(".action").css("cursor", "pointer");
     		$(".actionsExpanded").find(".action").css("padding-top", (actionHeight/2)-10);

     		$(".targetDiv").removeClass("actionsExpanded");	
		});		
  		$(".targetBack").css("cursor", "pointer");
  		$(".targetBack").click(function(){
  			$(".targetBack").css("height", "0px");

  			$(".actionBack").css("height", "0px")
  			//$(".targetId").show();
  			$(".targetId").css("height", "270px")
     		//$(".targetDesc").hide();

  			$(".targetDiv").removeClass("collapsed");
  			$(".targetDiv").removeClass("expanded");
  			$(".targetDiv").removeClass("actionsExpanded");

			var divHeight = (totalHeight - 270) / 4;

			$(".action").css("cursor", "pointer");

  			$(".actionsDiv").show();
  			$(".actionsDiv").css("cursor", "pointer");
  			$(".actionsDiv").css("height", divHeight);
  			$(".actionsDiv").css("margin-top", "0px");
  			$(".actionsDiv").children().hide();
			$(".actionsDiv > div:first-child").show();

			$(".actionDesc").hide();
			
  			$(".indicatorsDiv").show();
  			$(".indicatorsDiv").css("cursor", "pointer");
  			$(".indicatorsDiv").css("height", divHeight);
  			$(".indicatorsDiv").children().hide();
			$(".indicatorsDiv > div:first-child").show();

  			$(".cifGroupsDiv").show();
  			$(".cifGroupsDiv").css("cursor", "pointer");
  			$(".cifGroupsDiv").css("height", divHeight);
  			$(".cifGroupsDiv").children().hide();
			$(".cifGroupsDiv > div:first-child").show();

  			$(".aichiTargetsDiv").show();
  			$(".aichiTargetsDiv").css("cursor", "pointer");
  			$(".aichiTargetsDiv").css("height", divHeight);
  			$(".aichiTargetsDiv").children().hide();
			$(".aichiTargetsDiv > div:first-child").show();  			
  		});

  		$(".cifGroupsDiv").css("cursor", "pointer");
  		$(".cifGroupsDiv").click(function(){
  			if (!$(this).parent().hasClass("expanded")){
				$(".cifGroupsDiv").css("cursor", "auto");

	  			$(".targetBack").css("height", "20px");

	  			$(".targetDiv").toggleClass("collapsed");
	  			$(this).parent().toggleClass("collapsed");
	  			$(this).parent().toggleClass("expanded");  
	  			$(".actionsDiv").hide();
	  			$(".indicatorsDiv").hide();
	  			$(".aichiTargetsDiv").hide();  		
	  			$(".cifGroupsDiv").hide();

	  			$(this).show();	
	  			$(this).children().first().hide();
	  			$(this).css("height", (totalHeight - 270));	
	  			$(this).parent().find(".cifGroup").show();
	  			$(this).parent().find(".cifGroup").css("width", totalWidth);
	  			var indicatorHeight = (totalHeight - 270);
	  			$(this).parent().find(".action").css("height", indicatorHeight);  	
	  		}		
  		});

  		$(".indicatorsDiv").css("cursor", "pointer");
  		$(".indicatorsDiv").click(function(){
  			if (!$(this).parent().hasClass("expanded")){
				$(".indicatorsDiv").css("cursor", "auto");

	  			$(".targetBack").css("height", "20px");

	  			$(".targetDiv").toggleClass("collapsed");
	  			$(this).parent().toggleClass("collapsed");
	  			$(this).parent().toggleClass("expanded");  
	  			$(".actionsDiv").hide();
	  			$(".cifGroupsDiv").hide();
	  			$(".aichiTargetsDiv").hide();  		
	  			$(".indicatorsDiv").hide();

	  			$(this).show();	
	  			$(this).children().first().hide();
	  			$(this).css("height", (totalHeight - 270));	
	  			$(this).parent().find(".indicator").show();
	  			$(this).parent().find(".indicator").css("width", totalWidth);
	  			var indicatorHeight = (totalHeight - 270);
	  			$(this).parent().find(".action").css("height", indicatorHeight);  	
	  		}		
  		});
  		$(".aichiTargetsDiv").css("cursor", "pointer");
  		$(".aichiTargetsDiv").click(function(){
  			if (!$(this).parent().hasClass("expanded")){
				$(".aichiTargetsDiv").css("cursor", "auto");

				$(".targetBack").css("height", "20px");

	  			$(".targetDiv").toggleClass("collapsed");
	  			$(this).parent().toggleClass("collapsed");
	  			$(this).parent().toggleClass("expanded");  
	  			$(".indicatorsDiv").hide();
	  			$(".cifGroupsDiv").hide();
	  			$(".actionsDiv").hide();
	  			$(".aichiTargetsDiv").hide();

	  			$(this).show();
	  			$(this).children().first().hide();
	  			$(this).css("height", (totalHeight - 270));
	  			$(this).parent().find(".aichiTarget").show();
	  			$(this).parent().find(".aichiTarget").css("width", totalWidth);
	  			var aichiTargetCount = $(this).children().length - 1;
	  			var aichiTargetHeight = (totalHeight - 270) / aichiTargetCount;
	  			$(this).parent().find(".aichiTarget").css("height", aichiTargetHeight);
	  		}
  		});  		
	});