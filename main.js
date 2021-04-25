/* Index page functions */
function indexPageActivate() {
    // values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
    var i = 0,
        a = 0,
        isBackspacing = false,
        isParagraph = false;

    // Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
    var textArray = [
        " Hello!| I am Lingjie Feng :-)",
        " Nice to meet you!"
    ];

    // Speed (in milliseconds) of typing.
    var speedForward = 60, //Typing Speed
        speedWait = 1000, // Wait between typing and backspacing
        speedBetweenLines = 1000, //Wait between first and second lines
        speedBackspace = 25; //Backspace Speed

    //Run the loop
    typeWriter("output", textArray, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace);
}

function displayMainPage() {
    window.location.href = "home.html";
}

function typeWriter(id, ar, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), //Header element
      eParagraph = element.children("h1"); //Subheader element
  console.log("asting;", aString);
  if (a == ar.length) {
      displayMainPage();  
      return;
  }
  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    console.log("typing;");
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
        console.log("less;");
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        console.log("change pipe;");
        setTimeout(function(){ typeWriter(id, ar, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace); }, speedBetweenLines);
        
      // If character isn't a pipe, continue typing.
      } else {
        console.log("normal text;"); 
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        console.log("again "); 
        setTimeout(function(){ typeWriter(id, ar, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace); }, speedForward);
      }
      
    // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      console.log("sdwitch;");
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace); }, speedWait);
      
    }
    
  // If backspacing is enabled
  } else {
    console.log("backspacing;");
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace); }, speedBackspace);
    
    // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else { 
      
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      //a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      a = a+1;
      setTimeout(function(){ typeWriter(id, ar, i, a, isBackspacing, isParagraph, speedForward, speedWait, speedBetweenLines, speedBackspace); }, 50);
    }
  }
}


/* Home page functions */
function homePageActivate() {
  $(function () {
    $(".navigation-tab-item").click(function () {
        $(".navigation-tab-item").removeClass("active");
        $(this).addClass("active");
        $(".navigation-tab-overlay").css({
            left: $(this).prevAll().length * 195 + "px"
        });
    });
  });
  $('#nav_container').mouseenter(function () {
    window.addEventListener('wheel', scrollevent);                 
  });
  $('#nav_container').mouseleave(function () {
    window.removeEventListener('wheel', scrollevent);
  });
}

function scrollevent(e) {
  var navContainer = $('#nav_container')[0];
  if (e.deltaY > 0) navContainer.scrollLeft += 100;
  else navContainer.scrollLeft -= 100;
}