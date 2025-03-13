# CSV Configuration Tutorial

## What are CSV Files?

CSV (Comma-Separated Values) files are simple text files that can be edited with any spreadsheet software (like Excel or Google Sheets).

## Setting Up URLs

The `urls.csv` file specifies which pages to capture:

```csv
url
https://example.com/page1
https://example.com/page2
```

When editing in Excel:
1. Open the file
2. Add one URL per row under the "url" header
3. Save as CSV format

## Setting Up Clickable Elements

The `selectors.csv` file defines which elements to interact with:

```csv
selector,description,wait_time
.button-menu,Menu button,500
.faq-question,FAQ questions,1000
```

Each row has:
- **selector**: CSS selector to find elements (see below)
- **description**: Human-readable name (for your reference)
- **wait_time**: Milliseconds to wait after clicking (for animations/loading)

## How to Find Selectors

Using Google Chrome:

1. Visit your target page
2. Right-click on an element you want to capture
3. Select "Inspect"
4. Look at the highlighted HTML code
5. Find attributes like `class="..."` or `id="..."`
6. Create a selector:
   - For classes: use `.class-name` (e.g., `.login-button`)
   - For IDs: use `#id-name` (e.g., `#menu-toggle`)
   - For data attributes: use `[attribute="value"]` (e.g., `[data-modal="login"]`)

## Example Selectors

### Basic Selectors
```csv
selector,description,wait_time
.button,All buttons,500
#main-menu,Main menu,1000
[data-toggle="modal"],Bootstrap modals,1000
```

### Common Framework Elements
```csv
selector,description,wait_time
.nav-link,Navigation links,500
.accordion-header,Bootstrap accordions,1000
.MuiButton-root,Material UI buttons,800
```

### Combining Multiple Selectors
You can target multiple elements with a comma:
```csv
selector,description,wait_time
.btn-primary,.btn-secondary,All primary and secondary buttons,800
```

## Tips

1. Start with a few simple selectors until you understand how they work
2. Test with common classes like `.button` or `.modal-trigger`
3. Adjust `wait_time` if elements need more time to load
4. For pages with many similar elements, be more specific with selectors
5. Check the results in the `screenshots` folder