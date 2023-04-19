const { Router } = require("express");
const router = Router();
const {getPlatforms} = require("../controllers/platform")

router.get('/',async (req,res)=>{
    try {
      const platforms = await getPlatforms()
      res.send(platforms)
    } catch (error) {
      res.status(404).json(error)
    }
  })

module.exports = router;