import pymongo


def connect_db(conn_str):
    client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=10000)

    return client['webipieme']

if __name__ == '__main__':
    conn_str = input('please enter the connection string:\n')
    db = connect_db(conn_str)

    users = list(db.users.find())
    emails_no_portfolios = []
    emails_empty_portfolios = []
    emails_incomplete_portfolios = []
    emails_complete_portfolios = []
    for user in users:
        if not user.get('portfolioID'):
            emails_no_portfolios.append(user['email'])
        else:
            portfolio = db.portfolios.find_one({'_id': user['portfolioID']})
            if not portfolio:
                emails_no_portfolios.append(user['email'])
            elif not portfolio.get('CV') and not portfolio.get('description') and not portfolio.get('position') and not portfolio.get('picture'):
                emails_empty_portfolios.append(user['email'])
            elif portfolio.get('projects') and portfolio.get('education') and portfolio.get('workExperiences') and portfolio.get('technicalSkills'):
                emails_complete_portfolios.append(user['email'])
            else:
                emails_incomplete_portfolios.append(user['email'])

    files_results = [
        ('results/complete.txt', emails_complete_portfolios),
        ('results/incomplete.txt', emails_incomplete_portfolios),
        ('results/no_portfolios.txt', emails_no_portfolios),
        ('results/empty.txt', emails_empty_portfolios),
    ]

    for file, result in files_results:
        open(file, 'w').write('\n'.join(result))
