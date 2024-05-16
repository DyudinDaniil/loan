const data = {
  "firstName": "Иван", // Имя
  "middleName": "Иванович", // Отчество
  "lastName": "Иванов", // Фамилия
  "birthDate": "1969-12-31T21:00:00.000Z", // Дата рождения
  "citizenship": "РФ", // Гражданство
  "passport": {
  "series": "12 34", // Серия паспорта
  "number": "123456", // Номер паспорта
  "issuedAt": "2023-03-11T21:00:00.000Z", // Дата выдачи паспорта
  "issuer": "УФМС", // Кем выдан
  "issuerСode": "123-456" // Код подразделения
  },
  "creditHistory": [ // Кредитная история
  {
  "type": "Кредит наличными", // Тип кредита
  "currency": "RUB", // Валюта
  "issuedAt": "2003-02-27T21:00:00.000Z", // Дата выдачи кредита
  "rate": 0.13, // Процентная ставка
  "loanSum": 100000, // Сумма кредита
  "term": 12, // Срок кредита в месяцах
  "repaidAt": "2004-02-27T21:00:00.000Z", // Дата погашения кредита
  
  "currentOverdueDebt": 0, // Просроченная задолженность
  "numberOfDaysOnOverdue": 0, // Количество дней на просрочке
  "remainingDebt": 0, // Сумма оставшейся задолженности
  
  "creditId": "25e8a350-fbbc-11ee-a951-0242ac120002" // ID кредита
  },
  {
  "type": "Кредитная карта",
  "currency": "RUB",
  "issuedAt": "2009-03-27T21:00:00.000Z",
  
  "rate": 0.24,
  "loanSum": 30000,
  "term": 3,
  "repaidAt": "2009-06-29T20:00:00.000Z",
  "currentOverdueDebt": 0,
  "numberOfDaysOnOverdue": 2,
  "remainingDebt": 0,
  "creditId": "81fb1ff6-fbbc-11ee-a951-0242ac120002"
  },
  {
  "type": "Кредит наличными",
  "currency": "RUB",
  "issuedAt": "2009-02-27T21:00:00.000Z",
  "rate": 0.09,
  "loanSum": 200000,
  "term": 24,
  "repaidAt": "2011-03-02T21:00:00.000Z",
  "currentOverdueDebt": 0,
  "numberOfDaysOnOverdue": 14,
  "remainingDebt": 0,
  "creditId": "c384eea2-fbbc-11ee-a951-0242ac120002"
  },
  {
  "type": "Кредитная наличными",
  "currency": "RUB",
  "issuedAt": "2024-05-15T21:00:00.000Z",
  "rate": 0.13,
  "loanSum": 200000,
  "term": 36,
  "repaidAt": null,
  "currentOverdueDebt": 10379,
  "numberOfDaysOnOverdue": 15,
  "remainingDebt": 110000,
  "creditId": "ebeddfde-fbbc-11ee-a951-0242ac120002"
  }
  ]
}

function checkStopConditions(clientData) {
  const { birthDate, passport, creditHistory } = clientData;

  // Проверка минимального возраста
  const minAge = 20;
  const currentDate = new Date();
  const birthDateObj = new Date(birthDate);
  const age = currentDate.getFullYear() - birthDateObj.getFullYear();
  if (age < minAge) {
    console.log('меньше 20');
    return false;
  }

  // Проверка действительности паспорта
  const passportIssueDate = new Date(passport.issuedAt);

  const passportIssueAgeMinimum = new Date(birthDate);
  passportIssueAgeMinimum.setFullYear(passportIssueAgeMinimum.getFullYear() + 20);
  const passportIssueAgeLimit = new Date(birthDate);
  passportIssueAgeLimit.setFullYear(passportIssueAgeLimit.getFullYear() + 45);

  if ((age >= 20 && passportIssueDate < passportIssueAgeMinimum) || (age >= 45 && passportIssueDate < passportIssueAgeLimit)) {
    console.log('просроченный паспорт');
    return false;
  }

  // Проверка кредитной истории
  for (const credit of creditHistory) {
    if (credit.type !== 'Кредитная карта') {
      if (credit.currentOverdueDebt > 0 || credit.numberOfDaysOnOverdue > 60 || (credit.numberOfDaysOnOverdue > 15 && creditHistory.filter(c => c.numberOfDaysOnOverdue > 15).length > 2)) {
        console.log('кредитная история');
        return false;
      }
    } else {
        if (credit.currentOverdueDebt > 0 || credit.numberOfDaysOnOverdue > 30) {
        console.log('кредитная история');
          return false;
        }
    }
  }

  return true;
}

console.log(checkStopConditions(data));