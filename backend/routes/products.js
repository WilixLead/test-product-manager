'use strict';

const express = require('express');
const errors = require('./../services/error-service');
const router = express.Router();

/**
 * Update invite object
 * TODO now supported only role updating
 */
router.post('/update-invite/:inviteId', (req, res, next) => {
  if (!req.body.role) {
    return next(errors.api.bad_params);
  }
  Invite
    .findById(req.params.inviteId)
    .then(invite => { // Find invite object
      if (!invite) {
        throw errors.api.object_not_found;
      }
      return invite;
    })
    .then(invite => { // Check access to update changes
      return TeamMember
        .checkAccess(invite.to_team, req.user._id, 'write')
        .then(() => invite);
    })
    .then(invite => { // Update invite
      if (req.body.role) {
        invite.team_role = req.body.role;
        return invite.save().then(() => invite);
      }
      return invite;
    })
    .then(invite => { // Send response
      return res.send({
        success: true,
        invite: invite
      });
    })
});

module.exports = router;