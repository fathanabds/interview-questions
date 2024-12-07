const { presence, user } = require('../models');

class PresenceController {
  static async findAll(req, res, next) {
    try {
      const presences = await presence.findAll({
        raw: true,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: {
          model: user,
          attributes: ['name'],
        },
      });

      const result = presences.reduce((acc, curr) => {
        const user = acc.find((item) => item.id_user === curr.id_users);
        const time = curr.waktu.toISOString().split('T')[1].split('.')[0];
        const status = curr.is_approve ? 'APPROVED' : 'REJECTED';
        if (!user) {
          acc.push({
            id_user: curr.id_users,
            nama_user: curr['user.name'],
            tanggal: curr.waktu.toISOString().split('T')[0],
            waktu_masuk: curr.type === 'IN' ? time : '',
            waktu_pulang: curr.type === 'OUT' ? time : '',
            status_masuk: curr.type === 'IN' ? status : '',
            status_pulang: curr.type === 'OUT' ? status : '',
          });
        } else {
          if (curr.type === 'IN') {
            user.waktu_masuk = time;
            user.status_masuk = status;
          } else if (curr.type === 'OUT') {
            user.waktu_pulang = time;
            user.status_pulang = status;
          }
        }
        return acc;
      }, []);
      res.json({ message: 'success get data', data: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async create(req, res, next) {
    const { type, waktu } = req.body;
    try {
      const newPresence = await presence.create({ id_users: req.user.id, type, waktu });
      res.status(201).json({ data: newPresence });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async approve(req, res, next) {
    try {
      req.presence.is_approve = true;
      req.presence.save();
      res.json({ message: 'Successfully approved presence' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PresenceController;
