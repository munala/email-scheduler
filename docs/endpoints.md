# Endpoints
### Schedule job
**Endpoint**:  `POST: /schedule`

**Header**:

    token: String!

**Payload**:

    date: String!
    to: String!
    body: String!
    subject: String!

**Response**:

    {
      "id": "9z4jkvfvc3i",
      "finished": false,
      "date": "2018-09-28T21:00:00.000Z",
      "to": "example@email.com",
      "body": "email body",
      "subject": "email subject",
      "updatedAt": "2018-08-15T17:57:52.254Z",
      "createdAt": "2018-08-15T17:57:52.254Z"
    }

### Update or reschedule job
**Endpoint**:  `PUT: /update/:jobId`

**Header**:

    token: String!

**Payload**:

    date: String
    to: String
    body: String
    subject: String

**Response**:

    {
      "id": "9z4jkvfvc3i",
      "finished": false,
      "date": "2018-09-28T21:00:00.000Z",
      "to": "example@email.com",
      "body": "email body",
      "subject": "email subject",
      "updatedAt": "2018-08-15T17:57:52.254Z",
      "createdAt": "2018-08-15T17:57:52.254Z"
    }

### Cancel job
**Endpoint**:  `DELETE: /cancel/:jobId`

**Header**:

    token: String!

**Response**:

    {
      "message": "Successfully cancelled job."
    }

### Sample error response
    {
      "error": "Job already scheduled"
    }
