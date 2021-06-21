//CUSTOMIZATION
let minPeopleEach = 1;
let maxPeopleEach = 4;
//CORE VARIABLES (IMPORTANT)
let track1;
let track2;


//A function where we randomize the amount of people on the tracks
function getRandomPeople() {
  track1 = Math.floor(getRandomNumber(minPeopleEach,maxPeopleEach))
  track2 = Math.floor(getRandomNumber(minPeopleEach,maxPeopleEach))
}


//A function where we check which track to save.
function getTrackToSave() {
  if (track1 > track2) {
    return 1;
  } else if (track1 < track2) {
    return 2;
  } else {
    return 0; //when all else fails (i.e. error or tracks 1 and 2 are both equal)
  }
}

function runTrolleyProblem() {
  getRandomPeople(); 
  let trackToSave = getTrackToSave(); //Save a variable storing our track to save. Keep in mind that 0 is both, 1 and 2 are their coresponding tracks.
  //Output our answer, with a little bit of logic.
  if (trackToSave > 0) {
    console.log(`Track 1 has ${track1} people, while track 2 has ${track2} people. Prefer to save track ${trackToSave}.`)
  } else {
    console.log(`Track 1 has ${track1} people, while track 2 has ${track2} people. Both tracks are equal so it doesn't really matter which one you save, with little exception.`)
  }
}

//Now we run it, by simply doing...

runTrolleyProblem();
