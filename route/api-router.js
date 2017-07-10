// 'use strict';
//
// const express = require('express');
// const path = require('path');
// const request = require('superagent');
//
// const apiRouter = module.exports = express.Router();
//
// const endpoints = {
//   GET: {
//     user_signin_url: `${url}/api/signin`,
//     user_items_url: `${url}/api/my_items`,
//     item_url:`${url}/api/:itemName`,
//     user_locations_url: `${url}/api/my_locations`,
//     location_url: `${url}/api/:locationName`
//   },
//   POST: {
//     new_item_url: `${url}/api/new_item`,
//     new_location_url: `${url}/api/new_location`
//   },
//   PUT: {
//     edit_item_url: `${url}/api/edit_:itemName`,
//     edit_location_url: `${url}/api/edit_:locationName`
//   },
//   DELETE: {
//     delete_item_url: `${url}/api/delete_:itemName`,
//     delete_location_url: `${url}/api/delete_:locationName`,
//     delete_storage_url: `${url}/api/delete_storage`,
//     delete_account_url: `${url}/api/delete_account`
//   }
// };
//
// apiRouter.use(express.static(path.join(_dirname, 'public')));
