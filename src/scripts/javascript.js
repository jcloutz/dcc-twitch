"use strict";

var channels = ["streamerhouse", "captainsparklez", "roosterteeth", "kennys", "joinDOTARed", "syndicate", "riotgames", "comster404", "terakilobyte", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"];
var template;
var channelData = [];

var operations = 0;
var completed = 0;

// Scripts here
$(document).ready(function () {
  template = Handlebars.compile($('#channel-template').html());
  var $content = $('#content');
  // disable link clicks
  $('.nav__btn').click(function(e) {
    e.preventDefault();
  });

  // show online
  $('#show_online').click(function(e) {
    $content.attr('class', 'online');
  });

  // show offline
  $('#show_offline').click(function(e) {
    $content.attr('class', 'offline');
  });

  // show all
  $('#show_all').click(function(e) {
    $content.attr('class', '');
  });

  channels.forEach(function (channel) {
    operations++;
    $.ajax({
      url: 'https://api.twitch.tv/kraken/streams/' + channel,
      dataType: 'json',
      accepts: 'application/vnd.twitchtv.v3+json',
      success: function success(streamData, status) {
        operations++;
        completed++;
        done();
        $.ajax({
          url: 'https://api.twitch.tv/kraken/channels/' + channel,
          dataType: 'json',
          accepts: 'application/vnd.twitchtv.v3+json',
          success: function success(data) {
            completed++;
            data.stream = streamData;
            channelData.push(data);
            done();
          }
        });
      },
      error: function(xhr, status, err) {
        completed++;
        console.log(status, err);
        // create object to pass to array to allow for proper rendering.
        channelData.push({
          display_name: channel,
          url: '#',
          status: 'Channel has either been deleted or never existed.',
          views: 0,
          followers: 0,
          stream: {stream: null},
        })
        done();
      }
    });
  });
});

function done() {
  if (completed == operations) {
    channelData.sort(function (a, b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    renderChannels()
  }
}

function renderChannels() {
  var content = $('#content');
  var time = 0;
  channelData.forEach(function(stream) {
    time += 100;
    setTimeout(function() {
      content.append(template(stream));
    }, time);
  });
}

