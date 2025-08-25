import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    const url = 'http://localhost:5173';
    mainWindow.loadURL(url).catch((e) => console.error(e));
  } else {
    const indexHtml = `file://${path.join(app.getAppPath(), 'dist', 'index.html')}`;
    mainWindow.loadURL(indexHtml).catch((e) => console.error(e));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
