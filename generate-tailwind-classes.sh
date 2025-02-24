#!/bin/bash

# Define colors and shades
colors=(
  "red" "blue" "green" "yellow" "purple" "pink" "indigo" "teal" "orange" "cyan" "lime" "amber" "emerald" "rose" "sky" "violet" "fuchsia" "stone" "neutral" "zinc" "gray" "slate"
)
shades=(
  "50" "100" "200" "300" "400" "500" "600" "700" "800" "900"
)
types=("bg" "text" "border" "ring" "outline" "accent" "placeholder" "divide" "ring-offset")

# Output file
output_file="tailwindClasses.js"

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
