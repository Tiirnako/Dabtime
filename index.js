const { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

const electron = require('electron')

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './tray-icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  // Register a global shortcut (Play audio on "Ctrl+Alt+A")
  app.whenReady().then(() => {
    globalShortcut.register('ctrl+shift+d', () => {
      mainWindow.webContents.executeJavaScript(`
        audio.play();
      `);
    });
  });

  // Create a system tray icon
  tray = new Tray(path.join(__dirname, 'tray-icon.png'));

  // Define a context menu for the tray icon
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  // Set the context menu for the tray icon
  tray.setContextMenu(contextMenu);

  // Handle window minimize event
  mainWindow.on('minimize', (event) => {
    event.preventDefault(); // Prevent the window from minimizing
    if (process.platform === 'darwin') {
      app.dock.hide(); // Hide the dock icon on macOS
    } else {
      mainWindow.hide(); // Hide the window instead on other platforms
    }
  });

  // Handle window restore event
  mainWindow.on('restore', () => {
    if (process.platform === 'darwin') {
      app.dock.show(); // Show the dock icon on macOS
    }
  });
}

// Listen for messages from the renderer process to play audio
ipcMain.on('play-audio', () => {
  // Implement audio playback logic here
  // For example, play an audio file
  // Replace 'my-audio.mp3' with your audio file path
  mainWindow.webContents.executeJavaScript(`
    audio.play();
  `);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
