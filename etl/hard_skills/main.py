import wptools
import requests
from bs4 import BeautifulSoup
import pymongo
import boto3
from urllib.request import urlopen
import config


def read_skills():
    with open("skills.txt", "r") as f:
        skills = f.read().splitlines()
    return skills


def connect_db():
    client = pymongo.MongoClient(config.CONN_STR, serverSelectionTimeoutMS=5000)

    return client['myFirstDatabase']


def insert_skill(db, skill_name, skill_icon= None):
    skills = db.technicalskills
    skill = skills.insert_one({"name": skill_name , "icon": skill_icon})
    return skill

def find_skill(db, skill):
    skills = db.technicalskills
    if skills.find_one({"name": skill}):
        return True
    else:
        return False


def search_logo(keyword):
    try:
        page = wptools.page(keyword, lang="fr")
        page.get_parse()
        if 'image' in page.data:
            image = page.data['image'][0]['url']
            if "logo" in image or ("icon" in image and keyword in image):
                return image
    except:
        pass

    try:
        page = wptools.page(keyword, lang="eng")
        page.get_parse()
        if 'image' in page.data:
            image = page.data['image'][0]['url']
            if "logo" in image or ("icon" in image and keyword in image):
                return image
    except:
        pass

    try:
        response = requests.get(
            url="https://en.wikipedia.org/wiki/" + keyword.replace(' ', '_'),
        )
        soup = BeautifulSoup(response.content, 'html.parser')

        images = soup.select("img")
        logos = [image['src'] for image in images if "logo" in image['src']]
        if logos[0] != None:
            return logos[0]
    except:
        pass
        


def upload_to_aws(url, s3_file):
    response = urlopen('https:' + url)

    s3 = boto3.client('s3', aws_access_key_id=config.ACCESS_KEY,
                      aws_secret_access_key=config.SECRET_KEY)
    try:
        s3.upload_fileobj(response, config.S3_BUCKET, "skills/" + s3_file + "png")
        print("Upload Successful")
        return True
    except  Exception as e:
        print(e)






if __name__ == "main":
    skills = read_skills()
    db = connect_db()
    for skill in skills:
        if(not find_skill(db, skill)):
            logo = search_logo(skill)
            if(logo != None):
                upload_to_aws(logo, skill)
                icon = "https://s3-{0}.amazonaws.com/{1}/{2}".format(
                                config.AWS_REGION,
                                config.S3_BUCKET,
                                "skills/" + skill + "png")
                insert_skill(db, skill, icon)
            else:
                insert_skill(db, skill)
