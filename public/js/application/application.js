/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/google/maps/region",
    "gmwars/game/player",
    "gmwars/states/newPlayerState"
    ], function(map, Region, player, NewPlayerState) {

    // For now, hard-code some plauyer regions
    var regions = [
        {
            topLeft: {lat: 40.69311788, lng: -73.97354}, 
            bottomRight: {lat: 40.68719, lng: -73.96264}
        },
        {
            topLeft: {lat: 40.66311788, lng: -73.96354}, 
            bottomRight: {lat: 40.64719, lng: -73.95264}
        },
        {
            topLeft: {lat: 40.62311788, lng: -73.99354}, 
            bottomRight: {lat: 40.61719, lng: -73.98264}
        },
        {
            topLeft: {lat: 40.63311788, lng: -73.98354}, 
            bottomRight: {lat: 40.61719, lng: -73.96564}
        },
        {
            topLeft: {lat: 40.72311788, lng: -73.99354}, 
            bottomRight: {lat: 40.71719, lng: -73.95264}
        }
    ];

    for (var i = 0; i < regions.length; ++i) {
        new Region({
            map: map,
            topLeft: regions[i].topLeft,
            bottomRight: regions[i].bottomRight
        });
    }
    
    var state = undefined;

    player.then(function(player) {
        if (player.getBuildings().length == 0) {
            // The player doesn't have any buildings. This means they need to place a headquarters.
            state = new NewPlayerState();
        }
    });

    map.on("click", function(event) {
        state.onClickMap(event.position);
    });
});

