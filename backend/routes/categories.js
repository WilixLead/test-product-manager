'use strict';

const express = require('express');
const errors = require('./../services/error-service');
const router = express.Router();

const Category = require('./../models/category');
const Product = require('./../models/product');

/**
 * @api {get} /api/categories Return categories list
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Array} categories Array of categories
 */
router.get('/', (req, res, next) => {
  Category
    .find()
    .then((items) => {
      if (!items) {
        items = [{_id: null, title: 'Без категории'}];
      } else {
        items.push({_id: null, title: 'Без категории'});
      }
      return res.send({
        success: true,
        categories: items
      });
    })
    .catch(next);
});

/**
 * @api {post} /api/categories/add Create new category
 *
 * @apiParam {String} title Category title
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} New category object
 */
router.post('/add', (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return next(errors.api.bad_params);
  }

  let item = new Category(req.body);
  item
    .save()
    .then(() => {
      return res.send({
        success: true,
        category: item
      });
    })
    .catch(next);
});

/**
 * @api {get} /api/categories/delete/:categoryId Remove category
 *
 * @apiParam {String} categoryId CategoryId
 *
 * @apiSuccess {Boolean} success
 */
router.get('/delete/:categoryId', (req, res, next) => {
  Product
    .findAndUpdate({category: req.params.categoryId}, {set: {category: null}})
    .then(() => {
      return Category.findByIdAndRemove(req.params.categoryId);
    })
    .then(() => {
      return res.send({
        success: true
      });
    })
    .catch(next);
});

module.exports = router;