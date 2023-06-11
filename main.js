

var prediction1=""
var prediction2=""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera= document.getElementById("camera");
webcam.attach("#camera");

function snap(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image"src = " '+data_uri+'"/>';
})
}
  
console.log('ml5 version:', ml5.version);

classifier = mls.imageClassifier('https://teachablemachine.withgoogle.com/models/7KaBlKIfF/model.json',modelLoaded)

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="The first prediction is  "+prediction1;
    speak_data_2="The second prediction is  "+prediction2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
        synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if (error){
        console.error(error);
    } else{
        console.log(result);
        document.getElementById("emotion_name").innerHTML=result[0].label
        document.getElementById("emotion1_name").innerHTML=result[1].label
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(result[0].label=="peace"){
            document.getElementById("emoji_name").innerHTML= "&#128512;"
        }
        if(result[0].label=="ok"){
            document.getElementById("emoji_name").innerHTML= "&#128549;"
        }
        if(result[0].label=="no"){
            document.getElementById("emoji_name").innerHTML= "&#x1F621;"
        
        }
        if(result[1].label=="peace "){
            document.getElementById("emoji2_name").innerHTML= "&#128512;"
        }
        if(result[1].label=="ok"){
            document.getElementById("emoji2_name").innerHTML= "&#128549;"
        }
        if(result[1].label=="no"){
            document.getElementById("emoji2_name").innerHTML= "&#x1F621;"
        
        }
    }
}

