(function loadQiita() {
  chrome.storage.sync.get((data) => {
    changeQiita(data);
  });
})();

function changeQiita(c) {
  var css = "";
  //header color
  document.getElementsByClassName("st-Header")[0].style.backgroundColor = c.headerColor;

  //top link color
  css += cssLink(".tr-Item_title",c.topLinkColor,c.topLinkColorVisited,c.topLinkColorHover);

  //top User Name color
  css += cssLink(".tr-Item_author",c.topUsernameColor,c.topUsernameColorVisited,c.topUsernameColorHover);

  //last
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
}

function cssLink(css,c,v="",h=""){
  return ''+css+':link{color:'+c+'} '+css+':visited{color:'+v+'} '+css+':hover{color:'+h+'}';
}