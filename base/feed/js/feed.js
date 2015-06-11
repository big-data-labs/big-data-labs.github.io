

$.ajax({
    url: "../feed/json/buildings.json",
    // url: "http://georgiafacts.org/smart/api/itemfeed?dynamic=1&tid=16400&callback=?&tid=16400",
    // jsonp: "callback",
    // Tell jQuery we're expecting JSONP
    // dataType: "jsonp",
    // Work with the response
    success: function( data ) {
        console.log( data ); // server response
        var items = data.items;
        var images = [];
        var feeds = [];
        
        for(item in items) {
            
            var feed = {};
            feed["heading"] = items[item].title;
            feed["thumbnail"] = "";
            feed["alt"] = "";
            
            if(_.isArray(items[item].images)) {
                for(image in items[item].images) {
                    
                    var lat=_.isNull(items[item].venue) ? "" : _.isNull(items[item].venue.latitude) ? "" : items[item].venue.latitude,
                        lan=_.isNull(items[item].venue) ? "" : _.isNull(items[item].venue.longitude) ? "" : items[item].venue.longitude;
                    
                    images.push('<div class="wrapper"><img data-lazy="' + items[item].images[image].large + '"/><div class="more-info-overlay"><h3 class="margin-5px">' + items[item].images[image].title + ' <a href="#" class="fmap" data-lat="' + lat +'" data-lan="' + lan +'"> <span class="label label-primary">Map</span></a></h3></div>');
                    feed["thumbnail"] = _.isUndefined(items[item].images[image].thumbnail) ? "" : items[item].images[image].thumbnail;
                    feed["alt"] = items[item].images[image].title;
                }
            }
            
            feeds.push('<div class="media"><div class="media-left media-middle"><a href="#"><img class="media-object" src="' + feed["thumbnail"] +'" alt="' + feed["alt"] +'"></a></div><div class="media-body"><h4 class="media-heading">' + feed["heading"] +'</h4></div></div>');
        }
        // feeds.push('</div>');
        $("#imgGallery").html(images).slick({
          lazyLoad: 'ondemand',
          slidesToShow: 1,
          slidesToScroll: 1
          // vertical:1,
          // verticalSwiping:1
        });
        
        $(".feedlist").append(feeds);
    }
});

$("body").on("click", ".fmap", function() {
    alert("map - lat:" + $(this).data("lat") + ", lan:" + $(this).data("lan"));
});