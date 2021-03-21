const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets/add').send({
      age: 18,
      colour: 'black',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet', async () => {
    const pet = {
      name: 'David',
      age: 18,
      colour: 'black',
    };
    const res = await request(app).post('/pets/add').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });

  it('it should DELETE a pet given the id', async () => {
    const pet = {
      name: 'David',
      age: 18,
      colour: 'black',
    };
    const petResp = await request(app).post('/pets/add').send(pet);
    const res = await request(app).delete('/pets/' + petResp.body._id);
    expect(res.status).to.equal(200);
    expect(res.body._id).to.equal(petResp.body._id);
  });
});