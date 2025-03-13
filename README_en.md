# Firecarpet

Firecarpet is a tool for automatically capturing screenshots of web pages, including:
- Initial page state
- Interactive elements (modals, dropdowns, accordions) after clicking

## Features

- Automatically finds clickable elements based on CSS selectors
- Works with pages requiring Basic Authentication
- Simple CSV-based configuration (no programming required)
- Fully customizable through CSV files
- Supports lazy-loaded content via auto-scrolling

## Installation

1. Clone this repository
```bash
git clone https://github.com/suneo3476/firecarpet.git
cd firecarpet
```

2. Install dependencies
```bash
npm install
```

3. Configure authentication (if needed)
```bash
cp .env.example .env
# Edit .env with your credentials
```

## Usage

1. List URLs to capture in `urls.csv`:
```csv
url
https://example.com/page1
https://example.com/page2
```

2. Define clickable elements in `selectors.csv`:
```csv
selector,description,wait_time
.modal-button,Modal trigger,1000
.accordion-header,Accordion headers,500
```

3. Run the tool:
```bash
npm start
```

4. Find screenshots in the `screenshots` directory:
   - `[domain]_[path]_initial.png` - Initial page state
   - `[domain]_[path]_clicked_[element].png` - After clicking elements

## Documentation

- [English Beginner's Guide](docs/beginner-guide-en.md)
- [日本語初心者ガイド](docs/beginner-guide-ja.md)
- [CSV Configuration Tutorial](docs/csv-tutorial.md)

## License

MIT License - See [LICENSE](LICENSE) file for details.