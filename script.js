document.addEventListener('DOMContentLoaded', function() {
    // ==================== Dữ liệu & Storage ====================
    const ADMIN_KEY = 'STORENGUYENLONGIOS';
    let currentUser = null;
    let currentKeyData = null;
    let selectedGame = 'ff';

    function loadKeys() {
        const stored = localStorage.getItem('aimtrick_keys');
        if (stored) return JSON.parse(stored);
        const defaultKeys = [
            { key: 'KEY-VIP001', type: 'vip', expiry: '2026-05-20T23:59:59', devices: 3 },
            { key: 'KEY-NORM001', type: 'normal', expiry: '2026-05-15T23:59:59', devices: 1 },
            { key: 'KEY-HFTOK9981', type: 'vip', expiry: '2026-04-22T11:39:15', devices: 2 }
        ];
        localStorage.setItem('aimtrick_keys', JSON.stringify(defaultKeys));
        return defaultKeys;
    }

    function saveKeys(keys) {
        localStorage.setItem('aimtrick_keys', JSON.stringify(keys));
    }

    let keys = loadKeys();

    // ==================== UI Elements ====================
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const loginBox = document.getElementById('loginBox');
    const activePanel = document.getElementById('activePanel');
    const monitorPanel = document.getElementById('monitorPanel');
    const keyInput = document.getElementById('keyInput');
    const loginBtn = document.getElementById('loginBtn');
    const vipToggles = document.getElementById('vipToggles');
    const basicToggles = document.getElementById('basicToggles');
    const activeKeyDisplay = document.getElementById('activeKeyDisplay');
    const keyExpiryDisplay = document.getElementById('keyExpiryDisplay');
    const keyInfoContent = document.getElementById('keyInfoContent');
    const adminPanel = document.getElementById('adminPanel');
    const keyListContainer = document.getElementById('keyListContainer');
    const createKeyBtn = document.getElementById('createKeyBtn');
    const newKeyString = document.getElementById('newKeyString');
    const newKeyDays = document.getElementById('newKeyDays');
    const newKeyDevices = document.getElementById('newKeyDevices');
    const newKeyType = document.getElementById('newKeyType');
    const monitorLog = document.getElementById('monitorLog');
    const monitorGames = document.querySelectorAll('.monitor-game');
    const gameBtns = document.querySelectorAll('.game-btn');

    // Toggle inputs
    const toggleFixRungTam = document.getElementById('toggleFixRungTam');
    const toggleFixLoDau = document.getElementById('toggleFixLoDau');
    const toggleFixLag = document.getElementById('toggleFixLag');
    const toggleAimLock = document.getElementById('toggleAimLock');
    const toggleBamDau = document.getElementById('toggleBamDau');
    const toggleNheTam = document.getElementById('toggleNheTam');

    // ==================== Hàm tiện ích ====================
    function canUseBasicFeatures() {
        return currentUser && (currentKeyData.type === 'normal' || currentKeyData.type === 'vip' || currentKeyData.type === 'admin');
    }

    function canUseVipFeatures() {
        return currentUser && (currentKeyData.type === 'vip' || currentKeyData.type === 'admin');
    }

    function addLogLine(text) {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const line = document.createElement('div');
        line.className = 'log-line';
        line.innerHTML = `<span class="time">[${timeStr}]</span> ${text}`;
        monitorLog.appendChild(line);
        monitorLog.scrollTop = monitorLog.scrollHeight;
    }

    // ==================== Các hàm CUSTOM (bạn thêm code ở đây) ====================
    function customEnableFixRungTam() {
        // ====== THÊM CODE CỦA BẠN KHI BẬT FIX RUNG TÂM ======
    }

    function customDisableFixRungTam() {
        // ====== THÊM CODE CỦA BẠN KHI TẮT FIX RUNG TÂM ======
    }

    function customEnableFixLoDau() {
        // ====== THÊM CODE CỦA BẠN KHI BẬT FIX LỐ ĐẦU ======
    }

    function customDisableFixLoDau() {
        // ====== THÊM CODE CỦA BẠN KHI TẮT FIX LỐ ĐẦU ======
    }

    function customEnableFixLag() {
        // ====== THÊM CODE CỦA BẠN KHI BẬT FIX LAG ======
    }

    function customDisableFixLag() {
        // ====== THÊM CODE CỦA BẠN KHI TẮT FIX LAG ======
    }

    function customEnableAimLock() {
        // ====== THÊM CODE CỦA BẠN KHI BẬT AIMLOCK ======
    }

    function customDisableAimLock() {
        // ====== THÊM CODE CỦA BẠN KHI TẮT AIMLOCK ======
    }

    function customEnableBamDau() {
        // ====== THÊM CODE CỦA BẠN KHI BẬT BÁM ĐẦU ======
    }

    function customDisableBamDau() {
        // ====== THÊM CODE CỦA BẠN KHI TẮT BÁM ĐẦU ======
    }

    function customEnableNheTam() {
        // ====== THÊM CODE CỦA BẠN KHI BẬT NHẸ TÂM ======
    }

    function customDisableNheTam() {
        // ====== THÊM CODE CỦA BẠN KHI TẮT NHẸ TÂM ======
    }

    // ==================== Hàm bật/tắt từng chức năng (gọi custom) ====================
    function enableFixRungTam() {
        if (!canUseBasicFeatures()) return;
        customEnableFixRungTam();
        addLogLine('Fix Rung Tâm đã bật');
    }

    function disableFixRungTam() {
        customDisableFixRungTam();
        addLogLine('Fix Rung Tâm đã tắt');
    }

    function enableFixLoDau() {
        if (!canUseBasicFeatures()) return;
        customEnableFixLoDau();
        addLogLine('Fix Lố Đầu đã bật');
    }

    function disableFixLoDau() {
        customDisableFixLoDau();
        addLogLine('Fix Lố Đầu đã tắt');
    }

    function enableFixLag() {
        if (!canUseBasicFeatures()) return;
        customEnableFixLag();
        addLogLine('Fix Lag đã bật');
    }

    function disableFixLag() {
        customDisableFixLag();
        addLogLine('Fix Lag đã tắt');
    }

    function enableAimLock() {
        if (!canUseVipFeatures()) return;
        customEnableAimLock();
        addLogLine('AimLock đã bật');
    }

    function disableAimLock() {
        customDisableAimLock();
        addLogLine('AimLock đã tắt');
    }

    function enableBamDau() {
        if (!canUseVipFeatures()) return;
        customEnableBamDau();
        addLogLine('Bám Đầu đã bật');
    }

    function disableBamDau() {
        customDisableBamDau();
        addLogLine('Bám Đầu đã tắt');
    }

    function enableNheTam() {
        if (!canUseVipFeatures()) return;
        customEnableNheTam();
        addLogLine('Nhẹ Tâm đã bật');
    }

    function disableNheTam() {
        customDisableNheTam();
        addLogLine('Nhẹ Tâm đã tắt');
    }

    // ==================== Gắn sự kiện cho toggle ====================
    toggleFixRungTam.addEventListener('change', function() {
        this.checked ? enableFixRungTam() : disableFixRungTam();
    });

    toggleFixLoDau.addEventListener('change', function() {
        this.checked ? enableFixLoDau() : disableFixLoDau();
    });

    toggleFixLag.addEventListener('change', function() {
        this.checked ? enableFixLag() : disableFixLag();
    });

    toggleAimLock.addEventListener('change', function() {
        this.checked ? enableAimLock() : disableAimLock();
    });

    toggleBamDau.addEventListener('change', function() {
        this.checked ? enableBamDau() : disableBamDau();
    });

    toggleNheTam.addEventListener('change', function() {
        this.checked ? enableNheTam() : disableNheTam();
    });

    // ==================== Chuyển tab ====================
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.getAttribute('data-tab');
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            if (tabName === 'keyinfo') updateKeyInfoTab();
            if (tabName === 'admininfo') updateAdminInfoTab();
        });
    });

    // ==================== Chọn game ====================
    function setSelectedGame(game) {
        selectedGame = game;
        gameBtns.forEach(btn => {
            const btnGame = btn.getAttribute('data-game');
            if (btnGame === game) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        monitorGames.forEach(mg => {
            const mgGame = mg.getAttribute('data-game');
            if (mgGame === game) mg.classList.add('active');
            else mg.classList.remove('active');
        });
        const gameName = game === 'ff' ? 'FF THƯỜNG' : 'FF MAX';
        addLogLine(`Đã chọn game: ${gameName}`);
        addLogLine(`--> entering ${gameName}...`);
    }

    gameBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const game = btn.getAttribute('data-game');
            setSelectedGame(game);
        });
    });

    monitorGames.forEach(mg => {
        mg.addEventListener('click', () => {
            const game = mg.getAttribute('data-game');
            setSelectedGame(game);
        });
    });

    // ==================== Đăng nhập ====================
    loginBtn.addEventListener('click', () => {
        const inputKey = keyInput.value.trim();
        if (!inputKey) {
            alert('Vui lòng nhập key');
            return;
        }

        if (inputKey === ADMIN_KEY) {
            currentUser = 'admin';
            currentKeyData = {
                key: ADMIN_KEY,
                type: 'admin',
                expiry: '2099-12-31T23:59:59',
                devices: 999
            };
            loginSuccess();
            return;
        }

        const foundKey = keys.find(k => k.key === inputKey);
        if (!foundKey) {
            alert('Key không hợp lệ hoặc đã bị xóa!');
            return;
        }

        if (new Date(foundKey.expiry) < new Date()) {
            alert('Key đã hết hạn! Vui lòng sử dụng key khác.');
            return;
        }

        currentUser = 'user';
        currentKeyData = foundKey;
        loginSuccess();
    });

    function loginSuccess() {
        loginBox.classList.add('hidden');
        activePanel.classList.remove('hidden');
        monitorPanel.classList.remove('hidden');

        const type = currentKeyData.type;
        activeKeyDisplay.innerHTML = `<strong>Key:</strong> ${currentKeyData.key} (${type === 'vip' ? 'VIP' : type === 'normal' ? 'Thường' : 'Admin'})`;
        const expiryDate = new Date(currentKeyData.expiry);
        keyExpiryDisplay.innerHTML = `<strong>Hết hạn lúc:</strong> ${expiryDate.toLocaleString('vi-VN')} | <strong>Thiết bị tối đa:</strong> ${currentKeyData.devices}`;

        if (type === 'vip' || type === 'admin') {
            basicToggles.style.display = 'flex';
            vipToggles.style.display = 'flex';
        } else if (type === 'normal') {
            basicToggles.style.display = 'flex';
            vipToggles.style.display = 'none';
        }

        // Reset tất cả toggle về OFF
        toggleFixRungTam.checked = false;
        toggleFixLoDau.checked = false;
        toggleFixLag.checked = false;
        toggleAimLock.checked = false;
        toggleBamDau.checked = false;
        toggleNheTam.checked = false;

        if (currentUser === 'admin') {
            adminPanel.classList.remove('hidden');
            renderKeyList();
        } else {
            adminPanel.classList.add('hidden');
        }

        updateKeyInfoTab();
        updateAdminInfoTab();
        addLogLine('Đăng nhập thành công, key: ' + currentKeyData.key);
        const gameName = selectedGame === 'ff' ? 'FF THƯỜNG' : 'FF MAX';
        addLogLine(`Hệ thống vào game: ${gameName}`);
    }

    function updateKeyInfoTab() {
        if (!currentKeyData) {
            keyInfoContent.innerHTML = '<p>Vui lòng đăng nhập để xem thông tin key.</p>';
            return;
        }
        const typeText = currentKeyData.type === 'vip' ? 'VIP' : currentKeyData.type === 'normal' ? 'Thường' : 'Admin';
        keyInfoContent.innerHTML = `
            <p><strong>Key:</strong> ${currentKeyData.key}</p>
            <p><strong>Loại:</strong> ${typeText}</p>
            <p><strong>Ngày hết hạn:</strong> ${new Date(currentKeyData.expiry).toLocaleString('vi-VN')}</p>
            <p><strong>Số thiết bị tối đa:</strong> ${currentKeyData.devices}</p>
            <p><strong>Trạng thái:</strong> ${new Date(currentKeyData.expiry) > new Date() ? 'Còn hiệu lực' : 'Hết hạn'}</p>
        `;
    }

    function updateAdminInfoTab() {
        if (currentUser === 'admin') {
            adminPanel.classList.remove('hidden');
            renderKeyList();
        } else {
            adminPanel.classList.add('hidden');
        }
    }

    // ==================== Admin: Quản lý key ====================
    function renderKeyList() {
        if (currentUser !== 'admin') return;
        keys = loadKeys();
        if (keys.length === 0) {
            keyListContainer.innerHTML = '<p>Chưa có key nào.</p>';
            return;
        }
        let html = '';
        keys.forEach(k => {
            html += `
                <div class="key-item">
                    <span>${k.key} (${k.type}) - Hết hạn: ${new Date(k.expiry).toLocaleDateString('vi-VN')} - TB: ${k.devices}</span>
                    <button onclick="deleteKey('${k.key}')">Xóa</button>
                </div>
            `;
        });
        keyListContainer.innerHTML = html;
    }

    window.deleteKey = function(keyToDelete) {
        if (currentUser !== 'admin') return;
        if (!confirm(`Bạn có chắc muốn xóa key ${keyToDelete}?`)) return;
        keys = keys.filter(k => k.key !== keyToDelete);
        saveKeys(keys);
        renderKeyList();
        addLogLine('Admin deleted key: ' + keyToDelete);
        alert('Đã xóa key!');
    };

    createKeyBtn.addEventListener('click', () => {
        if (currentUser !== 'admin') {
            alert('Bạn không có quyền!');
            return;
        }
        const keyStr = newKeyString.value.trim();
        const days = parseInt(newKeyDays.value) || 7;
        const devices = parseInt(newKeyDevices.value) || 1;
        const type = newKeyType.value;

        if (!keyStr) {
            alert('Vui lòng nhập key!');
            return;
        }
        if (keys.some(k => k.key === keyStr)) {
            alert('Key đã tồn tại!');
            return;
        }

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        const newKey = {
            key: keyStr,
            type: type,
            expiry: expiryDate.toISOString(),
            devices: devices
        };
        keys.push(newKey);
        saveKeys(keys);
        renderKeyList();
        addLogLine(`Admin created key: ${keyStr} (${type}), ${days} days, ${devices} devices`);
        alert('Tạo key thành công!');
        newKeyString.value = '';
        newKeyDays.value = 7;
        newKeyDevices.value = 1;
    });

    // ==================== Hiệu ứng tuyết ====================
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const snowflakeCount = 80;

    function resizeCanvas() {
        const app = document.getElementById('app');
        canvas.width = app.clientWidth;
        canvas.height = app.clientHeight;
    }

    function createSnowflakes() {
        snowflakes = [];
        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 1,
                speedY: Math.random() * 0.5 + 0.2,
                speedX: Math.random() * 0.2 - 0.1,
                opacity: Math.random() * 0.7 + 0.3
            });
        }
    }

    function drawSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let flake of snowflakes) {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.fill();
        }
    }

    function updateSnow() {
        for (let flake of snowflakes) {
            flake.y += flake.speedY;
            flake.x += flake.speedX;
            if (flake.y > canvas.height + flake.radius) {
                flake.y = -flake.radius;
                flake.x = Math.random() * canvas.width;
            }
            if (flake.x > canvas.width + flake.radius) flake.x = -flake.radius;
            if (flake.x < -flake.radius) flake.x = canvas.width + flake.radius;
        }
    }

    function snowLoop() {
        drawSnow();
        updateSnow();
        requestAnimationFrame(snowLoop);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createSnowflakes();
    });

    resizeCanvas();
    createSnowflakes();
    snowLoop();

    // Khởi tạo
    addLogLine('Hệ thống sẵn sàng...');
    setSelectedGame('ff');
});
