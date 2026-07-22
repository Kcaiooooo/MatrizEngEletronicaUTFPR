import os
import glob

GA_MEASUREMENT_ID = "G-HJV3L9BNMQ"

GA_SNIPPET = f"""    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={GA_MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());

      gtag('config', '{GA_MEASUREMENT_ID}');
    </script>
"""

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
html_files = [os.path.join(root_dir, "index.html")] + glob.glob(os.path.join(root_dir, "pages", "*.html"))

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if GA_MEASUREMENT_ID in content:
        print(f"Skipping {os.path.basename(filepath)}, GA already present.")
        continue

    if "<head>" in content:
        new_content = content.replace("<head>", f"<head>\n{GA_SNIPPET}", 1)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")
    else:
        print(f"Warning: <head> not found in {os.path.basename(filepath)}")
