const express = require('express');
const router = express.Router();

const ChatService = require('./chat/ChatService');
let chatService = new ChatService();

const appleId = '4c2508e4a3b94c72a5c56e80281760fd';
const miniToken = 'WHITEcGFydG5lcl9pZD1scGMxOEtuU3JaUlE3YWFmUm1wZFNFaEFhM3J3TzB5T01pOTYmc2lnPTM5ZWQxYWY3ZjE3OGE5MTU1ZThmNDFhNmMyNThiYWExNTU0MDA5MmE6YWRtaW5JZD0xMjQmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE1ODI5NzQ5NTAmYWs9bHBjMThLblNyWlJRN2FhZlJtcGRTRWhBYTNyd08weU9NaTk2JmNyZWF0ZV90aW1lPTE1NTE0MTc5OTgmbm9uY2U9MTU1MTQxNzk5ODMxMDAw';

//添加用户
router.post('/enterChat', async (req, res, next) => {
  console.log(req.body)
  const account = req.body.account;
  const chat = await chatService.queryChat(account);
  console.log(chat[0]);
  res.json({
    code: 0,
    status: 'suc',
    appleId: appleId,
    miniToken: miniToken,
    data: chat[0],
  })
});

module.exports = router;