const crypto = require('crypto');
const connection = require('../database/connection');
module.exports = {
  async listOngs(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },
  async createOng(request, response) {
    const { name, email, whatsApp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsApp,
      city,
      uf
    })
    return response.json({ id });
  }
};