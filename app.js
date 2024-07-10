document.addEventListener('DOMContentLoaded', (event) => {
    const btn = document.querySelector('.talk');
    const content = document.querySelector('.content');

    const speak = (text) => {
        const text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.volume = 1;
        text_speak.pitch = 1;
        window.speechSynthesis.speak(text_speak);
    }

    const wishMe = () => {
        const day = new Date();
        const hour = day.getHours();
        if (hour >= 0 && hour < 12) {
            speak("Good Morning Master...");
        } else if (hour >= 12 && hour < 17) {
            speak("Good Afternoon Master...");
        } else {
            speak("Good Evening Master...");
        }
    }

    window.addEventListener('load', () => {
        speak("Initializing CAPTAIN...");
        wishMe();
    });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.error("Speech Recognition API is not supported in this browser.");
        content.textContent = "Speech Recognition API is not supported in this browser.";
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener('click', () => {
        content.textContent = "Listening...";
        recognition.start();
    });

    const takeCommand = (message) => {
        if (message.includes('hey') || message.includes('hello')) {
            speak("Hello Sir, How May I Help You?");
        } else if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening Youtube...");
        }else if (message.includes("who are you")) {
            speak("I am a virtual A I assistant . What do you want?");
        } else if (message.includes("who made you")) {
            speak("Made by Kumar Aditya. He is a B.Tech engineer working on new trends of Artificial intelligence and machine learning");
        }
        else if (message.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            speak("This is what I found on the internet regarding " + message);
        } else if (message.includes('wikipedia')) {
            window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
            speak("This is what I found on Wikipedia regarding " + message);
        } else if (message.includes('time')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            speak("The current time is " + time);
        } else if (message.includes('date')) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            speak("Today's date is " + date);
        } else if (message.includes('calculator')) {
            window.open('Calculator:///');
            speak("Opening Calculator");
        } else {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            speak("I found some information for " + message + " on Google");
        }
    }
});
