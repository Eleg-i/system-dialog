const { spawnSync } = require('child_process'),
      { platform } = require('os'),
      { resolve } = require('path')

module.exports = function systemDialog(params) {
  let args = params || process.argv.slice(2)

  if (!Array.isArray(args)) {
    args = []

    for (const key in params) {
      const value = params[key],
            arg = `-${key}` + (value ? `=${value}` : '')

      args.push(arg)
    }
  }

  switch (platform()) {
    case 'win32':
      {
        let output

        try {
          ({ output } = spawnSync('zenity.exe', args, {
            cwd: resolve(__dirname, './package/zenity_win32/'),
            encoding: 'utf8'
          }))
        } catch (error) {
          console.error(`spawnSync error: ${error}`)
        }

        // eslint-disable-next-line no-console
        if (output) console.log(output.join('\n'))
      }

      break
    case 'linux':
      throw new Error('暂未适配 linux (linux is not currently available)')
    case 'darwin':
      throw new Error('暂未适配 macOS (macOS is not currently available)')
    default:
      break
  }
}
