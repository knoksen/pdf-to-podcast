import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('appInfo', {
  version: process.env.npm_package_version || '0.0.0'
});
