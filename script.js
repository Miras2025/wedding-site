// 1. Логика таймера обратного отсчета
const targetDate = new Date("June 25, 2026 18:00:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Математика для перевода миллисекунд в дни, часы, минуты и секунды
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Вывод результата в HTML элементы по их ID
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000); // 1000 миллисекунд = обновление каждую 1 секунду


// 2. Логика кнопки RSVP (Форма ответа)
document.querySelector('.zayotrp').addEventListener('click', function() {
    const guestName = document.getElementById('guestName').value;
    const selectedOption = document.querySelector('input[name="zhauap"]:checked');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxLLOVRsCU6cnOWqkY4jpb4gVJLvV_uY9LTMkykQ4RWZEPL_YneYRIIfW0ojzZz_l_9rA/exec'; // Google Web App URL

    if (!guestName) {
        alert("Өтініш, есіміңізді жазыңыз.");
        return;
    }

    if (!selectedOption) {
        alert("Өтініш, бір нұсқаны таңдаңыз.");
        return;
    }

    const answer = selectedOption.value;
    const eventType = "🔔 Үйлену тойы"; // Кестеде жаңа бет ашылады
    const message = `🔔 Жаңа қонақ!\n👤 Есімі: ${guestName}\n💬 Жауабы: ${answer}\n\n 📅 Жіберілген уақыты: ${new Date().toLocaleString('kk-KZ')}`;

    // Сіздің ботыңыздың мәліметтері
    const token = '8668030843:AAHj08Tesh2W1gajMqHYNt8GeLv9sNu3rEU'; 
    const chatId = '663718699';
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => {
            if(response.ok) {
                alert("Рақмет! Сіздің жауабыңыз қабылданды.");
                document.getElementById('guestName').value = ''; // Жолақты тазарту
            } else {
                alert("Қате кетті, қайта көріңіз.");
            }
        })
        .catch(error => {
            alert("Қате кетті. Интернет байланысын тексеріңіз.");
        });

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: guestName, answer: answer, event_type: eventType })
    })
    .then(() => {
        document.getElementById('guestName').value = '';
    })
    .catch(error => console.error('Қате!', error.message));
});

// 3. Музыканы басқару
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

// Музыканы қосу функциясы (код қайталанбауы үшін)
function playMusic() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            musicBtn.innerHTML = '⏸️ Әуенді өшіру';
            isPlaying = true;
        }).catch(error => {
            console.log("Автоматты түрде қосуға браузер рұқсат бермеді:", error);
        });
    }
}

// Музыканы өшіру функциясы
function pauseMusic() {
    bgMusic.pause();
    musicBtn.innerHTML = '🎵 Әуенді қосу';
    isPlaying = false;
}

// 1. Батырманы басқандағы оқиға
musicBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Window-дағы кликпен қақтығыспауы үшін
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// 2. Сайттың кез келген жерін бірінші рет басқанда музыканы қосу
window.addEventListener('click', function() {
    playMusic();
}, { once: true }); // Тек бір рет қана істейді

// 3. Экранды айналдырғанда (scroll) қосылсын десеңіз (кейбір браузерлер үшін пайдалы)
window.addEventListener('scroll', function() {
    playMusic();
}, { once: true });
