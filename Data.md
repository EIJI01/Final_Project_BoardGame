# BoardGame Everyday Cafe

- [BoardGame Everyday Cafe](#boardgame-everyday-cafe)
  - [User](#user)
    - [Register Request](#register-request)
    - [Login Request](#login-request)
    - [User Scan Card](#user-scan-card)
    - [User Queue](#user-queue)
    - [User Received Queue](#user-received-queue)
    - [User Cancel Queue](#user-cancel-queue)
  - [GM](#gm)
    - [GM Login Request](#gm-login-request)
    - [GM Update Time](#gm-update-time)
    - [GM Send Message](#gm-send-message)
      - [Green](#green)
      - [Red](#red)
      - [Cancel](#cancel)
    - [GM Scan Card](#gm-scan-card)
    - [GM Add Card](#gm-add-card)
      - [Checkout](#checkout)
      - [Change Table](#change-table)
      - [Delete Card](#delete-card)
  - [Admin](#admin)
    - [Admin Login](#admin-login)
    - [Admin Add Branch](#admin-add-branch)
    - [Admin Add GM](#admin-add-gm)
    - [Admin Generate QR code](#admin-generate-qr-code)
  
## User

### Register Request

```json
{
    "name": "TempMail",
    "email": "casere3229@comsb.com",
    "phoneNumber": "0985541245",
    "password": "$chanyutD01",
    "confirmPassword": "$chanyutD01"
}
```

### Login Request

```json
{
    "email": "casere3229@comsb.com",
    "password": "$chanyutD01"
}
```

### User Scan Card

```js

```

### User Queue

### User Received Queue

### User Cancel Queue

## GM

### GM Login Request

```json
{
    "email": "chanyut0986071813@gmail.com",
    "password": "$chanyutD01"
}
```

### GM Update Time

### GM Send Message

#### Green

#### Red

#### Cancel

### GM Scan Card

### GM Add Card

#### Checkout

#### Change Table

#### Delete Card

## Admin

### Admin Login

```json
{
    "email": "chanyut281144",
    "password": "$chanyutD01Admin"
}
```

### Admin Add Branch

### Admin Add GM

### Admin Generate QR code
