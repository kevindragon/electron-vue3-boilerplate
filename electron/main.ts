import { app, BrowserWindow, ipcMain } from "electron";

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  await mainWindow.loadURL("http://localhost:3000");
  // await mainWindow.loadURL("https://baidu.com");

  mainWindow.show();

  ipcMain.handle('versions', () => {
    return {
        node: process.versions.chrome,
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        // version: app.getVersion(),
        // name: app.getName(),
    };
  });
}

app.whenReady().then(async () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

