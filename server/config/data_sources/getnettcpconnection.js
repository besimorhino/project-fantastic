const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const states = {
  2: 'listen',
  3: 'syn_sent',
  4: 'syn_received',
  5: 'established',
  6: 'fin_wait_1',
  7: 'fin_wait_2',
  8: 'close_wait',
  9: 'closing',
  10: 'last_ack',
  11: 'time_wait',
  100: 'bound'
}

const getNetTcpConnection = {
  hosts: ['local', 'remote'],
  result_type: 'connections',
  run: hostname => CimSessionJSON('get-nettcpconnection', hostname)
    .then(res => res.map(v => {
      const state = states[v.State] || 'unknown'
      if (state === 'unknown') console.warn(`No mapping for Get-NetTcpConnection State ${v.State}`) 
      return {
        local_address: v.LocalAddress,
        local_port: v.LocalPort,
        remote_address: v.RemoteAddress,
        remote_port: v.RemotePort,
        process: v.OwningProcess,
        state
      }
    }))
}

module.exports = getNetTcpConnection