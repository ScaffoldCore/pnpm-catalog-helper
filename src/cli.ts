import { resolve } from 'node:path'
import * as process from 'node:process'
import { cyan, yellow } from 'ansis'
import cac from 'cac'
import { findUp } from 'find-up'
import { x } from 'tinyexec'
import { parse, stringify } from 'yaml'
import { stringifyYamlWithTopLevelBlankLine } from '@/utils.ts'
import { name, version } from '../package.json'

const cli = cac(name)

cli.command('')
    .action(() => {
        cli.outputHelp()
    })

cli
    .command('[catalogName] [...packages]', 'Add packages to a specific pnpm Catalog.')
    .example('pp tools jiti')
    .allowUnknownOptions()
    .action(async (catalogName: string, packages: string[]) => {
        const config = {
            cwd: process.cwd(),
        }

        if (!catalogName) {
            console.log(yellow('❌ Error: Please specify a catalog name'))
            console.log(yellow('   Example: pp tools jiti'))
            process.exit(1)
        }

        if (!packages.length) {
            console.log(yellow('❌ Error: Please specify packages to install'))
            console.log(yellow('   Example: pp tools jiti lodash'))
            process.exit(1)
        }

        const pnpmLockPath = await findUp(resolve(config.cwd, 'pnpm-lock.yaml'))

        if (!pnpmLockPath) {
            console.log(yellow('❌ Error: pnpm-lock.yaml file not found'))
            console.log(yellow('   Make sure to run this command in a pnpm project root directory'))
            process.exit(1)
        }

        const pnpmWorkSpaceYamlPath = await findUp(resolve(config.cwd, 'pnpm-workspace.yaml'))

        if (!pnpmWorkSpaceYamlPath) {
            console.log(yellow('❌ Error: pnpm-workspace.yaml file not found'))
            console.log(yellow('   Make sure to run this command in a pnpm workspace project'))
            process.exit(1)
        }

        const fs = (await import('node:fs/promises')).default

        const workspaceConfig = parse(await fs.readFile(pnpmWorkSpaceYamlPath, 'utf8'))
        let configUpdated = false

        if (!workspaceConfig.catalogMode) {
            workspaceConfig.catalogMode = 'prefer'
            configUpdated = true
            console.log(cyan('✅ Added catalogMode: true to pnpm-workspace.yaml'))
        }

        if (!workspaceConfig.cleanupUnusedCatalogs) {
            workspaceConfig.cleanupUnusedCatalogs = true
            configUpdated = true
            console.log(cyan('✅ Added cleanupUnusedCatalogs: true to pnpm-workspace.yaml'))
        }

        if (configUpdated) {
            const updatedYaml = stringify(workspaceConfig, {
                indent: 2,
                lineWidth: 0,
                minContentWidth: 0,
            })
            await fs.writeFile(pnpmWorkSpaceYamlPath, stringifyYamlWithTopLevelBlankLine(updatedYaml), 'utf8')
            console.log(cyan('📝 Updated pnpm-workspace.yaml with catalog configuration'))
        }

        const argParams = process.argv.slice(3 + packages.length)

        const args = [
            'add',
            ...packages,
            '--save-catalog-name',
            catalogName,
            ...argParams,
        ]

        await x('pnpm', args, {
            nodeOptions: {
                stdio: 'inherit',
                cwd: config.cwd,
            },
        })
    })

cli.help()
cli.version(version)
cli.parse()
