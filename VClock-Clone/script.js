// 1. إعداد المتغيرات العالمية
let timerInterval;
let timeLeft;
let targetAlarm = null;

// مصفوفة روابط الخلفيات (يمكنك إضافة روابطك الخاصة هنا)
const backgrounds = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', 
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', 
    'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07'
];

// 2. دالة تشغيل الساعة والخلفية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل الساعة وتحديثها كل ثانية
    setInterval(updateClock, 1000);
    updateClock();

    // تشغيل الخلفية الأولى
    changeBackground();
});

// 3. دالة تغيير الخلفية (التي كانت مفقودة)
function changeBackground() {
    const randomImg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('${randomImg}?auto=format&fit=crop&w=1920&q=80')`;
}

// 4. منطق الساعة الرقمية والتحقق من المنبه
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockDisplay = document.getElementById('digital-clock');
    if (clockDisplay) {
        // تأثير النقطتين الوامضتين
        const separator = (now.getSeconds() % 2 === 0) ? ":" : " ";
        clockDisplay.textContent = `${hours}${separator}${minutes}${separator}${seconds}`;
    }
    
    checkAlarm(hours, minutes);
}

// 5. التنقل بين الأقسام (الساعة، المنبه، المؤقت)
function showSection(type) {
    const sections = ['clock-section', 'alarm-section', 'timer-section'];
    const buttons = ['btn-clock', 'btn-alarm', 'btn-timer'];

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === `${type}-section`) ? 'block' : 'none';
    });

    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle('active', id === `btn-${type}`);
    });
}

// 6. منطق المنبه
function setAlarm() {
    targetAlarm = document.getElementById('alarm-time').value;
    if (targetAlarm) {
        document.getElementById('alarm-status').innerText = `🔔 تم ضبط المنبه: ${targetAlarm}`;
    }
}

function checkAlarm(h, m) {
    if (targetAlarm === `${h}:${m}`) {
        playAlarmNotification();
        targetAlarm = null; 
        document.getElementById('alarm-status').innerText = "";
    }
}

// 7. منطق المؤقت (Timer)
function startTimer() {
    const mins = parseInt(document.getElementById('timer-min').value) || 0;
    const secs = parseInt(document.getElementById('timer-sec').value) || 0;
    
    if (mins === 0 && secs === 0) return;

    timeLeft = (mins * 60) + secs;
    
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        playAlarmNotification();
        return;
    }

    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;

    document.getElementById('timer-display').textContent = 
        `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').textContent = "00:00:00";
}

// 8. تشغيل الصوت والتنبيه
function playAlarmNotification() {
    const sound = document.getElementById('alarm-sound');
    if (sound) {
        sound.play().catch(() => console.log("يرجى النقر على الصفحة لتفعيل الصوت"));
    }
    alert("انتهى الوقت!");
}