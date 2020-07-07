const createCoinObj = (answers) => {
  const {
    isAc,
    native,
    electrum,
    isPbaasChain,
    isPrivate,
    sapling,
    zOnly,
    dustThreshold,
    rpcPort,
    startupParams,
    electrumServers,
    themeColor,
    osxDir,
    winDir,
    linuxDir,
    txFee
  } = answers;
  let tags = []

  if (isPbaasChain) tags = tags.concat(['is_pbaas', 'is_verus'])
  if (isPrivate) tags.push('is_zcash')
  if (sapling) tags.push('is_sapling')
  if (zOnly) tags.push('z_only')
  if (isAc) tags.push('is_komodo')

  return {
    id: answers.id,
    name: answers.name,
    isPbaasChain: isPbaasChain || false,
    themeColor,
    available_modes: {
      native,
      electrum,
      eth: false
    },
    options: {
      dustThreshold,
      fallbackPort: rpcPort,
      startupOptions: startupParams,
      daemon: isAc ? 'komodod' : 'verusd',
      customServers: electrumServers,
      dirNames: {
        darwin: osxDir,
        linux: linuxDir,
        win32: winDir,
      },
      tags: tags.join('|'),
      txFee
    }
  }
}

module.exports = createCoinObj