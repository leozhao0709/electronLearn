const {
  app,
  BrowserWindow,
} = require('electron');

require('electron-reload')(`${__dirname}/dist`);

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  // mainWindow.loadURL(`http://localhost:4200/`); //works
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);


  mainWindow.on('closed', () => {
    app.quit();
  })
});
