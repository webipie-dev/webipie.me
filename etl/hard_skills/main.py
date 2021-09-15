import wptools
import requests
from bs4 import BeautifulSoup

def read_skills():
    with open("skills.txt", "r") as f:
        skills = f.read().splitlines()
    return skills

skills = read_skills()

def search_logo(keyword):
    try:
        page = wptools.page(keyword, lang="fr")
        page.get_parse()
        if 'image' in page.data:
            image = page.data['image'][0]['url']
            if "logo" in image:
                return image
    except:
        pass

    try:
        page = wptools.page(keyword, lang="eng")
        page.get_parse()
        if 'image' in page.data:
            image = page.data['image'][0]['url']
            if "logo" in image:
                return image
    except:
        pass

    response = requests.get(
        url="https://en.wikipedia.org/wiki/" + keyword.replace(' ', '_'),
    )
    soup = BeautifulSoup(response.content, 'html.parser')

    images = soup.select("img")
    logos = [image['src'] for image in images if "icon" in image['src']]
    if logos[0] != None:
        return logos[0]
        

    
print(search_logo('Adobe Bridge'))

""" logos = []
for skill in skills:
    logo = search_logo(skill)
    print(logo)
    logos.append(logo) """

""" page = wptools.page('Angular', lang="fr")
result = page.get()
print(page.data) """