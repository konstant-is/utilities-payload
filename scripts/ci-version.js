import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import semver from 'semver'
import { execSync } from 'child_process'

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const incrementVersion = (currentVersion, releaseType) => {
  return semver.inc(currentVersion, releaseType)
}

const getPackageDep = (packageName) => {
  const path = resolvePath(`../../${packageName}/package.json`)
  const json = readJson(path)
  const version = json.version

  if (!version) {
    throw Error(`Version from ${packageName} not found`)
  }

  console.log(`${packageName}: ${version}`)
  return `git+https://github.com:konstant-is/${packageName}#release-v${version}`
}

const writeJson = (path, json) => {
  fs.writeFileSync(path, JSON.stringify(json, null, 2) + '\n', 'utf8')
}

const readJson = (p) => {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

const resolvePath = (p) => {
  return path.resolve(__dirname, p)
}
const updateVersion = (releaseType) => {
  const packageJsonPath = resolvePath('../package.json')
  const publishPackageJsonPath = resolvePath('../publish/package.json')

  try {
    const packageJson = readJson(packageJsonPath, 'utf8')
    const publishPackageJson = readJson(publishPackageJsonPath)

    const newVersion = incrementVersion(packageJson.version, releaseType)

    if (!newVersion) {
      throw new Error('Invalid release type. Use "patch", "minor", or "major".')
    }

    packageJson.version = newVersion
    publishPackageJson.version = newVersion

    const uiUtilsDep = getPackageDep('utilities-ui')
    packageJson.dependencies['@konstant/utilities-ui'] = uiUtilsDep
    publishPackageJson.dependencies['@konstant/utilities-ui'] = uiUtilsDep

    writeJson(packageJsonPath, packageJson)
    writeJson(publishPackageJsonPath, publishPackageJson)

    // Commit the changes to Git
    execSync(`git add ${packageJsonPath}`)
    execSync(`git add ${publishPackageJsonPath}`)
    execSync(`git commit -m "chore(version): bump version to ${newVersion}"`)
    execSync(`git push origin main`)

    console.log(`\nVersion updated to ${newVersion}`)
  } catch (error) {
    console.error('Error updating package.json:', error.message)
    process.exit(1)
  }
}

// Pass the release type as a command-line argument
const releaseType = process.argv[2]

if (!['patch', 'minor', 'major'].includes(releaseType)) {
  console.error('Please specify a release type: "patch", "minor", or "major".')
  console.error('Example: node updateVersion.js patch')
  process.exit(1)
}

updateVersion(releaseType)
