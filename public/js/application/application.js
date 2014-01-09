/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/game/player",
    "gmwars/view/playerRegions",
    "gmwars/view/login",
    "gmwars/states/newPlayerState",
    "gmwars/states/existingPlayerState"
    ], function(map, player, playerRegions, login, NewPlayerState, ExistingPlayerState) {


    player.then(function(player) {
        var state = undefined;

        if (player.getBuildings().length == 0) {
            // The player doesn't have any buildings. This means they need to place a headquarters.
            state = new NewPlayerState();
        } else {
            state = new ExistingPlayerState();
        }

        map.on("click", function(event) {
            state.onClickMap(event.position);
        });
    }, function(error) {
        // If an error occurred, display the login screen
        console.log("Error getting player: " + error);
        login.display();
    });
});

