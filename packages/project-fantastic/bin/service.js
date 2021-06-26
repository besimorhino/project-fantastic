#!/usr/bin/env node
const InitService = require('../service/initservice')

const svc = InitService()

svc.on('install', () => {
    console.log('Launching Fantastic service...')
    svc.start()
})

svc.install()