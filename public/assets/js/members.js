/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.member-name').text(data.username);
    // console.log(data);
    const userid = data.id;
    // console.log(userid, 'user id');
    sessionStorage.setItem('id', JSON.stringify(userid));
    // cass the game schedule and passes user ID ID
    // eslint-disable-next-line no-use-before-define
    callGameSchedule(userid);
  });
  $(document).on('click', '.delete-button', (event) => {
    $.get('/api/user_data').then((data) => {
      $('.member-name').text(data.username);
      console.log(data);
      const UserId = data.id;
      const GameId = event.target.id;
      console.log(GameId);
      // console.log(userid, 'user id');
      // sessionStorage.setItem('id', JSON.stringify(userid));
      // cass the game schedule and passes user ID ID
      // eslint-disable-next-line no-use-before-define
      callGameSchedule(UserId);
      console.log(UserId);
      // const id = $(this).data('id');
      axios.put('/api/remove_game_user/:id', {
        UserId,
        GameId
      })
        .then((response) => {
          console.log(response);
          console.log('calling call game scehdule after delete');
          // eslint-disable-next-line no-use-before-define
          callGameSchedule(UserId);
        }).catch((err) => {
          console.log(err);
        });
    });
  });
  $(document).on('click', '#submit-new-game', () => {
    // console.log(user.userid);
    // console.log('this is being called');
    $.get('/api/user_data').then((data) => {
      $('.member-name').text(data.username);
      const userid = data.id;
      // eslint-disable-next-line no-use-before-define
      callGameSchedule(userid);
    });
  });
  const callGameSchedule = (userid) => {
    // console.log('callGameScheduleCalled');
    // const $table = $('#schedule-table tbody');
    // $table.empty();
    // console.log(userid, 'inside pass game schedule');
    axios.get(`/api/user_schedule/${userid}`).then((schedule) => {
      // code goes here
      const $table = $('#schedule-table tbody');
      $table.empty();
      // console.log(schedule);
      // console.log(schedule.data);


      schedule.data.Games.forEach((game) => {
        // eslint-disable-next-line no-use-before-define
        const checkGameStatus = checkMinRequiredPlayers(
          game.GameType.minPlayers,
          game.GameType.maxPlayers,
          game.GameType.neededToPlay,
          game.numOfPlayersSignedUp
        );
        let gameStatIcon;
        if (checkGameStatus === true) {
          gameStatIcon = 'check_box';
          gameStatIconColor = 'green';
        } else {
          gameStatIcon = 'hourglass_empty';
          gameStatIconColor = 'yellow accent-4';
        }
        // console.log(checkGameStatus);
        // const $table = $('#schedule-table tbody');
        // const $rowCardTable = $('#rowCardAppend');
        const gameDate = game.date;
        const day = dateFns.format(gameDate, 'dddd');
        // console.log(day);
        const time = dateFns.format(gameDate, 'h:mm a');
        // console.log(time);
        // console.log(day);
        // gameDate = moment().format('dddd, h:mm');
        // console.log(gameDay);
        // console.log(gameDate, ' game date **********')
        let imageCardPath = './assets/images/';
        // console.log(game.id);
        imageCardPath = `${imageCardPath}${game.GameType.gameTypesName}.jpg`;
        $table.append(`<tr>
        <td><div class = "container containerimg"><div class="centered"><img src="${imageCardPath}" id="tablePic"><span>${game.GameType.gameTypesName}</span></div></td>
        <td>${day}</td>
        <td>${time}</td>
        <td>${game.Location.title}</td>
        <td>${game.GameType.minPlayers}</td>
        <td><a class="btn waves-effect waves-light ${gameStatIconColor} id="iconColor""><i class="material-icons id="iconColor">${gameStatIcon}</i></a></td>
        <td><button data-id="${game.id}"<a class="btn waves-effect waves-light red darken-4 delete-button"><i class="material-icons" id="${game.id}">delete</i></a></td>
      </tr>`);
      });
    }).catch((err) => {
      console.log(err);
    });
    $('#dropit').on('click', () => {
      callGameSchedule(userid);
    });
  };
});

/* eslint-disable eol-last */
/* eslint-disable no-undef */
// const mapDiv = $('#map');
// const SearchBtn = $('#searchBtn');

