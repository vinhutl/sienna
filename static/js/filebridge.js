// Simple file utilities and parent/iframe bridge for uploads/downloads/exports
// Usage (from parent context): window.FileBridge.pickFile, downloadBlob, exportJSON, openInTextEditor
// Usage (from iframe/app): window.parent.postMessage({type:'sienna:download', filename, mime, data}, '*')

(function(){
  const FileBridge = {
    pickFile(options={}) {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        if (options.accept) input.accept = options.accept;
        input.onchange = async () => {
          const file = input.files && input.files[0];
          if (!file) return reject(new Error('No file selected'));
          try {
            const as = options.as || 'auto'; // 'text' | 'arrayBuffer' | 'dataURL' | 'auto'
            const reader = new FileReader();
            reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
            reader.onload = () => {
              resolve({
                name: file.name,
                size: file.size,
                type: file.type || 'application/octet-stream',
                lastModified: file.lastModified,
                content: reader.result
              });
            };
            const lower = (file.type || '').toLowerCase();
            const isText = lower.startsWith('text/') || /json|xml|csv|yaml|yml|md|markdown/.test(lower) || /\.(txt|md|json|csv|xml|y[a]?ml|html|css|js|ts)$/i.test(file.name);
            const mode = as === 'auto' ? (isText ? 'text' : 'arrayBuffer') : as;
            if (mode === 'text') reader.readAsText(file);
            else if (mode === 'dataURL') reader.readAsDataURL(file);
            else reader.readAsArrayBuffer(file);
          } catch (e) {
            reject(e);
          }
        };
        // trigger file dialog
        input.click();
      });
    },

    downloadBlob(data, filename='download.bin', mime='application/octet-stream') {
      try {
        const blob = data instanceof Blob ? data : new Blob([data], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error('downloadBlob failed', e);
      }
    },

    exportJSON(obj, filename='export.json') {
      const json = JSON.stringify(obj, null, 2);
      this.downloadBlob(json, filename, 'application/json');
    },

    // Open the built-in Text Editor app with initial content
    openInTextEditor({ name='untitled.txt', content='' } = {}) {
      try {
        sessionStorage.setItem('sienna:texteditor:init', JSON.stringify({ name, content }));
      } catch (_) {}
      if (typeof openGameModal === 'function') {
        openGameModal('static/apps/texteditor/index.html', 'Text Editor');
      } else if (window.gameTabManager && typeof window.gameTabManager.openModal === 'function') {
        window.gameTabManager.openModal('static/apps/texteditor/index.html', 'Text Editor');
      } else {
        // Fallback: navigate
        window.location.href = 'static/apps/texteditor/index.html';
      }
    }
  };

  // Expose globally
  try { window.FileBridge = FileBridge; } catch (_) {}

  // Parent-side listener to enable iframes to trigger downloads
  window.addEventListener('message', (ev) => {
    const msg = ev && ev.data;
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'sienna:download') {
      const { filename = 'download.bin', mime = 'application/octet-stream', data } = msg;
      if (typeof data === 'string') {
        // string -> Blob as text by default
        FileBridge.downloadBlob(data, filename, mime || 'text/plain');
      } else if (data instanceof ArrayBuffer) {
        FileBridge.downloadBlob(data, filename, mime);
      } else if (msg.base64) {
        // base64 string
        const byteChars = atob(msg.base64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
        const byteArray = new Uint8Array(byteNumbers);
        FileBridge.downloadBlob(byteArray, filename, mime);
      } else {
        // try JSON
        try { FileBridge.exportJSON(data, filename.endsWith('.json') ? filename : filename + '.json'); } catch (e) {}
      }
    }
  });
})();
