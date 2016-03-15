"use strict";

var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"];
// Scripts here
$(document).ready(function () {
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams?channel=freecodecamp',
    dataType: 'json',
    accepts: 'application/vnd.twitchtv.v3+json',
    success: function success(data) {
      console.log(data);
    }
  });
});