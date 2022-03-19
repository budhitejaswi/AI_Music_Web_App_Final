song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_1_status = "";
scoreRightWrist = 0;
song_2_status = "";


function preload(){
    song_1 = loadSound("song_1.mp3");
    song_2 = loadSound("song_2.mp3");
}

function setup() {
    canvas=createCanvas(700,500);
    canvas.position(340,270);
    video= createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0,0,700,500);

    fill("#ff0000");
    stroke("#ff0000");

    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();

    if (scoreLeftWrist >0.2)
    {
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if (song_1_status == false)
        {
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song Name : What Doesn't Kill You Makes You Stronger - Kelly Clarkson";
        }
    }

    if (scoreRightWrist >0.2)
    {
        circle(rightWristX,rightWristY,20);
        song_1.stop();
        if (song_2_status == false)
        {
            song_2.play();
            document.getElementById("song_name").innerHTML = "Song Name : Warrior - Demi Lovato";
        }
    }
}

function modelLoaded() {
    console.log("Model Is Loaded :)")
}

function gotPoses(results) {
    if (results.length > 0){
        console.log(results);

        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist " + scoreLeftWrist);

        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "   Left Wrist Y = "+ leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "   Right Wrist Y = "+ rightWristY);
     }
}