This document is to declare the data models of features and corresponding APIs.

# Data Models of Features and Corresponding APIs

## Table of Contents

- [Data Models of Features and Corresponding APIs](#data-models-of-features-and-corresponding-apis)
  - [Table of Contents](#table-of-contents)
  - [Intro](#intro)
    - [Data Sources](#data-sources)
    - [API Headers](#api-headers)
  - [Pre-loading Data](#pre-loading-data)
    - [Data Model](#data-model)
    - [Api](#api)
  - [Welcome Page](#welcome-page)
    - [Data Model](#data-model)
  - [Check Car Details](#check-car-details)
    - [Data Model](#data-model)
    - [Api](#api)
  - [Recommended Services](#recommended-services)
    - [Data Model](#data-model)
    - [Api](#api)
  - [Additional Services And Repairs](#additional-services-and-repairs)
    - [Data Model](#data-model)
    - [Api](#api)
  - [Choose Advisor](#choose-advisor)
    - [Data Model](#data-model)
    - [Api](#api)
  - [Appointment Day Picker and Time Picker](#appointment-day-picker-and-time-picker)
    - [Data Model](#data-model)
    - [Api](#api)
  - [Check Contact Info](#check-contact-info)
    - [Data Model](#data-model)
  - [Create Appointment](#create-appointment)
    - [Data Model](#data-model)
    - [Api](#api)

---

## Intro

    Page(features)      ++                         Corresponding APIs
        +----+          ||                             +-----+
                        ||
                        ||    +-----------------------+          +--------------+
    Loading Page        ||    |                       |          |              |
    (loading Basic info)||    |  GetCustomerVehicle   |          |   GetToken   |
                        ||    |                       |          |              |
                        ||    +-------------------+---+          +---+----------+
                        ||                        |                  |
    Welcome Page        ||                        |                  |
                        ||                        |                  |
                        ||                +-------v------------------v---+
                        ||                |                              |
                        ||                |  GetCustomerVehicleDetails   |
    Check Car Details   ||                |                              |
    (Check Car Details) ||                +---------------+--------------+
                        ||                                |
                        ||                                |
                        ||                    +-----------+--------------+
                        ||                    |                          |
                        ||    +---------------v--------+       +---------v---------------+
                        ||    |                        |       |                         |
    Select Services Page||    | GetRecommendedServices |       |  GetServicesAndRepairs  |
    (Recommended        ||    |                        |       |                         |
    Services,)          ||    +---------------+--------+       +---------+---------------+
    Additional Services ||                    |                          |
    & Repairs)          ||                    +-----------+--------------+
                        ||                                |
                        ||                                |
                        ||                     +----------v------------+
                        ||                     |                       |
                        ||                     |  GetServiceAdvisors   |
                        ||                     |                       |
                        ||                     +----------+------------+
    Appoinment Page     ||                                |
    (Choose advisor,    ||                                |
    Transportation,     ||                     +----------v------------+
    Day & Time Picker)  ||                     |                       |
                        ||                     |  GetAppointmentSlots  |
                        ||                     |                       |
                        ||                     +----------+------------+
                        ||                                |
                        ||                                |
                        ||                     +----------v------------+
                        ||                     |                       |
    Review Page         ||                     |  CreateServiceBooking |
    (Check Contact Info ||                     |                       |
    & create booking)   ||                     +-----------------------+
                        ||
                        ++

### Data Sources

1.  Invitation link
2.  Appointment APIs (Service Online)
3.  Customer Vehicle APIs
4.  Vehicle Service APIs
5.  Configuration APIs
6.  User Input

### API Headers

```json
Headers: {
  "Accept":"application/json",
  "Authorization":"token 6XXXXe5-XXXX-4XXXX1c-9d6e-bfXXXXXXX",
  "Content-Type":"application/json"
}
```

---

## Pre-loading Data

### Data Model

```json
DataFromLink: {
  "CustomerId":,
  "VehicleId":,
  "DealerId":
}
```

- invitation link: $"{\_serviceBookingAppUrl}?dealerid={dealerId}&customerid={customerId}&vehicleid={vehicleId}"

```json
DealerInfo: {
  "Dealer":,
  "RooftopId":,
  "CommunityId":
}
```

- (CutomerId, VehicleId, DealerId) => fetch(api/GetCustomerVehicle)

```json
CustomerInfo: {
  "CustomerEmail":,
  "FirstName":,
  "Surname":,
  "PhoneNumber":,
}
```

- (CutomerId, VehicleId, DealerId) => fetch(api/GetCustomerVehicle)

```json
VehicleInfo: {
  "RegistrationNo":,
  "VinNumber":,
  "...":
}
```

- (CutomerId, VehicleId, DealerId) => fetch(api/GetCustomerVehicle)

```json
AuthorizationToken: {
  "Token":
}
```

- (CommunityId, RooftopId, CustomerId, VehicleId) => fetch(api/GetToken)

//TODO: Configuration:

```json
Configuration:{

}
```

- (DealerId) => fetch(api/GetConfiguration)

### Api

- GetCustomerVehicle
  - Path: {APIhosturl}/dealers/{dealerid:int}/customers/{customerid:int}/vehicles/{vehicleid:int}
  - Method: GET

```json
Response: {
  "CustomerId":,
  "VehicleId":,
  "CustomerEmail":,
  "RooftopId":,
  "RegistrationNo":,
  "CommunityId":,
  "FirstName":,
  "Surname":,
  "VinNumber":,
  "PhoneNumber":,
  "...Vehicle Info"
  }
```

- GetToken
  - {APIhosturl}/api/getToken
  - Method: POST

```json
Request: {
  "CustomerId":,
  "VehicleId":,
  "Dealerid":
}

Response: {
  "token":,
  "Result": {
    "ErrorCode": 0
  }
}
```

## Welcome Page

### Data Model

```json
UserName: {
  "FirstName":
}
```

- pre-loaded

---

## Check Car Details

### Data Model

```json
VehicleInfo: {
  "MakeCode": "B",
  "MakeName": "BMW",
  "ModelCode": "E87KO",
  "ModelName": "1 Series (E87)",
  "VariantCode": "ZV15",
  "VariantName": "E87 120d SE M47 2.0",
  "ActualPicture": "ZV15.jpg",
  "Odometer": 1000,
}
```

- (community, RooftopId, CustomerId, VehicleId) => fetch(api/GetCustomerVehicleDetails)

```json
ApproximateKilometres: {
  "Distance": 1000,
}
```

- VehicleInfo.Odometer || user input

### Api

- GetCustomerVehicleDetails
  - Path: api/{community}/ServiceOnline/GetCustomerVehicleDetails
  - Method: POST

```json
Request Body: {
  "RooftopId": "rooftop1",
  "CustomerId": "robert.s@company.com",
  "VehicleId": 13242
}

Response: {
  "CustomerVehicleDetails": {
    "VehicleId": 1,
    "MakeCode": "B",
    "MakeName": "BMW",
    "ModelCode": "E87KO",
    "ModelName": "1 Series (E87)",
    "VariantCode": "ZV15",
    "VariantName": "E87 120d SE M47 2.0",
    "ActualPicture": "",
    "Odometer": 1000,
  },
  "Result": {
    "ErrorCode": 0
  }
}
```

---

## Recommended Services

### Data Model

```json
RecommendedServices: {
  "ServicesList": [
    {
      "JobCode": "",
      "ProductCode": "",
      "JobDescription": "Brake Fluid Change",
      "JobTime": "0.50",
      "JobPrice": 89.99,
      "JobTypeCode": "MNT",
      "JobExtDescription": "Change the break fluid",
      "ParentJobCode": "33"
    },
    {
      "..."
    }
  ]
}
```

- (CommunityId, RooftopId, VehicleInfo) => fetch(api/GetRecommendedServices)

### Api

- GetRecommendedServices
  - Path: api/{community}/GetRecommendedServices
  - Method: POST

```json
Request Body: {
  "RooftopId": "roof1",
  "MakeCode": "B",
  "ModelCode": "E87KO",
  "VariantCode": "ZV15",
  "CurrencyCode": "",
  "EstVehicleAgeMonths": "",
  "EstRegDate": "2018-07-31",
  "EstOdometer": "",
  "TransmissionCode": "5",
  "FuelCode": "D",
  "EngineSize": 1300,
}

Response: {
  "Results": {
    "PriceListData": [
      {
        "JobCode": "",
        "ProductCode": "",
        "JobDescription": "Brake Fluid Change - Red Invstat",
        "JobTime": "0.50",
        "JobPrice": 89.99,
        "JobTypeCode": "MNT",
        "JobExtDescription": "Change the break fluid",
        "ParentJobCode": "33"
      },
      {
        "JobCode": "",
        "ProductCode": "",
        "JobDescription": "Brake Fluid Change - Red Invstat",
        "JobTime": "0.50",
        "JobPrice": 89.99,
        "JobTypeCode": "MNT",
        "JobExtDescription": "Change the break fluid",
        "ParentJobCode": "33"
      }
    ]
  },
  "Result": {
    "ErrorCode": 0
  }
}
```

---

//TODO

## Additional Services And Repairs

### Data Model

### Api

---

## Choose Advisor

### Data Model

```json
ServiceAdvisors: {
  "AdvisorList": [
    {
      "AdvisorID": "JSM",
      "AdvisorName": "John Smith",
      "AdvisorPicture": "JSM.jpg"

    },
    {
      "AdvisorID": "TGL",
      "AdvisorName": "Tom Glover",
      "AdvisorPicture": "TGL.jpg"

    }
  ]
}
```

- (CommunityId, RooftopId, CustomerId) => fetch(api/GetServiceAdvisors)
- (AdvisorIdList) => fetch(api/GetAdvisorPictures)

### Api

- GetServiceAdvisors
  - Path: api/{community}/ServiceOnline/GetServiceAdvisors
  - Method: POST

```json
Request Body: {
  "CustomerId": "robert.s@company.com",
  "RooftopId": "rooftop1"
}

Response: {
  "Results": {
    "AdvisorList": [
      {
        "AdvisorID": "JSM",
        "AdvisorName": "John Smith"
      },
      {
        "AdvisorID": "TGL",
        "AdvisorName": "Tom Glover"
      }
    ]
  },
  "PreferredSA": "JBO",
  "PreferredSAName": "James Bowie",
  "PreferredSAAvailToday": true,
  "Result": {
    "ErrorCode": 0
  }
}
```

- GetAdvisorPictures
  - Path: api/{community}/ServiceOnline/GetAdvisorPictures
  - Method: POST

```json
Request Body: {
  "CustomerId": "robert.s@company.com",
  "RooftopId": "rooftop1",
  "AdvisorIdList": ["JSM", "TGL"]
}

Response: {
  "Results": {
    "Advisors": [
      {
        "AdvisorId": "JSM",
        "AdvisorName": "John Smith",
        "AdvisorPicture": "JSM.jpg"
      },
      {
        "PreferredSA": "JBO",
        "PreferredSAName": "James Bowie",
        "AdvisorPicture": "JBO.jpg"
      }
    ],
    "Result": {
      "ErrorCode": 0
    }
}
```

---

## Appointment Day Picker and Time Picker

### Data Model

```json
DayAndTimeSlot: {
  "Slots":[
    {
      "Date": "2018-07-31",
      "Slots": [
        "9:00-9:15",
        "9:15-9:30"
      ]
    },
    {
      "Date": "2018-07-31",
      "Slots": [
        "9:00-9:15",
        "9:15-9:30"
      ]
    }
  ]
}
```

- (CommunityId, RooftopId, InitialDate, EndDate, ServiceAdvisorID, TransportationOption) => fetch(api/GetAppointmentSlots)

### Api

- GetAppointmentSlots
  - Path: api/{community}/ServiceOnline/GetAppointmentSlots
  - Method: POST

```json
Request Body: {
  "RooftopId": "rooftop1",
  "MakeCode": "B",
  "ModelCode": "E87KO",
  "ModelDesc": "1 Series (E87)",
  "VariantCode": "ZV15",
  "JobCode": ["",""],
  "InitialDate": "2018-07-31",
  "EndDate": "2018-07-31",
  "CourtesyCarTransmissionCode": "",
  "CourtesyCarVehicleTypeCode": "",
  "RegistrationNo": "",
  "ServiceAdvisorID": "",
}

Response: {
  "Option": [
    {
      "OptionID": "",
      "OptionAdvisor": "None",
      "Slots": [
        {
          "Date": "2018-07-31",
          "Slots": [
            "9:00-9:15",
            "9:15-9:30"
          ]
        },
        {
          "Date": "2018-07-31",
          "Slots": [
            "9:00-9:15",
            "9:15-9:30"
          ]
        }
      ]
    }
  ],
  "Result": {
    "ErrorCode": 0
  }
}
```

---

## Check Contact Info

### Data Model

```json
ContactInfo: {
  "FirstName": "",
  "LastName": "",
  "Email": "",
  "EmailReminder": "true",
  "SMSReminder": "true"
}
```

- user input

---

## Create Appointment

### Data Model

```json
AppointmentDetail: {
  "RooftopId":,
  "UserInfo":,
  "VehicleInfo":,
  "Services":,
  "Advisor":,
  "Transportation":,
  "Date&Time": ,
  "ContactInfo": "true"
}
```

- (CommunityId, RooftopId, CustomerInfo, VehicleInfo, ContactInfo, Services, Advisor, Transportation, Date, Time) => fetch(api/CreateServiceBooking)

### Api

- CreateServiceBooking
  - Path: api/{community}/ServiceOnline/CreateServiceBooking
  - Method: POST

```json
Request Body: {
  "RooftopId": "rooftop1",
  "CustomerId": "robert.s@company.com",
  "EmailAddress": "robert.smith@company.com",
  "MobileTelNo": "07702359024",
  "FirstName": "Robert",
  "SurName": "S",
  "VehicleRegistrationNo": "",
  "VehMakeCode": "",
  "VehModelCode": "",
  "VehVariantCode": "",
  "ActualMileage": 1000,
  "Jobs": [
    {
      "JobCode": "",
    }
  ],
  "JobDate": "2018-07-31",
  "TransportMethod": "",
  "AdvisorID": "JSM",
  "AdvisorDropOffTimeCode": "07:30 - 07:45",
  "AdvisorPickUpTimeCode": "15:00 - 15:15",
  "SendConfirmationMail": true,
}

Response: {
  "AppointmentId": 211,
  "Result": {
    "ErrorCode": 0
  }
}
```

# CDK API Notes

### ChassisPrePopulation

The API can access the DMS database with AppToken. The response does not include estimated odometer.

### GetCustomerVehicleDetails

Only for customer's own vehicles, which have been registered in SOL.

### GetAppointmentOptions

Get a full list of options. OptionId == TransportMethod in CreateServiceBooking.

### GetAppointmentSlots

This API is an alternative to GetAppOptionsAndDate, GetAppOptionsAndTime.
Notes:

1. Body parameter JobCode is an array.
2. JobCode is not required, but the result will be an empty object if not provided.
3. The optional date starts from the next day of "InitialDay"
4. The response might contain optional days after provided "EndDate".
5. Return empty response if "ServiceAdvisorList" is provided.

### CreateServiceBooking

This API is an alternative to the AddAppointment, UpdateAppointment and ConfirmAppointment APIs. The customer and dealer will receive e-mails.
Notes:

1. If customerId is provided and valid, the customer info will be collected from the account instead.
2. Advisor will be assigned to each booking automatically by order, if not provided.
3. No error returned even if no advisor or jobCode available for selected timeSlots.

Confirmation email example:

```
Dear Tsuha Ong,

Thank you for booking your into our workshop for the followings services:

- F.O.C
You have selected:

Appointment type:   Appointment booking

Appointment Date: 25/08/2018.

Appointment Time:   for 07:30

Your booking confirmation number is 49780.
```
