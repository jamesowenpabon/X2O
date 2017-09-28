# X2O
XML 2 Javascript Object Parser

Requires JQuery 1.9

//Multiple Constructors
myObj = new X2O.XML2OBJECT(xmlUrl, postProcessCallback [,startNode]);
urObj = new X2O.XML2OBJECT(xmlUrl2, postProcessCallback [,startNode]);
			
//Multiple Function Calls
X2O.XML2OBJECT(xmlUrl, postProcessCallback [,startNode]);
X2O.XML2OBJECT(xmlUrl2, postProcessCallback [,startNode]);

Objects available in postProcessCallback function
  //All created Javascript Objects
  X2O.jdata
  //Array of all parsed XML Documents
  X2O.xdata
  //Contructed Objects
  myObj - contains xmlUrl1 Javascript Object
  urObj - contains xmlUrl2 Javascript Object
  
