#!/usr/bin/env zsh

# Create a new artwork directory from a template
# Usage: ./new_artwork.zsh MyAwesomeSketch
# Creates ./MyAwesomeSketch/ with index.html, style.css, sketch.js,
# and sets <title>MyAwesomeSketch</title> in index.html.

set -e  # Exit on any error

TEMPLATE_DIR="template"

# Ensure artwork name is provided
if [[ -z "$1" ]]; then
  echo "❌ Error: You must provide an artwork name."
  echo "Usage: $0 <ArtworkName>"
  exit 1
fi

ARTWORK_NAME="$1"
DEST_DIR="./${ARTWORK_NAME}"

# Ensure destination doesn't already exist
if [[ -e "$DEST_DIR" ]]; then
  echo "❌ Error: Directory '$DEST_DIR' already exists."
  exit 1
fi

# Ensure template exists
if [[ ! -d "$TEMPLATE_DIR" ]]; then
  echo "❌ Error: Template directory '$TEMPLATE_DIR' does not exist."
  exit 1
fi

# Copy template and update title
cp -r "$TEMPLATE_DIR" "$DEST_DIR"
sed -i "s|<title>.*</title>|<title>${ARTWORK_NAME}</title>|" "$DEST_DIR/index.html"

echo "✔ Created new artwork scaffold in '$DEST_DIR'"
