# export-resume

This is the command line tool to export [JSON Resume](https://jsonresume.org) to human readable formats such as `html`, `pdf`, `md` and `txt`.

[Read more about JSON Resume...](https://jsonresume.org/schema/)

# Getting Started

Install the command-line tool:

```
npm install -g @ccl-consulting/export-resume
```

# Usage

```
export-resume [output]

Export JSON Resume to human readable formats

Positionals:
  output  path to output file

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --resume, -r   path to JSON Resume file             [default: "./resume.json"]
  --verbose, -v                                                 [default: false]
  --format, -f   output file format    [choices: "html", "pdf"] [default: "pdf"]
  --theme, -t    JSON Resume theme name               [default: "stackoverflow"]
```

# License

Available under [the MIT license](https://choosealicense.com/licenses/mit/).
