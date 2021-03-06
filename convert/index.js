const {
  app,
  BrowserWindow,
  ipcMain,
  shell
} = require('electron');

const path = require('path');

const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  mainWindow.on('closed', () => {
    app.quit();
  })
});

ipcMain.on('videos:added', (event, videos) => {
  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration;
        video.format = 'avi';
        resolve(video);
      })
    })
  });

  Promise.all(promises)
    .then((results) => {
      // console.log(results);
      mainWindow.webContents.send('metadata:complete', results);
    });
});

ipcMain.on('conversion:start', (event, videos) => {
  _.each(videos, video => {
    const outputDirectory = path.dirname(video.path);
    const outputName = path.basename(video.path, path.extname(video.path));
    const outputPath = `${outputDirectory}/${outputName}.${video.format}`
    console.log(outputPath);

    ffmpeg(video.path)
      .output(outputPath)
      .on('progress', ({
        timemark
      }) => {
        mainWindow.webContents.send('conversion:progress', {
          video,
          timemark
        })
      })
      .on('end', () => {
        console.log(`Video conversion complete`);
        mainWindow.webContents.send('conversion:end', {
          video,
          outputPath
        })
      })
      .run();
  })

});

ipcMain.on('folder:open', (event, outputPath) => {
  shell.showItemInFolder(outputPath);
});