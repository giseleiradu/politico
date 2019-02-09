const parties = [
  {
    id: 1,
    name: 'RPF',
    hqAddress: 'Kigali',
    logoUrl: '',
  },
  {
    id: 2,
    name: 'RPF',
    hqAddress: 'Kigali',
    logoUrl: '',
  },
];
const user = [
  {
    id: 1,
    firstName: 'Gisele',
    lastName: 'iradukunda',
    otherName: 'Gigi',
    email: 'gisele@gmail.com',
    phoneNumber: '0788888888',
    passportUrl: '',
    isAdmin: true,
  },
];
const offices = [
  {
    id: 1,
    type: 'federal',
    name: 'federal bureau',
  },
  {
    id: 2,
    type: 'federal',
    name: 'federal bureau',
  },
  {
    id: 3,
    type: 'federal',
    name: 'federal bureau',
  },
];
const candidates = [
  {
    id: 1,
    office: 1,
    party: 1,
    candidate: 1,
  },
];
const votes = [
  {
    id: 1,
    createdOn: '12-2-2018',
    createdBy: 1,
    office: 1,
    candidate: 1,
  },
];
const petition = [
  {
    id: 1,
    createdOn: '12-2-2018',
    createdBy: 1,
    office: 1,
    body: 'first petition',
  },
];
export { parties, user, votes, offices, candidates, petition };
