/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/game/player",
    "gmwars/view/playerRegions",
    "gmwars/states/newPlayerState",
    "gmwars/states/existingPlayerState"
    ], function(map, player, playerRegions, NewPlayerState, ExistingPlayerState) {

    var state = undefined;

    player.then(function(player) {
        if (player.getBuildings().length == 0) {
            // The player doesn't have any buildings. This means they need to place a headquarters.
            state = new NewPlayerState();
        } else {
            state = new ExistingPlayerState();
        }
    });

    map.on("click", function(event) {
        state.onClickMap(event.position);
    });
});

