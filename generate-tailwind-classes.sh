#!/bin/bash

# Define colors and shades
colors=(
  "red" "orange" "amber" "yellow" "lime" "green" "emerald" "teal" "cyan" "sky" "blue" "indigo" "violet" "purple" "fuchsia" "pink" "rose" "slate" "gray" "zinc" "neutral" "stone"
)
shades=(
  "50" "100" "200" "300" "400" "500" "600" "700" "800" "900" "950"
)
types=(
  "bg" "text" "decoration" "border" "outline" "accent" "shadow" "inset-shadow" "ring" "inset-ring" "accent" "caret" "fill" "stroke"
)

# Output file
output_file="tailwind-classes.js"

# Start writing to the output file
echo "const classNames = {" > $output_file

# Loop through types, colors, and shades
for type in "${types[@]}"; do
  for color in "${colors[@]}"; do
    for shade in "${shades[@]}"; do
      echo "  '${type}-${color}-${shade}': '${type}-${color}-${shade}'," >> $output_file
    done
  done
done

# Close the object in the output file
echo "};" >> $output_file

# Optional: Print a success message
echo "Class names saved to $output_file."
