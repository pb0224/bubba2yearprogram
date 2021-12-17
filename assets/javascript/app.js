$(document).ready(function () {
    /**
    * pulls information from the form and build the query URL
    * @returns {string} URL for ZOMATO API based on form inputs
    */
    function getQueryURL() {
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=";
        //"https://developers.zomato.com/api/v2.1/search";
        var querySearch = $("#search-term").val().trim();
        var user_key = "b62b830baae8f96987ca00269a09c856";
        console.log("URL :" + queryURL);
        console.log(queryURL + querySearch + "&user-key=" + user_key);
        return queryURL + querySearch + "&user-key=" + user_key + "&count=20";
    }

    function updatePage(data) {
        console.log(data);
        var restaurant = data.restaurants;
        console.log(restaurant);
        for (var i = 0; i < restaurant.length; i++) {
            var restaurantInfo = restaurant[i].restaurant;
            var restoName = $('<a class="list-group-item list-group-item-action list-group-item-success" id="list-restaurant' + i + '-list" data-toggle="tab" href="#list-restaurant' + i + '" role="tab" aria-controls="restaurant"> </a>').text(restaurantInfo.name);
            var restoContent = $('<p class="tab-pane fade show" id="list-restaurant' + i + '" role="tabpanel" aria-labelledby="list-restoContent-list"> </p>').text("Address: " + restaurantInfo.location.address);
            var restoWebsite = $('<a class="tab-pane fade show" id="list-restaurant' + i + '" role="tabpanel" aria-labelledby="list-restoContent-list"> </a>').text("Website: " + restaurantInfo.url);
            var restoCuisine = $('<p class="tab-pane fade show" id="list-restaurant' + i + '" role="tabpanel" aria-labelledby="list-restoContent-list"> </p>').text("Cuisines: " + restaurantInfo.cuisines);
            restoName.appendTo("#list-tab");
            restoContent.appendTo("#nav-tabContent");
            restoWebsite.appendTo(restoContent);
            restoCuisine.appendTo(restoWebsite);
        }
        //activate Tab on click
        $('#list-tab a').on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

    };

    function clear() {
        $("#list-tab").empty();
        $("#list-restoContent").empty();
    }

    $("#searchButton").on("click", function () {
        event.preventDefault();
        clear();
        var queryURL = getQueryURL();

        $.ajax({
            type: "GET",
            url: queryURL,
            data: { "user-key": "b62b830baae8f96987ca00269a09c856" },
            dataType: "json",
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('user-key', 'b62b830baae8f96987ca00269a09c856');
            }
        }).then(data => updatePage(data));
    });



    $("#clear-all").on("click", clear);
});
