

$.get("https://api.github.com/orgs/jpush/repos",function(data,status){
    data.sort(function(y,x){
        return x["updated_at"].localeCompare(y["updated_at"]);
        });
    var obj= eval(data);
    var repos=document.getElementById("repos");
    for (var i=0; i < obj.length;i++) {
          var ul=document.createElement("ul"); 
          ul.setAttribute("class","col-md-4 col-sm-6 col-xs-12"); 

          var ul_div=document.createElement("div");
          ul_div.setAttribute("class","ul_div"); 
          ul.appendChild(ul_div);

          var li_name_a=document.createElement("a");
          li_name_a.setAttribute("href", obj[i].html_url); 

          var name_a=document.createTextNode(obj[i].name);
          li_name_a.appendChild(name_a);

          var li_name=document.createElement("li");
          li_name.appendChild(li_name_a);

          li_name.setAttribute("class", "name"); 
          ul_div.appendChild(li_name);

          if (obj[i].language!=null) {
                var li_language=document.createElement("li");
                var language=document.createTextNode(obj[i].language);
                li_language.appendChild(language);  
                li_language.setAttribute("class", "language");     
                ul_div.appendChild(li_language);
          }

          var li_stars=document.createElement("li");
          var stars=document.createTextNode("Star"+" : "+obj[i].stargazers_count);
          li_stars.appendChild(stars); 
          li_stars.setAttribute("class", "star");  
          ul_div.appendChild(li_stars);


          var li_description=document.createElement("li");
          var description=document.createTextNode(obj[i].description);
          li_description.appendChild(description); 
          li_description.setAttribute("class", "description");  

          ul_div.appendChild(li_description);

/*
          var li_stars=document.createElement("li");
          var stars=document.createTextNode("Star"+" : "+obj[i].stargazers_count);
          li_stars.appendChild(stars); 
          li_stars.setAttribute("class", "language");  
          ul_div.appendChild(li_stars);
*/
          repos.appendChild(ul);
        }
    }
);



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