// const portsmouth = {
//   lat: 43.071568,
//   lng: -70.762245,
//   name: 'Portsmouth Park',
// };
// const allLocations = [portsmouth];

// function initMap() {
//   const newHampshire = {
//     lat: 44.0,
//     lng: -71.5,
//   };
//   const map = new google.maps.Map(document.getElementById('map'), {
//     center: newHampshire,
//     zoom: 4,
//   });

//   allLocations.forEach((location) => {
//     // eslint-disable-next-line no-unused-vars
//     const marker = new google.maps.Marker({
//       position: {
//         lat: location.lat,
//         lng: location.lng,
//       },
//       map,
//       title: location.name,
//     });
//     // will call marker when we establish what we want to show
//   });
// }
// Handles the dropdown logic
// $(document).ready(() => {
//   $('select').formSelect();
// });


$('.collapsible').collapsible();
$('.dropdown-trigger').dropdown();
$('select').formSelect();
$('.findGame').one('click', () => {
  // eslint-disable-next-line no-use-before-define
  searchAllGames();
});
// SearchBtn.on('click', () => {
//   initMap();
//   mapDiv.removeClass('.hideMap');
// });


$(document).on('click', '.join-class', (event) => {
  $.get('/api/user_data').then((data) => {
    $('.member-name').text(data.username);
    // console.log(data);
    const UserId = data.id;
    // console.log(UserId);
    const GameId = event.target.id;
    // console.log(GameId);
    $.post('/api/user_schedule/:id', {
      UserId,
      GameId,
    }).then((res) => {
      console.log(res);
      window.location.replace('/members');
    }).catch((err) => {
      console.log(err);
    });
  });
  // window.location.reload();
});


const searchAllGames = () => {
  axios.get('/api/games').then((games) => {
    console.log(games);
    console.log(games.data);

    // const weekDay = dateFns.format(new Date('7/14/2020'), 'Do dddd');
    // console.log(weekDay);
    games.data.forEach((game) => {
      // console.log(game);

      // eslint-disable-next-line no-use-before-define
      const checkGameStatus = checkMinRequiredPlayers(
        game.GameType.minPlayers,
        game.GameType.maxPlayers,
        game.GameType.neededToPlay,
        game.numOfPlayersSignedUp
      );
      let gameStatIcon;
      if (checkGameStatus === true) {
        gameStatIcon = 'check_box';
        gameStatIconColor = 'green';
      } else {
        gameStatIcon = 'hourglass_empty';
        gameStatIconColor = 'yellow accent-4';
      }
      // console.log(checkGameStatus);
      const $table = $('#find-schedule-table');
      let imageCardPath = './assets/images/';
      const gameDate = game.date;
      const day = dateFns.format(gameDate, 'dddd');
      // console.log(day);
      const time = dateFns.format(gameDate, 'h:mm a');
      // console.log(time);
      imageCardPath = `${imageCardPath}${game.GameType.gameTypesName}.jpg`;
      $table.append(`<tr>
      <td><div class = "container containerimg"><div class="centered"><img src="${imageCardPath}" id="tablePic"><span>${game.GameType.gameTypesName}</span></div></td>
      <td>${day}</td>
      <td>${time}</td>
      <td>${game.Location.title}</td>
      <td>${game.GameType.minPlayers}</td>
      <td><a class="btn waves-effect waves-light ${gameStatIconColor} id="iconColor""><i class="material-icons id="iconColor">${gameStatIcon}</i></a></td>
      <td><a class="btn waves-effect waves-light green join-class" id="${game.id}"><i class="material-icons" id="${game.id}">add</i></a></td>
    </tr>`);
    });
  }).catch((err) => {
    console.log(err);
  });
};

// get all the games
// eslint-disable-next-line no-undef

// Checks if the minium number of players is met
const checkMinRequiredPlayers = (
  minPlayers,
  maxPlayers,
  boolean,
  numOfPlayerSignedUp
) => {
  let gameOn;
  if (boolean === true && numOfPlayerSignedUp === maxPlayers) {
    gameOn = true;
  } else if (boolean === false && numOfPlayerSignedUp === minPlayers) {
    gameOn = true;
  } else {
    gameOn = false;
  }
  return gameOn;
};