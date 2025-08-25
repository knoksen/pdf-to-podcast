const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const isDev = !!process.env.VITE_DEV_SERVER_URL;

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
		},
		show: false,
	});

	win.on('ready-to-show', () => win.show());

	if (isDev) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL);
		win.webContents.openDevTools({ mode: 'detach' });
	} else {
		// Load built index.html served by Vite build
		win.loadFile(path.join(__dirname, 'dist', 'index.html'));
	}
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// Example: provide app version via IPC if needed
ipcMain.handle('app:getVersion', () => app.getVersion());
