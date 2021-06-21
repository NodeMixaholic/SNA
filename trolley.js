let track1;
let track2;
function getRandomPeople() {
  track1 = getRandomNumber(1,4)
  track2 = getRandomNumber(1,4)
}

function getTrackToSave() {
  if (track1 > track2) {
    return 1;
  } else if (track1 < track2) {
    return 2;
  } else {
    return Math.floor(getRandomNumber(1,2)) //when all else fails (i.e. error or tracks 1 and 2 are both equal)
  }
}

console.log(`Save track ${getTrackToSave()}`)
