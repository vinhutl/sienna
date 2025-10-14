(function() {
    const downloadBtn = document.getElementById('downloadSaveBtn');
    const uploadBtn = document.getElementById('uploadSaveBtn');
    const uploadInput = document.getElementById('uploadSaveInput');

    function gatherData() {
        const ls = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            ls[key] = localStorage.getItem(key);
        }
        const ss = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            ss[key] = sessionStorage.getItem(key);
        }
        const cookieString = document.cookie || '';
        const cookies = cookieString.split('; ').filter(Boolean).reduce((acc, c) => {
            const idx = c.indexOf('=');
            if (idx === -1) return acc;
            const key = decodeURIComponent(c.slice(0, idx));
            const value = decodeURIComponent(c.slice(idx + 1));
            acc[key] = value;
            return acc;
        }, {});
        return {
            meta: {
                version: 1,
                origin: location.origin,
                savedAt: new Date().toISOString()
            },
            localStorage: ls,
            sessionStorage: ss,
            cookies: cookies
        };
    }

    function askPassword(promptText = 'Enter a password to encrypt/decrypt the save file:') {
        const pw = prompt(promptText);
        if (!pw) {
            alert('Password required.');
            return null;
        }
        return pw;
    }

    downloadBtn.addEventListener('click', () => {
        const pw = askPassword('Choose a password to encrypt your save (remember it to restore):');
        if (!pw) return;
        try {
            const data = gatherData();
            const json = JSON.stringify(data, null, 2);
            const encrypted = CryptoJS.AES.encrypt(json, pw).toString();
            const blob = new Blob([encrypted], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'your.sienna.save';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert('Error creating save: ' + err.message);
        }
    });

    uploadBtn.addEventListener('click', () => uploadInput.click());

    uploadInput.addEventListener('change', (ev) => {
        const f = ev.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            const encrypted = e.target.result;
            const pw = askPassword('Enter the password to decrypt this save:');
            if (!pw) return;
            try {
                const bytes = CryptoJS.AES.decrypt(encrypted, pw);
                const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                if (!decrypted) {
                    alert('Failed to decrypt. Wrong password or corrupted file.');
                    return;
                }
                const parsed = JSON.parse(decrypted);
                if (confirm('Restore save: click OK to merge (saved keys overwrite current). Cancel to abort.')) {
                    if (parsed.localStorage) Object.keys(parsed.localStorage).forEach(k => localStorage.setItem(k, parsed.localStorage[k]));
                    if (parsed.sessionStorage) Object.keys(parsed.sessionStorage).forEach(k => sessionStorage.setItem(k, parsed.sessionStorage[k]));
                    if (parsed.cookies) Object.keys(parsed.cookies).forEach(k => {
                        const v = parsed.cookies[k];
                        document.cookie = encodeURIComponent(k) + '=' + encodeURIComponent(v) + '; path=/; SameSite=Lax';
                    });
                    alert('Save restored (merged). Page will reload to apply.');
                    location.reload();
                }
            } catch (err) {
                console.error(err);
                alert('Error restoring save: ' + err.message);
            }
        };
        reader.readAsText(f);
        uploadInput.value = '';
    });
})();
