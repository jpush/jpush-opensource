var xmlhttp;
function loadXMLDoc(url)
{
xmlhttp=null;
if (window.XMLHttpRequest)
  {// code for IE7, Firefox, Opera, etc.
  xmlhttp=new XMLHttpRequest();
  }
else if (window.ActiveXObject)
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
if (xmlhttp!=null)
  {
  xmlhttp.onreadystatechange=state_Change;
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
  }
else
  {
  alert("Your browser does not support XMLHTTP.");
  }
}

function state_Change()
{
if (xmlhttp.readyState==4)
  {// 4 = "loaded"
  if (xmlhttp.status==200)
    {// 200 = "OK"
    var obj= eval ("(" + xmlhttp.responseText + ")");

    var repos=document.getElementById("repos");
    for (var i=0; i < obj.length;i++) {
          var ul=document.createElement("ul"); 

          var li_name_a=document.createElement("a");
          li_name_a.setAttribute("href", obj[i].html_url); 

          var name_a=document.createTextNode(obj[i].name);
          li_name_a.appendChild(name_a);

          var li_name=document.createElement("li");
          li_name.appendChild(li_name_a);

          li_name.setAttribute("class", "name"); 
          ul.appendChild(li_name);

          var li_description=document.createElement("li");
          var description=document.createTextNode(obj[i].description);
          li_description.appendChild(description); 
          li_description.setAttribute("class", "description");        
          ul.appendChild(li_description);

          var li_language=document.createElement("li");
          var language=document.createTextNode(obj[i].language);
          li_language.appendChild(language);  
          li_language.setAttribute("class", "language");     
          ul.appendChild(li_language);

          repos.appendChild(ul);
        };
    }
  else
    {
    alert("Problem retrieving XML data:" + xmlhttp.statusText);
    }
  }
}

$.get("https://api.github.com/orgs/jpush/repos?page=1&per_page=100",function(data,status){
    $("#num-repos").text(data.length);

    data.sort(function(y,x){
        return x["updated_at"].localeCompare(y["updated_at"]);
        });
    for (var i = 0; i < 3; i++) {
        var $item_name = $("<li>");

        var $name = $("<a>").attr("href", data[i]["html_url"]).text(data[i]["full_name"]);
        $item_name.append($("<span>").addClass("name").append($name));

        $item_name.appendTo("#recently-updated-repos");

        var $item = $("<li>");

        var pushed_at=data[i]["pushed_at"];
        var date=pushed_at.substring(0,10);
        //alert(date);

        var $time = $("<a>").attr("href", data[i]["html_url"] + "/commits").text(date);
        $item.append($("<span>").addClass("time").append($time));

        $item.append('<span class="bullet">   </span>');

        var $watchers = $("<a>").attr("href", data[i]["html_url"] + "/watchers").text(data[i]["watchers"] + " stargazers");
        $item.append($("<span>").addClass("watchers").append($watchers));

        $item.append('<span class="bullet">   </span>');

        var $forks = $("<a>").attr("href", data[i]["html_url"]  + "/network").text(data[i]["forks"]+ " forks");
        $item.append($("<span>").addClass("forks").append($forks));

        $item.appendTo("#recently-updated-repos");
    }
    
});

$.get("https://api.github.com/orgs/jpush/members?page=1&per_page=100",function(data,status){
    $("#num-members").text(data.length);
});





