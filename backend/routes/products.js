'use strict';

const express = require('express');
const errors = require('./../services/error-service');
const router = express.Router();

const Product = require('./../models/product');

/**
 * @api {get} /api/products Return product list by categoryId
 *
 * @apiParam [String] category CategoryId for filter return result or null for return uncategorized products
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Array} products Array of product objects
 */
router.get('/', (req, res, next) => {
  let where = {
    category: null
  };
  
  if (req.query) {
    where.category = req.query.category || null;
    
    if (where.category && !where.category.length) {
      where.category = null;
    }
  }
  
  Product
    .find(where)
    .then((items) => {
      return res.send({
        success: true,
        products: items
      });
    })
    .catch(next);
});

/**
 * @api {post} /api/products/add Create new product
 *
 * @apiParam {String} title Product title
 * @apiParam {Number} cost Product purchase cost
 * @apiParam {Number} retail_cost Product retail cost
 * @apiParam {String} category CategoryId for product
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} New product object
 */
router.post('/add', (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return next(errors.api.bad_params);
  }
  
  let item = new Product(req.body);
  item
    .save()
    .then(() => {
      return res.send({
        success: true,
        product: item
      });
    })
    .catch(next);
});

/**
 * @api {post} /api/products/update/:productId Update product
 *
 * @apiParam {String} productId ProductId of updatable item
 * @apiParam {String} title Product title
 * @apiParam {Number} cost Product purchase cost
 * @apiParam {Number} retail_cost Product retail cost
 * @apiParam {String} category CategoryId for product
 *
 * @apiSuccess {Boolean} success
 * @apiSuccess {Object} Updated product object
 */
router.post('/update/:productId', (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return next(errors.api.bad_params);
  }

  Product
    .findOne({productId: req.params.productId})
    .then((item) => {
      if (!item) {
        return next(errors.api.object_not_found);
      }
      
      if (req.body.title) {
        item.title = req.body.title;
      }
      if (req.body.cost) {
        item.cost = req.body.cost;
      }
      if (req.body.retail_cost) {
        item.retail_cost = req.body.retail_cost;
      }
      if (req.body.category) {
        item.category = req.body.category;
      } else {
        item.category = null;
      }
        
      return item.save().then(() => item);
    })
    .then((item) => {
      return res.send({
        success: true,
        product: item
      });
    })
    .catch(next);
});

/**
 * @api {get} /api/products/delete/:productId Remove product
 *
 * @apiParam {String} productId ProductId
 *
 * @apiSuccess {Boolean} success
 */
router.get('/delete/:productId', (req, res, next) => {
  Product
    .findOne({productId: req.params.productId})
    .then((item) => {
      if (!item) {
        return next(errors.api.object_not_found);
      }
      
      return item.remove();
    })
    .then(() => {
      return res.send({
        success: true
      });
    })
    .catch(next);
});

module.exports = router;