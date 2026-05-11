document.addEventListener('DOMContentLoaded', function() {
    // ==================== Key Admin ====================
    const ADMIN_KEY = 'STORENGUYENLONGIOS';
    let currentUser = null;
    let currentKeyData = null;

    // ==================== Storage Key ====================
    function loadKeys() {
        const stored = localStorage.getItem('aimtrick_keys');
        if (stored) return JSON.parse(stored);
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

    // ==================== UI Elements ====================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuDropdown = document.getElementById('menuDropdown');
    const menuItems = document.querySelectorAll('.menu-item');
    const tabPanes = document.querySelectorAll('.tab-pane'); // Các tab chính (home, keyinfo, admininfo)

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

    // Toggle elements
    const toggleAim = document.getElementById('toggleAimTrickHead');
    const toggleBamDau = document.getElementById('toggleBamDau');
    const toggleNheTam = document.getElementById('toggleNheTam');

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

    // Subtabs (Main, Optimize+, Social, TikTok)
    const subTabs = document.querySelectorAll('.tab');
    const subTabPanes = document.querySelectorAll('.subtab-pane');

    // ==================== Hàm tiện ích ====================
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
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff / (1000*60*60)) % 24);
        const m = Math.floor((diff / (1000*60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        const text = `${d} ngày ${h} giờ ${m} phút ${s} giây`;
        expiryCountdown.textContent = text;
        keyExpiryMini.textContent = 'Key còn hiệu lực: ' + text;
    }

    // ==================== CÁC HÀM CUSTOM – THÊM CODE CỦA BẠN VÀO ĐÂY ====================
    function aimTrickHeadCustom(isEnabled) {
        // ====== THÊM CODE CỦA BẠN CHO AIMTRICKHEAD ======
        if (isEnabled) {
            // Code khi bật AimTrickHead
        } else {
            // Code khi tắt AimTrickHead
        }
    }

    function bamDauCustom(isEnabled) {
        // ====== THÊM CODE CỦA BẠN CHO BÁM ĐẦU ======
        if (isEnabled) {
            // Code khi bật Bám Đầu
        } else {
            // Code khi tắt Bám Đầu
        }
    }

    function nheTamCustom(isEnabled) {
        // ====== THÊM CODE CỦA BẠN CHO NHẸ TÂM ======
        if (isEnabled) {
            // Code khi bật Nhẹ Tâm
        } else {
            // Code khi tắt Nhẹ Tâm
        }
    }

    // ==================== Xử lý bật/tắt (gọi hàm custom + log) ====================
    function handleAimTrickHead(checked) {
        if (!canUseVipFeatures()) {
            toggleAim.checked = false;
            return;
        }
        aimTrickHeadCustom(checked);
        addLogLine('AimTrickHead ' + (checked ? 'ON' : 'OFF'));
    }

    function handleBamDau(checked) {
        if (!canUseVipFeatures()) {
            toggleBamDau.checked = false;
            return;
        }
        bamDauCustom(checked);
        addLogLine('Bám Đầu ' + (checked ? 'ON' : 'OFF'));
    }

    function handleNheTam(checked) {
        if (!canUseVipFeatures()) {
            toggleNheTam.checked = false;
            return;
        }
        nheTamCustom(checked);
        addLogLine('Nhẹ Tâm ' + (checked ? 'ON' : 'OFF'));
    }

    // Gắn sự kiện cho 3 toggle
    toggleAim.addEventListener('change', function() {
        handleAimTrickHead(this.checked);
    });
    toggleBamDau.addEventListener('change', function() {
        handleBamDau(this.checked);
    });
    toggleNheTam.addEventListener('change', function() {
        handleNheTam(this.checked);
    });

    // ==================== Menu 3 sọc ====================
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

    // ==================== Xử lý subtab (Main, Optimize+, Social, TikTok) ====================
    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Bỏ active tất cả tab
            subTabs.forEach(t => t.classList.remove('active'));
            // Thêm active cho tab hiện tại
            tab.classList.add('active');
            // Ẩn tất cả pane
            subTabPanes.forEach(pane => pane.classList.remove('active'));
            // Hiện pane tương ứng
            const target = tab.getAttribute('data-subtab');
            const targetPane = document.getElementById('subtab-' + target);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            // Log
            addLogLine('Tab: ' + tab.textContent);
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
        } else {
            const found = keys.find(k => k.key === inputKey);
            if (!found) {
                alert('Key không hợp lệ');
                return;
            }
            if (new Date(found.expiry) < new Date()) {
                alert('Key đã hết hạn');
                return;
            }
            currentUser = 'user';
            currentKeyData = found;
        }

        // Hiện giao diện
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

        // Admin
        if (currentUser === 'admin') {
            adminPanel.classList.remove('hidden');
            renderKeyList();
        } else {
            adminPanel.classList.add('hidden');
        }

        // Reset toggle về OFF và gọi custom (tắt nếu cần)
        toggleAim.checked = false;
        toggleBamDau.checked = false;
        toggleNheTam.checked = false;
        aimTrickHeadCustom(false);
        bamDauCustom(false);
        nheTamCustom(false);

        updateKeyInfoTab();
        updateAdminInfoTab();
        addLogLine('Đăng nhập thành công, key: ' + currentKeyData.key);
    });

    // Đăng xuất
    logoutBtn.addEventListener('click', () => {
        // Tắt tất cả chức năng trước khi đăng xuất
        if (toggleAim.checked) {
            toggleAim.checked = false;
            aimTrickHeadCustom(false);
        }
        if (toggleBamDau.checked) {
            toggleBamDau.checked = false;
            bamDauCustom(false);
        }
        if (toggleNheTam.checked) {
            toggleNheTam.checked = false;
            nheTamCustom(false);
        }

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

    // ==================== Thông tin key & admin ====================
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

    // ==================== Admin Panel ====================
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

    // ==================== Monitor & game ====================
    monitorGames.forEach(g => {
        g.addEventListener('click', () => {
            monitorGames.forEach(x => x.classList.remove('active'));
            g.classList.add('active');
            addLogLine('Monitor focus: ' + g.textContent);
        });
    });

    // ==================== Hiệu ứng tuyết ====================
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
        for (let i=0;i<count;i++) {
            snowflakes.push({
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height,
                r: Math.random()*2.5+1,
                spY: Math.random()*0.5+0.2,
                spX: Math.random()*0.2-0.1,
                op: Math.random()*0.7+0.3
            });
        }
    }
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (let f of snowflakes) {
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,255,255,${f.op})`;
            ctx.fill();
        }
    }
    function update() {
        for (let f of snowflakes) {
            f.y += f.spY;
            f.x += f.spX;
            if (f.y > canvas.height+f.r) { f.y = -f.r; f.x = Math.random()*canvas.width; }
            if (f.x > canvas.width+f.r) f.x = -f.r;
            if (f.x < -f.r) f.x = canvas.width+f.r;
        }
    }
    function loop() {
        draw();
        update();
        requestAnimationFrame(loop);
    }
    window.addEventListener('resize', ()=>{ resize(); create(); });
    resize(); create(); loop();

    // Khởi động
    addLogLine('Hệ thống sẵn sàng...');
});
