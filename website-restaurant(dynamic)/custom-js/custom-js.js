$(function(){
    $("#menu-button").blur(function(event){
        var screenWidth = window.innerWidth;
        if(screenWidth<768){
            $("#navbarNav").collapse('hide');
        }
    });
});
(function(global){
    var dc = {};

    var homeHtml = "snippets/snippet-index.html";

    var allCategoriesUrl = "jsonData/allCategories.json";
    var categoriesTitleHtml = "snippets/snippet-categories-title.html";
    var categoryHtml = "snippets/snippet-menu-categories.html";

    var menuItemsUrl = "jsonData/allCategories";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";

    var aboutUsSnippet = "snippets/aboutus-snippet.html";

    var contactSnippet = "snippets/contact-snippet.html";

    var signupSnippet = "snippets/signup-snippet.html";

    var loginSnippet = "snippets/login-snippet.html";

    var insertHtml = function(selector,html){
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML=html;
    };

    var showLoading = function(selector){
        var html = "<div class='text-center'>";
        html += "<img src='images/loading.gif'></div>";
        insertHtml(selector,html);
    };

    var insertProperty = function(string,propName,propValue){
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace,"g"),propValue);
        return string;
    }

    document.addEventListener("DOMContentLoaded",function(event){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHtml,function(responseText){
            document.querySelector("#main-content").innerHTML=responseText;
        },
        false);
    });

    //load menu categories view
    dc.loadMenuCategories = function(){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML);
    };

    dc.loadMenuItems = function(categoryShort){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(menuItemsUrl+categoryShort+".json",buildAndShowMenuItemsHTML);
    }

    //build html for categories page based on the data from the server
    function buildAndShowCategoriesHTML(categories){
        $ajaxUtils.sendGetRequest(categoriesTitleHtml,function(categoriesTitleHtml){
            //retrieving single category snippet
            $ajaxUtils.sendGetRequest(categoryHtml,function(categoryHtml){
                var categoriesViewHtml = buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml);
                insertHtml("#main-content",categoriesViewHtml);
            },false);
        },false);
    }

    function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml){
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";

        for(var i=0;i<categories.length;i++){
            var html = categoryHtml;
            var name = ""+categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html,"name",name);
            html = insertProperty(html,"short_name",short_name);
            finalHtml += html;
        }
        finalHtml += "</section>";
        return finalHtml;
    }

    //build html for single categories page based on the data from the server
    function buildAndShowMenuItemsHTML(categoryMenuItems){
        $ajaxUtils.sendGetRequest(menuItemsTitleHtml,function(menuItemsTitleHtml){
            //retrieving single menu item snippet
            $ajaxUtils.sendGetRequest(menuItemHtml,function(menuItemHtml){
                var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml);
                insertHtml("#main-content",menuItemsViewHtml);
            },false);
        },false);
    }

    function buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml){
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"special_instructions",categoryMenuItems.category.special_instructions);
        var finalHtml = menuItemsTitleHtml;
        finalHtml += "<section class='row'>";
        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for(var i=0;i<menuItems.length;i++){
            var html = menuItemHtml;
            html = insertProperty(html,"short_name",menuItems[i].short_name);
            html = insertProperty(html,"catShortName",catShortName);
            html = insertItemPrice(html,"price_small",menuItems[i].price_small);
            html = insertItemPortionName(
                html,
                "small_portion_name",
                menuItems[i].small_portion_name
              );
            html = insertItemPrice(html,"price_large",menuItems[i].price_large);
            html = insertItemPortionName(
                html,
                "large_portion_name",
                menuItems[i].large_portion_name
              );
            html = insertProperty(html,"name",menuItems[i].name);
            html = insertProperty(html,"description",menuItems[i].description);

            //adding clearfix after every second menu item
            if(i%2!=0){
                html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
            }
            finalHtml += html;
        }
        finalHtml += "</section>";
        return finalHtml;
    }
    
    // if price not specified, replace with a empty string
    function insertItemPrice(html,pricePropName,priceValue){
        if(!priceValue){
            return insertProperty(html,pricePropName,"");
        }
        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html,pricePropName,priceValue);
        return html;
    }
    //appends portion nme in parens if it exists
    function insertItemPortionName(html, portionPropName, portionValue) {
        // If not specified, return original string
        if (!portionValue) {
          return insertProperty(html, portionPropName, "");
        }
    
        portionValue = "(" + portionValue + ")";
        html = insertProperty(html, portionPropName, portionValue);
        return html;
      }

      dc.loadAboutUsSnippet = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(aboutUsSnippet, function(responseText) {
            insertHtml("#main-content", responseText);
        }, false);
        $("#main-content").removeClass('container-fluid');
    };

    dc.loadContactSnippet = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(contactSnippet, function(responseText) {
            insertHtml("#main-content", responseText);
        }, false);
        $("#main-content").removeClass('container-fluid');
    };

    dc.loadSignupSnippet = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(signupSnippet, function(responseText) {
            insertHtml("#main-content", responseText);
        }, false);
        $("#main-content").removeClass('container-fluid');
    };

    dc.loadLoginSnippet = function() {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(loginSnippet, function(responseText) {
            insertHtml("#main-content", responseText);
        }, false);
        $("#main-content").removeClass('container-fluid');
    };
    global.$dc=dc;
})(window);
//About us page 
$(document).ready(function(){
    // Event delegation for #owner, #staff, and #achievements
    $(document).on('click', '#owner', function() {
        $('#owner').css({'text-decoration':'underline'});
        $('#staff').css({'text-decoration':'none'});
        $('#achievements').css({'text-decoration':'none'});
        $('#owner-content').css({'visibility':'visible'});
        $('#staff-content').css({'visibility':'hidden'});
        $('#achievements-content').css({'visibility':'hidden'});
        $('#about-pic-div').css({"background":"url('images/about-owner-min.jpg') center no-repeat"});
        $('#about-pic-div').css({"background-size":"cover"});
    });

    $(document).on('click', '#staff', function() {
        $('#owner').css({'text-decoration':'none'});
        $('#staff').css({'text-decoration':'underline'});
        $('#achievements').css({'text-decoration':'none'});
        $('#staff-content').css({'visibility':'visible'});
        $('#owner-content').css({'visibility':'hidden'});
        $('#achievements-content').css({'visibility':'hidden'});
        $('#about-pic-div').css({"background":"url('images/about-staff-min.jpg') center no-repeat"});
        $('#about-pic-div').css({"background-size":"cover"});
    });

    $(document).on('click', '#achievements', function() {
        $('#owner').css({'text-decoration':'none'});
        $('#staff').css({'text-decoration':'none'});
        $('#achievements').css({'text-decoration':'underline'});
        $('#achievements-content').css({'visibility':'visible'});
        $('#staff-content').css({'visibility':'hidden'});
        $('#owner-content').css({'visibility':'hidden'});
        $('#about-pic-div').css({"background":"url('images/about-achievements-min.jpg') center no-repeat"});
        $('#about-pic-div').css({"background-size":"cover"});
    });

    // ... (Other code)
});
//Removing current active index link
$(document).ready(function(){
    $(document).on('click','#indexlink',function(){
        $('#indexlink').addClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').removeClass('active');
    });
    $(document).on('click','#aboutuslink',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').addClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').removeClass('active');
    });
    $(document).on('click','#contactlink',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').addClass('active');
        $('#signuplink').removeClass('active');
    });
    $(document).on('click','#signuplink',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').addClass('active');
    });
    $(document).on('click','#orderOnline',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').removeClass('active');
    });
    $(document).on('click','#signupfromlogin',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').addClass('active');
    });
    $(document).on('click','#loginfromsignup',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').removeClass('active');
    });
    $(document).on('click','#menuTile',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').removeClass('active');
    });
    $(document).on('click','#specialsTile',function(){
        $('#indexlink').removeClass('active');
        $('#aboutuslink').removeClass('active');
        $('#contactlink').removeClass('active');
        $('#signuplink').removeClass('active');
    });
});
