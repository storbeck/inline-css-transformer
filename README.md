# inline-css-transformer

`inline-css-transformer` is a simple Node.js script that converts CSS styles in an HTML file to inline styles. This tool is useful for simplifying HTML files by inlining all the CSS, making the HTML self-contained.

## Features

- Transforms CSS classes and styles in `<style>` tags to inline styles.
- Outputs the transformed HTML directly to the console.
- Easy to use with a single command.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/storbeck/inline-css-transformer.git
   cd inline-css-transformer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make the script executable (optional):

   ```bash
   chmod +x inline-css-transformer.js
   ```

4. (Optional) Install globally to use as a command-line tool:

   ```bash
   npm install -g .
   ```

## Usage

Run the script by passing the path to your HTML file as an argument:

```bash
npm run start -- src/index.html
```

Or, if installed globally:

```bash
inline-css-transformer src/index.html
```

### Example

Given an HTML file `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    <style>
        .example {
            color: red;
        }
    </style>
</head>
<body>
    <div class="example">Hello, World!</div>
</body>
</html>
```

Running the command will output:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
</head>
<body>
    <div style="color: red;">Hello, World!</div>
</body>
</html>
```

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
