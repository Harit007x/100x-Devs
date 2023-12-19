const kanban_express = require('express')
const router = kanban_express.Router()

router.get('/', (req: any, res: any) => {
    res.send("HIIii")
})

router.post('/', (req: any, res: any) => {
    console.log("req -", req.body)
    res.send("postingg")
})

module.exports = router