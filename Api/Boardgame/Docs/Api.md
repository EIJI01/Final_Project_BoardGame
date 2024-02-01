# BoardGame Auth API  

- [BoardGame Auth API](#boardgame-auth-api)
  - [Auth](#auth)
    - [Register](#register)
      - [Register Request](#register-request)
      - [Register Response](#register-response)
    - [Login](#login)
      - [Login Request](#login-request)
      - [Login Response](#login-response)

## Auth

### Register

```js
POST {{host}}/{{route}}/authentication/register
```

#### Register Request

```json
{
  "firstName": "Chanyut",
  "lastName": "Dongthana",
  "email": "chanyut@gmail.com",
  "password": 112233
}
```

#### Register Response

```js
200 OK
```

```json
{
  "id": "ffd7137b-a273-4620-87f3-6916be67bcf7",
  "firstName": "Chanyut",
  "lastName": "Dongthana",
  "email": "chanyut@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmQ3MTM3Yi1hMjczLTQ2MjAtODdmMy02OTE2YmU2N2JjZjciLCJnaXZlbl9uYW1lIjoiQ2hhbnl1dCIsImZhbWlseV9uYW1lIjoiRG9uZ3RoYW5hIiwianRpIjoiZTJjYmQzNTgtYmY3Ny00MWE5LTk2YjQtMjFlYzhiY2Q5NTI2Iiwicm9sZSI6Ik1lbWJlciIsImV4cCI6MTcwNjY4NjU1NSwiaXNzIjoiQm9hcmRHYW1lIn0.K2d8VewP8tItCJofS3MYAPWOk2XZDSkgmHsalTwhARE"
}
```

### Login

```js
POST {{host}}/{{route}}/authentication/login
```

#### Login Request

```json
{
  "email": "chanyut@gmail.com",
  "password": "112233"
}
```

#### Login Response

```js
200 OK
```

```json
{
  "id": "ffd7137b-a273-4620-87f3-6916be67bcf7",
  "firstName": "Chanyut",
  "lastName": "Dongthana",
  "email": "chanyut@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmQ3MTM3Yi1hMjczLTQ2MjAtODdmMy02OTE2YmU2N2JjZjciLCJnaXZlbl9uYW1lIjoiQ2hhbnl1dCIsImZhbWlseV9uYW1lIjoiRG9uZ3RoYW5hIiwianRpIjoiZTJjYmQzNTgtYmY3Ny00MWE5LTk2YjQtMjFlYzhiY2Q5NTI2Iiwicm9sZSI6Ik1lbWJlciIsImV4cCI6MTcwNjY4NjU1NSwiaXNzIjoiQm9hcmRHYW1lIn0.K2d8VewP8tItCJofS3MYAPWOk2XZDSkgmHsalTwhARE"
}
```
