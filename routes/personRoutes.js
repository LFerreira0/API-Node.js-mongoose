const router = require('express').Router()
const Person = require('../model/Person')

router.post('/', async (req, res) =>{
    const {name, salary, approved} = req.body
    if(!name){
        res.status(422).json({error: 'Campo nome obrigatório'})
        return
    }
    const person = {
        name,
        salary,
        approved
    }

    try{
        await Person.create(person)
        res.status(201).json({message: 'Inserção realizada com sucesso'});
    }catch(err){
        res.status(500).json({error: err})
    }
})

router.get('/', async(req, res) => {
    try{    
        const people = await Person.find()  
        res.status(200).json(people)
    }catch(err){
        res.status(500).json({error: err})
    }
})

router.get('/:id', async(req, res) => {
    //extrair dado da requisição
    const id  = req.params.id

    try{
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(person)
    }
    catch(err){
        res.status(500).json({ error: err })
    }
})

router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id: id}, person)
        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }
        res.status(200).json(person)

    }catch(err){
        res.status(500).json({ error: err })
    }

})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id})
    if(!person){
        res.status(422).json({message: 'Usuário não encontrado'})
        return
    }

    try{
        await Person.deleteOne({_id:id})
        res.status(200).json({message: "Usuário removido com sucesso"})
    }catch(err){

    }
})

module.exports = router