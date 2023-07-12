# IS24 Full Stack Developer Technical Test

Applicant name: Mustafa Wasif

(instructions, frameworks, etc. go below)

Instructions for running:
    Kindly note that 'docker-compose up' command runs the all the containers, but currently fails to authenticate backend to database.
    It would result in returning the following error:
    backend_1   | sqlalchemy.exc.OperationalError: (pymysql.err.OperationalError) (1045, "Access denied for user 'wasif'@'172.18.0.3' (using password: YES)")

    I would suggest installing MYSQL client locally, then:
    - Use the following configurations:
        MYSQL_USER=wasif
        MYSQL_PASSWORD=password
        MYSQL_DATABASE=MYSQLDB

    - Uncommenting the following code in backend/src/server.py:
        # SQLALCHEMY_DATABASE_URL = "mysql+pymysql://wasif:password@localhost/MYSQLDB"

    - and commenting out the following:
        SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"

    This would connect the backend to local database. The issue is arising when I want to dynamically associate host to database url.
    My machine initiated OS updates while I was away. SQL client went down and since then the MYSQL client hasn't been granting me access. If I can get it working, I would be investigating the user priveleges set for the database as a start.



Frameworks and tools used:
    Backend/API - FAST API
    Frontend - React (as specified)
    Database- MYSQL

    One consideration while building the app was ability to scale as it grows.

    Considerations made when choosing FASTAPI
    - Convenience. It is easy to use and required less setup
    - Easily testable. Provides Swagger to test endpoints (url/docs)
    - High performance for its asynchronous capabilities
    - Opportunity to learn a new tool (I enjoyed)

    Considerations made when choosing MYSQL:
    - Not any particular reason considering the app built over the other databases, but MYSQL is known to be scalable and lightweight.

Software Versions used:
    npm: 16.15
    React 18.2

Software Principles followed:
    1) Separation of Concern - It will be evident that this priinciple was followed especially in
    frontend code which can blow up quite quickly with components
    For Backend, the idea was to get the app running smoothly first, since it was my first time working with FASTAPI (which I loved), then attend to dividing the server code into models and routes if time permits.

    2) Keeping the code clean and simple

    3) Agile Methodology was followed and version control software such as GitHub used: https://github.com/MustafaWasif/Stocks 

Up next tasks for the app:
    1) Dynamically get host names and connect backend to database
    2) Writing tests. Although I like to incorporate tests early in development, due to time restrictions this important phase was skipped.

    3) Security Measures: Hardcoded configuration data would need be set in .env file and ignored by .gitignore

    4) Creating CI/CD pipeline in GitHub



