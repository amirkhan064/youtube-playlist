
/**
    * Put your video IDs in this array
 */
let videoIDs = [
    'nAowcCbWhqg?start=30?end=35',
    'G8wxsGl-rMA?start=null?end=null',
    'bneA0_Sy8PI?start=35?end=45',
    'aDSNq0EWqjE?start=1?end=30',
    '4iLVoEg9aLk?start=35?end=45',
    't7zPzzCz8mM?start=1?end=30',
    'I-sY9qupsT0?start=null?end=null',
    'n2geLsxDtak?start=10?end=30',
];

/**
    * Declare All Var
*/
let videoListId = document.getElementById('videosList');
let playerId = document.getElementById('player');
const videoHeight = '770';
const videoWidth = '100%';
let player, currentVideoId = 0;

/**
    * call setThumbnailOfTheVideos method to set the Images thumbnails
*/
setThumbnailOfTheVideos();

/**
    * onYouTubeIframeAPIReady will get called when iframe is ready to load the video
*/
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: videoHeight,
        width: videoWidth,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

/**
    * onPlayerReady get called Once player is ready to play the initial video
*/
function onPlayerReady(event) {
    const videoObj = getCurrentVideoStartAndEndTime(videoIDs[currentVideoId])
    event.target.loadVideoById(videoObj);
}

/**
    * onPlayerStateChange get called when any state change happened of the video like pause/ply/end etc.
*/
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        const videoObj = getCurrentVideoStartAndEndTime(videoIDs[currentVideoId])
        currentVideoId++;
        if (currentVideoId < videoIDs.length) {
            player.loadVideoById(videoObj);
        }

    }
}

/**
    * getCurrentVideoStartAndEndTime is a utility method to massage the url and retrieve the needed data..
*/
function getCurrentVideoStartAndEndTime(videoURL) {
    const videoSplitArr = videoURL && videoURL.split('?');
    const videoStartTime = (videoSplitArr && videoSplitArr.length >= 2) ? videoSplitArr[1].split('=')[1] : '';
    const videoEndTime = (videoSplitArr && videoSplitArr.length >= 3) ? videoSplitArr[2].split('=')[1] : '';
    const videoId = (videoURL && videoURL.length) && videoURL.split('?')[0];
    return {
        videoId: videoId,
        startSeconds: videoStartTime,
        endSeconds: videoEndTime
    };
}

function setThumbnailOfTheVideos() {
    for (let i = 0; i < videoIDs.length; i++) {
        const videoInfo = getCurrentVideoStartAndEndTime(videoIDs[i]);
        videoListId.innerHTML +=
            `<li> <img src="https://img.youtube.com/vi/${videoInfo.videoId}/1.jpg" /> </li>`
    }
}