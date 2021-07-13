# Installation

## Option 1

### > **Docker**

To install it with docker, you only need to run the following command:

#### dev port 3000

```
docker-compose up -d --build
```

#### prod port 80

```
docker-compose -f docker-compose.prod.yaml up -d --build
```

## Option 2

### > **React**

```bash
# Install the node packages
npm install
# Start the App in Development Mode
npm start
```

# Configuration

Replace the environment variables from `.env` and enable authentication with email and password.

### bucket rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

database rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

# Firebase router

You need to make sure the rewrites are enabled in your Firebase hosting configuration to redirect all requests to your index.html file. This assumes you are using create-react-app:

```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {"source": "/service-worker.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}]}
    ]
  }
}
```



https://imagecolorpicker.com/en
main color    color: #22192a;
call to action #f06965


SIMILAR SVGS: https://www.freepik.com/stories