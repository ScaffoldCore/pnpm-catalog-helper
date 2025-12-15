
`pnpm-catalog-helper` is designed to streamline the process of adding packages to pnpm workspace catalogs. It automatically detects and configures the necessary pnpm workspace settings, ensuring a smooth catalog-based dependency management experience.

### Key Features

- 🚀 **Simplified Catalog Management**: Easy addition of packages to specific catalog groups
- ⚙️ **Automatic Configuration**: Detects and adds required pnpm workspace settings

## 🚀 Usage

### Installation

```bash
# Install globally
pnpm add -g pnpm-catalog-helper

# Or install locally
pnpm add -D pnpm-catalog-helper
```

### Basic Usage

```bash
# Add a single package to the 'tools' catalog
pp tools jiti

# Add multiple packages to the 'production' catalog
pp production react react-dom

# Add packages with additional pnpm options
pp dev typescript --save-dev
```

### Command Structure

```bash
pp <catalog-name> <package1> [package2...] [pnpm-options]
```

- `<catalog-name>`: The catalog group name (e.g., tools, production, dev)
- `<package1> [package2...]`: One or more package names to install
- `[pnpm-options]`: Additional pnpm options (e.g., --save-dev, --save-exact)

### Automatic Configuration

The tool automatically ensures your `pnpm-workspace.yaml` has the required configuration:

```yaml
catalogMode: prefer
cleanupUnusedCatalogs: true
```

If these settings are missing, they will be added automatically. [Read more](https://pnpm.io/catalogs#settings)

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/ScaffoldCore/pnpm-catalog-helper.git
cd pnpm-catalog-helper

# Install dependencies
pnpm install

# Build the project
pnpm build
```

### Development Testing

```bash
# Watch mode for development
pnpm dev

# Test the CLI locally
node bin/index.js tools jiti

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix
```

### Project Structure

```
src/
├── cli.ts          # Main CLI implementation
├── utils.ts        # Utility functions for YAML processing
dist/               # Compiled output
bin/                # Binary entry point
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure they follow the project's coding standards
4. Run tests and linting: `pnpm lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a **Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Ensure TypeScript types are properly defined
- Add appropriate error handling and user-friendly messages
- Test your changes thoroughly
- Update documentation as needed

### Issues

If you encounter any issues or have feature requests, please:

1. Check existing [Issues](https://github.com/ScaffoldCore/pnpm-catalog-helper/issues)
2. Create a new issue with detailed description
3. Include reproduction steps and expected behavior

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Links

- [pnpm Catalog Documentation](https://pnpm.io/catalogs)
- [pnpm Workspace Documentation](https://pnpm.io/workspaces)
- [GitHub Repository](https://github.com/ScaffoldCore/pnpm-catalog-helper)

## 🙏 Acknowledgments

Thanks to the pnpm team for providing excellent catalog and workspace functionality that this tool builds upon.
