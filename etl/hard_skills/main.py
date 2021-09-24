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
    client = pymongo.MongoClient(config.CONN_STR, serverSelectionTimeoutMS=10000)

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
        url = "https://worldvectorlogo.com/fr/chercher/" + keyword

        headers = {
            'authority': "worldvectorlogo.com",
            'cache-control': "no-cache",
            'upgrade-insecure-requests': "1",
            'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
            'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            'sec-fetch-site': "same-origin",
            'sec-fetch-mode': "navigate",
            'sec-fetch-user': "?1",
            'sec-fetch-dest': "document",
            'sec-ch-ua': "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
            'sec-ch-ua-mobile': "?0",
            'sec-ch-ua-platform': "\"Linux\""
            }

        response = requests.request("GET", url, headers=headers)

        #print(response.text)
        soup = BeautifulSoup(response.text, 'html.parser')

        return soup.select(".logo__img")[0]['src']
    except:
        return None
        


def upload_to_aws(url, s3_file):
    response = urlopen(url)

    s3 = boto3.client('s3', aws_access_key_id=config.ACCESS_KEY,
                      aws_secret_access_key=config.SECRET_KEY)
    key = "skills/" + s3_file + ".svg"
    try:
        s3.upload_fileobj(response, config.S3_BUCKET, key,
                          ExtraArgs={'ACL': 'public-read'})
        print("Upload Successful")
        return True
    except  Exception as e:
        print(e)






if __name__ == "__main__":
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
                                "skills/" + skill + ".svg")
                insert_skill(db, skill, icon)
            else:
                insert_skill(db, skill)
