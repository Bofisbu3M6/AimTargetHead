document.addEventListener('DOMContentLoaded', function() {
    // ==================== KEY ADMIN ====================
    const ADMIN_KEY = 'STORENGUYENLONGIOS';
    let currentUser = null;       // 'admin' | 'user'
    let currentKeyData = null;    // object key hiện tại

    // ==================== STORAGE ====================
    function loadKeys() {
        const stored = localStorage.getItem('aimtrick_keys');
        if (stored) return JSON.parse(stored);
        // Mặc định tạo sẵn vài key mẫu
        const defaultKeys = [
            { key: 'KEY-HFTOK9981', type: 'vip', expiry: '2026-04-22T11:39:15', devices: 2 },
            { key: 'KEY-VIP001', type: 'vip', expiry: '2026-05-20T23:59:59', devices: 3 },
            { key: 'KEY-NORM001', type: 'normal', expiry: '2026-05-15T23:59:59', devices: 1 }
        ];
        localStorage.setItem('aimtrick_keys', JSON.stringify(defaultKeys));
        return defaultKeys;
    }

    function saveKeys(arr) {
        localStorage.setItem('aimtrick_keys', JSON.stringify(arr));
    }

    let keys = loadKeys();

    // ==================== UI ELEMENTS ====================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuDropdown = document.getElementById('menuDropdown');
    const menuItems = document.querySelectorAll('.menu-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    const loginBox = document.getElementById('loginBox');
    const homeContent = document.getElementById('homeContent');
    const activePanel = document.getElementById('activePanel');
    const monitorPanel = document.getElementById('monitorPanel');
    const keyInput = document.getElementById('keyInput');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const displayKey = document.getElementById('displayKey');
    const expiryCountdown = document.getElementById('expiryCountdown');
    const expiryDateDisplay = document.getElementById('expiryDateDisplay');
    const keyExpiryMini = document.getElementById('keyExpiryMini');

    // Toggle cơ bản
    const toggleFixRungTam = document.getElementById('toggleFixRungTam');
    const toggleFixLoDau = document.getElementById('toggleFixLoDau');
    const toggleFixLag = document.getElementById('toggleFixLag');

    // Toggle VIP
    const toggleBamDau = document.getElementById('toggleBamDau');
    const toggleAimLock = document.getElementById('toggleAimLock');
    const toggleSensiLock = document.getElementById('toggleSensiLock');
    const toggleNheTam = document.getElementById('toggleNheTam');
    const toggleTangTocMang = document.getElementById('toggleTangTocMang');
    const vipToggles = document.getElementById('vipToggles');

    // Admin
    const adminPanel = document.getElementById('adminPanel');
    const keyListContainer = document.getElementById('keyListContainer');
    const createKeyBtn = document.getElementById('createKeyBtn');
    const newKeyString = document.getElementById('newKeyString');
    const newKeyDays = document.getElementById('newKeyDays');
    const newKeyDevices = document.getElementById('newKeyDevices');
    const newKeyType = document.getElementById('newKeyType');

    // Monitor
    const monitorLog = document.getElementById('monitorLog');
    const monitorGames = document.querySelectorAll('.monitor-game');

    // ==================== HELPER FUNCTIONS ====================
    function canUseBasic() {
        return currentUser && (currentKeyData.type === 'normal' || currentKeyData.type === 'vip' || currentKeyData.type === 'admin');
    }

    function canUseVip() {
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

    function updateCountdownUI() {
        if (!currentKeyData) return;
        const expiry = new Date(currentKeyData.expiry);
        const now = new Date();
        const diff = expiry - now;
        if (diff <= 0) {
            expiryCountdown.textContent = 'Hết hạn';
            keyExpiryMini.textContent = 'Key đã hết hạn';
            return;
        }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        const text = `${d} ngày ${h} giờ ${m} phút ${s} giây`;
        expiryCountdown.textContent = text;
        keyExpiryMini.textContent = 'Key còn hiệu lực: ' + text;
    }

    // ==================== CUSTOM FUNCTIONS (THÊM CODE CỦA BẠN) ====================
    function fixRungTamCustom(isEnabled) {
        // ====== THÊM CODE FIX RUNG TÂM ======
        if (isEnabled) { } else { }
    }
    function fixLoDauCustom(isEnabled) {
        // ====== THÊM CODE FIX LỐ ĐẦU ======
        if (isEnabled) { } else { }
    }
    function fixLagCustom(isEnabled) {
        // ====== THÊM CODE FIX LAG ======
        if (isEnabled) { } else { }
    }
    function bamDauCustom(isEnabled) {
        // ====== THÊM CODE BÁM ĐẦU ======
        if (isEnabled) { } else { }
    }
    function aimLockCustom(isEnabled) {
        // ====== THÊM CODE AIMLOCK ======
        if (isEnabled) { } else { }
    }
    function sensiLockCustom(isEnabled) {
        // ====== THÊM CODE SENSILOCK ======
        if (isEnabled) { } else { }
    }
    function nheTamCustom(isEnabled) {
        // ====== THÊM CODE NHẸ TÂM ======
        if (isEnabled) { } else { }
    }
    function tangTocMangCustom(isEnabled) {
        // ====== THÊM CODE TĂNG TỐC ĐỘ MẠNG ======
        if (isEnabled) { } else { }
    }

    // ==================== XỬ LÝ TOGGLE (CÓ HIỆU ỨNG) ====================
    function setupToggle(toggle, customFn, requireBasic = true, requireVip = false) {
        toggle.addEventListener('change', function() {
            const checked = this.checked;
            if (requireBasic && !canUseBasic()) { this.checked = false; return; }
            if (requireVip && !canUseVip()) { this.checked = false; return; }

            // Thêm / xóa class enabled cho phần tử cha .toggle-item
            const parentItem = this.closest('.toggle-item');
            if (parentItem) {
                if (checked) {
                    parentItem.classList.add('enabled');
                } else {
                    parentItem.classList.remove('enabled');
                }
            }

            customFn(checked);
            addLogLine(toggle.id.replace('toggle', '') + ' ' + (checked ? 'ON' : 'OFF'));
        });
    }

    // Gán sự kiện cho các toggle
    setupToggle(toggleFixRungTam, fixRungTamCustom, true, false);
    setupToggle(toggleFixLoDau, fixLoDauCustom, true, false);
    setupToggle(toggleFixLag, fixLagCustom, true, false);
    setupToggle(toggleBamDau, bamDauCustom, false, true);
    setupToggle(toggleAimLock, aimLockCustom, false, true);
    setupToggle(toggleSensiLock, sensiLockCustom, false, true);
    setupToggle(toggleNheTam, nheTamCustom, false, true);
    setupToggle(toggleTangTocMang, tangTocMangCustom, false, true);

    // ==================== MENU 3 SỌC ====================
    hamburgerBtn.addEventListener('click', () => {
        menuDropdown.classList.toggle('hidden');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            menuDropdown.classList.add('hidden');
            tabPanes.forEach(p => p.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
            if (tab === 'keyinfo') updateKeyInfoTab();
            if (tab === 'admininfo') updateAdminInfoTab();
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
            menuDropdown.classList.add('hidden');
        }
    });

    // ==================== ĐĂNG NHẬP ====================
    loginBtn.addEventListener('click', () => {
        const inputKey = keyInput.value.trim();
        if (!inputKey) { alert('Vui lòng nhập key'); return; }

        if (inputKey === ADMIN_KEY) {
            currentUser = 'admin';
            currentKeyData = { key: ADMIN_KEY, type: 'admin', expiry: '2099-12-31T23:59:59', devices: 999 };
        } else {
            const found = keys.find(k => k.key === inputKey);
            if (!found) { alert('Key không hợp lệ'); return; }
            if (new Date(found.expiry) < new Date()) { alert('Key đã hết hạn'); return; }
            currentUser = 'user';
            currentKeyData = found;
        }

        // Hiện giao diện chính
        loginBox.classList.add('hidden');
        homeContent.style.display = 'block';
        activePanel.classList.remove('hidden');
        monitorPanel.classList.remove('hidden');
        logoutBtn.style.display = 'inline-block';

        // Điền thông tin key
        displayKey.textContent = currentKeyData.key;
        expiryDateDisplay.textContent = new Date(currentKeyData.expiry).toLocaleString('vi-VN');
        updateCountdownUI();
        setInterval(updateCountdownUI, 1000);

        // Hiển thị / ẩn nhóm VIP
        if (canUseVip()) {
            vipToggles.style.display = 'flex';
        } else {
            vipToggles.style.display = 'none';
        }

        // Admin
        if (currentUser === 'admin') {
            adminPanel.classList.remove('hidden');
            renderKeyList();
        } else {
            adminPanel.classList.add('hidden');
        }

        // Reset tất cả toggle về OFF và xóa hiệu ứng
        const allToggles = [toggleFixRungTam, toggleFixLoDau, toggleFixLag, toggleBamDau, toggleAimLock, toggleSensiLock, toggleNheTam, toggleTangTocMang];
        allToggles.forEach(t => {
            t.checked = false;
        });
        document.querySelectorAll('.toggle-item').forEach(item => item.classList.remove('enabled'));

        // Gọi custom tắt toàn bộ chức năng để dọn dẹp
        fixRungTamCustom(false);
        fixLoDauCustom(false);
        fixLagCustom(false);
        bamDauCustom(false);
        aimLockCustom(false);
        sensiLockCustom(false);
        nheTamCustom(false);
        tangTocMangCustom(false);

        updateKeyInfoTab();
        updateAdminInfoTab();
        addLogLine('Đăng nhập thành công, key: ' + currentKeyData.key);
    });

    // ==================== ĐĂNG XUẤT ====================
    logoutBtn.addEventListener('click', () => {
        // Tắt tất cả chức năng
        const allToggles = [toggleFixRungTam, toggleFixLoDau, toggleFixLag, toggleBamDau, toggleAimLock, toggleSensiLock, toggleNheTam, toggleTangTocMang];
        allToggles.forEach(t => {
            t.checked = false;
        });
        document.querySelectorAll('.toggle-item').forEach(item => item.classList.remove('enabled'));

        fixRungTamCustom(false);
        fixLoDauCustom(false);
        fixLagCustom(false);
        bamDauCustom(false);
        aimLockCustom(false);
        sensiLockCustom(false);
        nheTamCustom(false);
        tangTocMangCustom(false);

        currentUser = null;
        currentKeyData = null;
        loginBox.classList.remove('hidden');
        homeContent.style.display = 'none';
        activePanel.classList.add('hidden');
        monitorPanel.classList.add('hidden');
        logoutBtn.style.display = 'none';
        keyInput.value = '';
        addLogLine('Đã đăng xuất');
    });

    // ==================== THÔNG TIN KEY & ADMIN ====================
    function updateKeyInfoTab() {
        const content = document.getElementById('keyInfoContent');
        if (!currentKeyData) {
            content.innerHTML = '<p>Vui lòng đăng nhập để xem thông tin key.</p>';
            return;
        }
        const typeText = currentKeyData.type === 'vip' ? 'VIP' : currentKeyData.type === 'normal' ? 'Thường' : 'Admin';
        content.innerHTML = `
            <p><strong>Key:</strong> ${currentKeyData.key}</p>
            <p><strong>Loại:</strong> ${typeText}</p>
            <p><strong>Hết hạn:</strong> ${new Date(currentKeyData.expiry).toLocaleString('vi-VN')}</p>
            <p><strong>Thiết bị:</strong> ${currentKeyData.devices}</p>
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

    // ==================== ADMIN PANEL ====================
    function renderKeyList() {
        keys = loadKeys();
        if (keys.length === 0) {
            keyListContainer.innerHTML = '<p>Chưa có key.</p>';
            return;
        }
        let html = '';
        keys.forEach(k => {
            html += `
                <div class="key-item">
                    <span>${k.key} (${k.type}) - ${new Date(k.expiry).toLocaleDateString('vi-VN')} - TB:${k.devices}</span>
                    <button onclick="deleteKey('${k.key}')">Xóa</button>
                </div>`;
        });
        keyListContainer.innerHTML = html;
    }

    window.deleteKey = function(keyDel) {
        if (currentUser !== 'admin') return;
        if (!confirm('Xóa key ' + keyDel + '?')) return;
        keys = keys.filter(k => k.key !== keyDel);
        saveKeys(keys);
        renderKeyList();
        addLogLine('Admin deleted key: ' + keyDel);
    };

    createKeyBtn.addEventListener('click', () => {
        if (currentUser !== 'admin') return;
        const keyStr = newKeyString.value.trim();
        const days = parseInt(newKeyDays.value) || 7;
        const devices = parseInt(newKeyDevices.value) || 1;
        const type = newKeyType.value;
        if (!keyStr) { alert('Nhập key'); return; }
        if (keys.some(k => k.key === keyStr)) { alert('Key tồn tại'); return; }

        const exp = new Date();
        exp.setDate(exp.getDate() + days);
        keys.push({ key: keyStr, type, expiry: exp.toISOString(), devices });
        saveKeys(keys);
        renderKeyList();
        addLogLine(`Admin created key: ${keyStr} (${type})`);
        alert('Tạo key thành công');
        newKeyString.value = '';
    });

    // ==================== MONITOR & GAME ====================
    monitorGames.forEach(g => {
        g.addEventListener('click', () => {
            monitorGames.forEach(x => x.classList.remove('active'));
            g.classList.add('active');
            addLogLine('Monitor focus: ' + g.textContent);
        });
    });

    // ==================== HIỆU ỨNG TUYẾT ====================
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const count = 80;

    function resize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    function create() {
        snowflakes = [];
        for (let i = 0; i < count; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 1,
                spY: Math.random() * 0.5 + 0.2,
                spX: Math.random() * 0.2 - 0.1,
                op: Math.random() * 0.7 + 0.3
            });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let f of snowflakes) {
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${f.op})`;
            ctx.fill();
        }
    }
    function update() {
        for (let f of snowflakes) {
            f.y += f.spY;
            f.x += f.spX;
            if (f.y > canvas.height + f.r) { f.y = -f.r; f.x = Math.random() * canvas.width; }
            if (f.x > canvas.width + f.r) f.x = -f.r;
            if (f.x < -f.r) f.x = canvas.width + f.r;
        }
    }
    function loop() {
        draw();
        update();
        requestAnimationFrame(loop);
    }
    window.addEventListener('resize', () => { resize(); create(); });
    resize();
    create();
    loop();

    // ==================== KHỞI ĐỘNG ====================
    addLogLine('Hệ thống sẵn sàng...');
});
