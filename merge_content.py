from bs4 import BeautifulSoup

def merge():
    # Read the original file with all cards
    with open('index.html', 'r', encoding='utf-8') as f:
        original_soup = BeautifulSoup(f.read(), 'html.parser')

    # Read the new layout file
    with open('src/new_layout.html', 'r', encoding='utf-8') as f:
        new_soup = BeautifulSoup(f.read(), 'html.parser')

    # Find all animation cards in the original
    cards = original_soup.find_all('div', class_='animation-card')

    # Find the grid container in the new layout
    grid = new_soup.find('main', id='animationGrid')

    # Clear existing demo cards in the new layout
    grid.clear()

    # Append all original cards to the new layout
    for card in cards:
        grid.append(card)

    # Write the result to index.html (root)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(new_soup.prettify()))

if __name__ == '__main__':
    merge()
