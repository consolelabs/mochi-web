const glob = require('glob')
const path = require('path')
const fsPromise = require('fs').promises
const fs = require('fs')
const prettier = require('prettier')
const babel = require('@babel/core')

const prettierConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.prettierrc')).toString(),
)

const formatCode = (code) =>
  prettier.format(code, { parser: 'babel', ...prettierConfig })

const generateIconComponentContent = (componentName, path) => {
  const content = fs.readFileSync(path)

  const { code } = babel.transform(content, {
    plugins: [['inline-react-svg', { filename: '' }]],
    presets: ['@babel/preset-react'],
  })

  return formatCode(
    `
// This file is generated using scripts/generate-icon-components/utils.js
// Don't edit it manually
import React from 'react';

const ${componentName} = (props: React.HTMLAttributes<SVGElement>) => ${code.replace(
      '{',
      '{ ...props,',
    )}

export { ${componentName} };
`,
  )
}

const kebab2Pascal = (inputStr) =>
  inputStr
    .split('-')
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join('')

const getSvgInfos = () => {
  const svgFilePaths = glob.sync('./components/icons/svg/*.svg')

  //assets/icons/setting-bar.svg
  return svgFilePaths.map((svgFilePath) => {
    //setting-bar
    const baseNameWithoutExtension = path.basename(svgFilePath, '.svg')
    //IconSettingBar
    const componentName = `Icon${kebab2Pascal(baseNameWithoutExtension)}`

    return {
      componentContent: generateIconComponentContent(
        componentName,
        svgFilePath,
      ),
      componentName,
    }
  })
}

const generateFileBasedOnSvgInfo = (svgInfo) => {
  const filePath = path.resolve(
    __dirname,
    '../components/icons/components/',
    `${svgInfo.componentName}.tsx`,
  )

  return fsPromise.writeFile(filePath, svgInfo.componentContent)
}

const generateIndexFileContent = (svgInfos) =>
  `// This file is generated using scripts/generate-icon-components/utils.js
// Don't edit it manually
${svgInfos
  .map(
    ({ componentName }) =>
      `export { default as ${componentName} } from './components/${componentName}';`,
  )
  .join('\n')
  .trim()}`

module.exports = {
  getSvgInfos,
  generateFileBasedOnSvgInfo,
  generateIndexFileContent,
}
