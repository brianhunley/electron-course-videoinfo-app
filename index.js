const electron = require('electron');
const fluent_ffmpeg = require('fluent-ffmpeg');

const  { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  // mainWindow.loadFile('./index.html');
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// use ipcMain.on to handle the event from the Main Window
ipcMain.on('video:submit', (event, path) => {
  // set the path to the ffprobe.exe file because setting Windows environment vars didn't work
  const ffmpeg = fluent_ffmpeg(path).setFfprobePath("C:\\ffmpeg\\bin\\ffprobe.exe");
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});