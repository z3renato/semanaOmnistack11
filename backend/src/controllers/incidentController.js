const connection = require('../database/connection');

module.exports = {
  async listAllIncidents(request, response) {
    const [count] = await connection('incidents').count();

    const { page = 1 } = request.query;
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', 'incidents.ongId')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsApp',
        'ongs.city',
        'ongs.uf']);
    response.header('X-Total-Count', count['count(*)'])
    return response.json(incidents);


  },

  async deleteIncidente(request, response) {
    const ongId = request.headers.authorization;
    const incidentId = request.params.id;
    console.log(incidentId);
    const incident = await connection('incidents').where('id', incidentId).select('ongId').first();
    console.log(incident.ongId);
    if (incident.ongId !== ongId) {
      return response.status(401).json({ error: 'Não permitido' });
    }
    await connection('incidents').where('id', incidentId).delete();
    return response.status(204).send();
  },

  async creatIncident(request, response) {
    const { title, description, value } = request.body;
    const ongId = request.headers.authorization;
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ongId
    });
    return response.json({ id });
  }
};