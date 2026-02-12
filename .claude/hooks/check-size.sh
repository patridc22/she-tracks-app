#!/bin/bash

# Component Size Checker
# Blocks JSX/TSX files exceeding 300 lines

# Read tool input from stdin
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

# Exit if no file path or jq failed
if [ -z "$file_path" ]; then
  exit 0
fi

# Only check JSX/TSX component files
if [[ ! $file_path =~ \.(jsx|tsx)$ ]]; then
  exit 0
fi

# Skip if file doesn't exist (was deleted)
if [ ! -f "$file_path" ]; then
  exit 0
fi

# Count lines
line_count=$(wc -l < "$file_path" | tr -d ' ')

# Limits
SOFT_LIMIT=200
HARD_LIMIT=300

if [ "$line_count" -gt "$HARD_LIMIT" ]; then
  echo "" >&2
  echo "================================================" >&2
  echo "  COMPONENT SIZE LIMIT EXCEEDED" >&2
  echo "================================================" >&2
  echo "" >&2
  echo "  File: $(basename "$file_path")" >&2
  echo "  Lines: $line_count (max: $HARD_LIMIT)" >&2
  echo "" >&2
  echo "  This component must be split." >&2
  echo "  Options:" >&2
  echo "    - Extract subcomponents" >&2
  echo "    - Move logic to custom hooks" >&2
  echo "    - Extract utility functions" >&2
  echo "" >&2
  echo "================================================" >&2
  exit 2  # Block and provide feedback
fi

# Soft warning at 200 lines
if [ "$line_count" -gt "$SOFT_LIMIT" ]; then
  echo "Warning: $(basename "$file_path") has $line_count lines - consider splitting before reaching $HARD_LIMIT" >&2
fi

exit 0
