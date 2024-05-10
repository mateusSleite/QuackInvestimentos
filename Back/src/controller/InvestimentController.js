const Investiment = require("../model/Investiment");

class InvestimentController {
    static async createInvestiment(req, res) {
        const { userId, nameInvestment, value, startDate, endDate, category, isInput } = req.body

        if (!nameInvestment) return res.status(400).json({ menssage: "Nome do investimneto é obtigatório" })
        if (!value) return res.status(400).json({ menssage: "Valor do investimento é obrigatório" })
        if (!startDate) return res.status(400).json({ menssage: " é obrigatório" })
        if (!endDate) return res.status(400).json({})
        if (!category) return res.status(400).json({})

        const investiment = new Investiment({
            userId,
            nameInvestment,
            value,
            startDate,
            endDate,
            category,
            isInput,
            extract: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });
        try {
            await Investiment.create(investiment);
            res.status(201).send({ message: "Investimneto cadastrado" });
        } catch (error) {
            return res.status(500).send({ message: "erro ao cadastrar investimento", data: error.menssage })
        }

    }
}

module.exports = InvestimentController;