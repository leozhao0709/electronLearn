const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = require('electron');

let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on('close', () => {
    console.log(`window close`);
  });
  mainWindow.on('closed', () => {
    console.log(`window closed`);
    app.quit();
  })

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo',
    parent: mainWindow,
    center: true
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  addWindow.on('closed', () => {
    addWindow = null;
  })
}

ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo);
  addWindow.close();
})

const menuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'New Todo',
        click() {
          createAddWindow();
        },
        accelerator: process.platform === 'darwin' ? 'cmd+n' : 'ctrl+n',
      },
      {
        label: 'Clear Todos',
        accelerator: process.platform === 'darwin' ? 'cmd+backspace' : 'ctrl+backspace',
        click() {
          mainWindow.webContents.send('todo:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'cmd+q' : 'ctrl+q',
        click() {
          app.quit();
        },
      },
    ]
  },
  {
    label: 'View',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      // {
      //   role: 'toggledevtools'
      // },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV != 'production') {
  menuTemplate.push({
    label: 'Develop',
    submenu: [
      // {
      //   label: 'Toggle Developer Tools',
      //   click(item, focusedWindow) {
      //     focusedWindow.toggleDevTools();
      //   }
      // },

      {
        // label: 'Toggle Developer Tools',
        role: 'toggledevtools'
      }
    ]
  })
}