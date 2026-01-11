import os

with open('assets/js/script.js', 'r') as f:
    content = f.read()

with open('assets/js/creator.js', 'r') as f:
    creator_code = f.read()

# Find the end of DOMContentLoaded block.
# It usually ends with  before the global function definitions or EOF.
# In my previous write,  starts after the block.
split_point = content.find('// -------------------------------------------------------------------------\n// 7. Global Copy Function')

if split_point != -1:
    # Insert before the global function, but ensure we are inside the closure
    # The closure ends just before this point usually.
    # Let's look for the last "});" before this point.
    pre_content = content[:split_point]
    post_content = content[split_point:]

    last_closure = pre_content.rfind('});')

    if last_closure != -1:
        new_content = pre_content[:last_closure] + creator_code + '\n});\n\n' + post_content

        with open('assets/js/script.js', 'w') as f:
            f.write(new_content)
        print("Injected successfully.")
    else:
        print("Could not find closure.")
else:
    print("Could not find split point.")
