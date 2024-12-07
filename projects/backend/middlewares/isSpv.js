const { presence, user } = require('../models');

async function isSpv(req, res, next) {
  const { presenceId } = req.params;
  try {
    const presenceData = await presence.findByPk(presenceId, {
      include: user,
    });

    if (!presenceData) {
      throw { name: 'NotFound', msg: 'Presence not found' };
    }
    if (presenceData.user.npp_supervisor == req.user.npp) {
      req.presence = presenceData;
      next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = isSpv;
