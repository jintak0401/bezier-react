/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')

const { generateIconFiles } = require('./generateIconFilesFromJson')

jest.mock('fs', () => ({
  existsSync: () => false,
  rmSync: () => {},
  mkdirSync: () => {},
  readFileSync: (v) => v,
  writeFileSync: jest.fn(),
}))

const svgString = '<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n<path fill-rule=\\"evenodd\\" clip-rule=\\"evenodd\\" d=\\"M8.39131 13.0069L17.2273 12.9899L6.87631 18.9659L8.39131 13.0069ZM17.2533 10.9889L8.3963 11.0069L6.9183 5.0229L17.2533 10.9889ZM21.9723 11.9829V11.9819V11.9809C21.9723 11.9799 21.9723 11.9789 21.9723 11.9769C21.9713 11.8579 21.9423 11.7439 21.9023 11.6359C21.8913 11.6089 21.8813 11.5819 21.8693 11.5559C21.8203 11.4529 21.7603 11.3569 21.6793 11.2759C21.6783 11.2749 21.6763 11.2739 21.6753 11.2729C21.6153 11.2129 21.5473 11.1589 21.4723 11.1159L5.88432 2.1159C5.53732 1.9149 5.10432 1.9419 4.78332 2.1839C4.46232 2.4239 4.31732 2.8329 4.41332 3.2229L6.58232 12.0049L4.35432 20.7719C4.25532 21.1609 4.39932 21.5719 4.72032 21.8149C4.89732 21.9489 5.11032 22.0179 5.32332 22.0179C5.49532 22.0179 5.66832 21.9739 5.82332 21.8839L21.4723 12.8489C21.6523 12.7449 21.7843 12.5879 21.8703 12.4059C21.8823 12.3799 21.8923 12.3549 21.9033 12.3269C21.9433 12.2169 21.9723 12.1029 21.9723 11.9829Z\\" fill=\\"#313234\\"/>\\n</svg>\\n'
const iconsJson = `{"send":{"svg":"${svgString}","id":"send"}}`
const iconSvg = JSON.parse(iconsJson).send.svg
const bezierIconsDirectory = path.resolve(__dirname, '..')

describe('generate-icon-files script', () => {
  test('writes file with icons.json given by figma-plugin', () => {
    generateIconFiles(iconsJson, bezierIconsDirectory)

    expect(fs.writeFileSync).toBeCalledWith(
      path.resolve(`${bezierIconsDirectory}/send.svg`),
      iconSvg,
      'utf-8',
    )
  })
})
