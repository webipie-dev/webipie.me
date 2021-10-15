import pymongo


def connect_db(conn_str):
    client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=10000)

    return client['webipieme']

if __name__ == '__main__':
    conn_str = input('please enter the connection string:\n')
    db = connect_db(conn_str)

    users = db.users.find()
    emails = list(map(lambda user: user['email'], users))
    print('\n'.join(emails))
