# Web Page Screenshot Tool - Beginner's Guide

## What This Tool Does
This tool automatically captures the following parts of web pages:
- Initial page state
- Modal windows when opened
- Accordion menus when expanded

It also works with pages that require username/password Basic authentication.

## Requirements
- Mac or Windows computer
- Internet connection

## Installation Guide (with screenshots)

### 1. Open Terminal (Command Prompt)

**On Mac:**
1. Open Spotlight (🔍 icon in top-right or press ⌘ + Space)
2. Type "Terminal"
3. Press Enter

**On Windows:**
1. Open Start Menu (Windows icon in bottom-left)
2. Type "Command Prompt"
3. Press Enter

### 2. Install Node.js

**On Mac:**
1. First, install nvm tool:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```
2. Close and reopen Terminal
3. Install Node.js:
   ```bash
   nvm install --lts
   ```
4. Verify installation:
   ```bash
   node --version
   ```
   (A version number should appear)

**On Windows:**
1. Visit [Node.js official site](https://nodejs.org/)
2. Click the LTS (Recommended) download button
3. Run the downloaded file
4. Follow installer instructions
   - Choose "Next" on all screens
5. Open Command Prompt and verify:
   ```bash
   node --version
   ```
   (A version number should appear)

### 3. Tool Setup

1. Create a working folder on your Desktop
   
   **On Mac:**
   ```bash
   cd ~/Desktop
   mkdir screenshot-tool
   cd screenshot-tool
   ```

   **On Windows:**
   ```bash
   cd %USERPROFILE%\Desktop
   mkdir screenshot-tool
   cd screenshot-tool
   ```

2. Clone the repository
   ```bash
   git clone https://github.com/suneo3476/web-screenshot-tool.git .
   ```

3. Install required programs
   ```bash
   npm install
   ```

4. Install Playwright browsers (important)
   ```bash
   npx playwright install
   ```
   This step installs the necessary browsers for taking screenshots.

5. Set up environment variables (if needed)
   ```bash
   cp .env.example .env
   ```
   Edit the .env file with your credentials if needed

## Preparing URL List
Create a `urls.csv` file with the following format:
```csv
url
https://example.com/page1/
https://example.com/page2/
```

## Changing Settings
You can change these settings in `src/config/config.js`:
- Basic authentication username/password
- Screen size
- Wait times
- Output folder

## Running the Tool
In Terminal (Command Prompt), run:
```bash
npm start
```

## Checking Results
The `specific_screenshots` folder will contain:
- `[page-name]_initial.png` - Initial page state
- `[page-name]_modal_[modalId].png` - Modal windows
- `[page-name]_dropdown_[index].png` - Expanded accordion menus
- `specific_results.csv` - Summary of execution results