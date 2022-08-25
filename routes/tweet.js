const express = require('express');
const router = express.Router();
const { TwitterApi } = require('twitter-api-v2')

router.post('/postTweet', (req, res) => {

    const userClient = new TwitterApi({
        appKey: 'iaaLgjStGhhJOmzedrEdWYqHf',
        appSecret: 'jey3O60y7T5ldl17myTMErwe2HRKRNDUowz2M44zR6FEodhuOD',
        accessToken: '1561292872749817856-sn4pXi2ePO6aV04CBgMUiqAfrTDLI3',
        accessSecret: 'fDhH8bdG1v2TGZuizGfAfNyn5SyjsEmgyFWDwrc7nH51Q'
    });

    const message = req.body.text;
    userClient.v2.tweet({ "text": message }).then((out)=>{
      return res.status(200).json(out);
    })
    .catch((err)=>{
       return res.status(400).json(err)
    })    
    
});

module.exports = router;