const API_BASE_URL = Cypress.env('API_BASE_URL');
const ADMIN_USERNAME = Cypress.env('ADMIN_USERNAME');
const ADMIN_PASSWORD = Cypress.env('ADMIN_PASSWORD');
const TOKEN = window.btoa(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`);

Cypress.Commands.add('login', () => {
  cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/session`,
      headers: {
          Authorization: `Basic ${TOKEN}`,
      },
  });
});

Cypress.Commands.add('createPatient', () => {
  const patient = {
      person: {
          names: [
              {
                  preferred: true,
                  givenName: 'Test',
                  middleName: 'One',
                  familyName: 'Mishima'
              }
          ],
          gender: 'F',
          birthdate: '2022-03-01T00:00:00.000+0300',
          birthdateEstimated: false,
          attributes: [],
          addresses: [
              {
                  postalCode: '0100',
                  address2: 'Mwea Town school',
                  address1: '4523 Nairobi',
                  country: 'Kenya',
                  stateProvince: 'Mwea',
                  cityVillage: 'Town Centre'
              }
          ],
          dead: false
      },
      identifiers: [
          {
              identifier: 'MGGUTA',
              identifierType: 'dfacd928-0370-4315-99d7-6ec1c9f7ae76',
              location: '2377de5e-e495-43e8-a46f-871529fbb69c',
              preferred: true
          }
      ]
  };
  cy.request({
    method: 'POST',
    url: `${API_BASE_URL}/patient/`,
    body: patient,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${TOKEN}`,
    },
  }).then((resp) => {
      cy.wrap(resp.body);
  });
});



Cypress.Commands.add('deletePatient', (uuid) => {
  cy.request({
      method: 'DELETE',
      url: `${API_BASE_URL}/patient/${uuid}`,
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${TOKEN}`,
      },
  });
});

