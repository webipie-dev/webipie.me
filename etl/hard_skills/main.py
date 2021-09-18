import wptools
import requests
from bs4 import BeautifulSoup
import pymongo
import boto3
from botocore.exceptions import NoCredentialsError
import config


def read_skills():
    with open("skills.txt", "r") as f:
        skills = f.read().splitlines()
    return skills


def connect_db():
    conn_str = "mongodb+srv://webipie:webipiepass@webipieme.ydbo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)

    return client['myFirstDatabase']


def insert_skill(db, skill_name, skill_icon):
    skills = db.technicalskills
    skill = skills.insert_one({"name": skill_name , "icon": skill_icon})

    return skill


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
        


def upload_to_aws(url, bucket, s3_file):
    r = requests.get("http:" + url, stream=True)

    s3 = boto3.client('s3', aws_access_key_id=config.ACCESS_KEY,
                      aws_secret_access_key=config.SECRET_KEY)

    try:
        s3.upload_fileobj(r.raw, bucket, "skills/" + s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False



""" skills = read_skills()

logos = []
for skill in skills:
    logo = search_logo(skill)
    print(logo)
    logos.append(logo)

print(len(skills))
print(len(logos))
for logo in logos: 
    if logo != None:
        res = logo
        break """

res = "//upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/220px-AngularJS_logo.svg.png"
uploaded = upload_to_aws(res, config.S3_BUCKET, 'logo.svg')
print(uploaded)


""" page = wptools.page('Angular', lang="fr")
result = page.get()
print(page.data) """